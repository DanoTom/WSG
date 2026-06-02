// build-planner.mjs — Convierte el handoff de Claude Design en una web-app
// HTML autónoma en blanco (THEME_MODE = "live", tema por defecto Arcilla).
//
//  1. Concatena los .jsx en el orden del host → entry temporal.
//  2. esbuild (bundle, esm, platform node, loader jsx) con banner createRequire.
//  3. import dinámico → renderBody() (sentinel de tema __live).
//  4. post-procesa Z9* → var(--c-*) y ensambla el .html final con <style> +
//     fuentes inline + runtime embebidos.
//
// Salida: out/Planificador-Clinico.html  (1 archivo, < 25 MB).

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { build as esbuild } from 'esbuild';
import { buildFontCss } from './fonts.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'out');

const DOC_ID = 'Planificador-Clinico';
const PAGE_W = 1080, PAGE_H = 810;
const DEFAULT_THEME = 'clay';

// Orden de montaje en el .jsx (cadena de dependencias del host, sin
// design-canvas ni mockups, que no se montan).
const SRC_ORDER = [
  'brand.jsx', 'covers.jsx', 'masters-core.jsx', 'masters-week.jsx',
  'masters-patients.jsx', 'masters-practice.jsx', 'masters-extras.jsx',
];

// Orden de NAVEGACIÓN del producto + etiqueta de la toolbar (sin contador X/Y).
const PAGES = [
  { id: 'portada',     comp: 'Cover',             label: 'Portada' },
  { id: 'hub',         comp: 'IndexHub',          label: 'Índice' },
  { id: 'anual',       comp: 'Yearly',            label: 'Año' },
  { id: 'mensual',     comp: 'MonthlySpread',     label: 'Mes' },
  { id: 'semana',      comp: 'WeeklySpread',      label: 'Semana' },
  { id: 'diario',      comp: 'Daily',             label: 'Día' },
  { id: 'directorio',  comp: 'PatientDirectory',  label: 'Pacientes · Directorio' },
  { id: 'ficha',       comp: 'PatientCard',       label: 'Pacientes · Ficha' },
  { id: 'registro',    comp: 'SessionLog',        label: 'Pacientes · Registro de sesión' },
  { id: 'supervision', comp: 'Supervision',       label: 'Supervisión' },
  { id: 'formacion',   comp: 'Training',          label: 'Formación' },
  { id: 'cultura',     comp: 'Culture',           label: 'Cultura' },
  { id: 'finanzas',    comp: 'Finance',           label: 'Finanzas' },
  { id: 'notas',       comp: 'Notes',             label: 'Notas' },
];

// Paletas REALES (copiadas literalmente del bundle brand.jsx).
const PALETTES = {
  greige:   { tint: '#EFE6D2', mid: '#C9BBA0', deep: '#8A7B62', ink: '#5C4F3B', name: 'Greige' },
  sage:     { tint: '#DCE4D2', mid: '#A8B895', deep: '#6E8059', ink: '#4D5C3D', name: 'Salvia' },
  lavender: { tint: '#E1DAE6', mid: '#B6A8C4', deep: '#8473A0', ink: '#5C4E73', name: 'Lavanda' },
  sky:      { tint: '#D8E1E7', mid: '#A7BACA', deep: '#6F8DA4', ink: '#4D6577', name: 'Cielo' },
  blush:    { tint: '#ECD9D2', mid: '#D2A99A', deep: '#A87567', ink: '#76493D', name: 'Rubor' },
  clay:     { tint: '#E5C9B3', mid: '#C99577', deep: '#9A6243', ink: '#6B4029', name: 'Arcilla' },
};
const PAL_ORDER = ['greige', 'sage', 'lavender', 'sky', 'blush', 'clay'];
const SENTINEL = { TINT: 'tint', MID: 'mid', DEEP: 'deep', TINK: 'ink' };

async function bundleJsx() {
  const parts = [
    "import React from 'react';",
    "import { renderToStaticMarkup } from 'react-dom/server';",
    'globalThis.React = React;',
    'globalThis.window = globalThis;',
    '',
  ];
  for (const f of SRC_ORDER) parts.push(await readFile(join(SRC, f), 'utf8'));
  // Tema sentinel para el modo "live": valores = tokens únicos, no colores.
  parts.push(`
window.PALETTES.__live = { tint:'Z9TINT', mid:'Z9MID', deep:'Z9DEEP', ink:'Z9TINK', name:'Z9TNAME', pantone:'' };
const __PAGES__ = ${JSON.stringify(PAGES.map((p) => ({ id: p.id, comp: p.comp, label: p.label })))};
export function renderBody() {
  return __PAGES__.map(function(pg){
    var h = renderToStaticMarkup(React.createElement(window[pg.comp], { theme: '__live' }));
    // Ancla de navegación (categoría a): id + etiqueta en la raíz .lp-page.
    h = h.replace('class="lp-paper lp-page"',
      'class="lp-paper lp-page" id="'+pg.id+'" data-label="'+pg.label+'"');
    return h;
  }).join('\\n');
}
`);
  const entry = join(ROOT, '.entry.jsx');
  await writeFile(entry, parts.join('\n'), 'utf8');

  const outfile = join(ROOT, '.bundle.mjs');
  await esbuild({
    entryPoints: [entry],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    loader: { '.jsx': 'jsx' },
    jsx: 'automatic',
    logLevel: 'warning',
    // Sin él, react-dom/server lanza "Dynamic require of 'stream' is not supported".
    banner: { js: "import { createRequire as __cr } from 'module';\nconst require = __cr(import.meta.url);" },
  });
  const mod = await import(pathToFileURL(outfile).href + '?t=' + Date.now());
  await rm(entry).catch(() => {});
  await rm(outfile).catch(() => {});
  return mod.renderBody();
}

// ── Post-procesado: Z9* → var(--c-*) ; recolecta combos (color, alpha) ──
function processTokens(html) {
  const combos = new Set(['deep-22', 'deep-33', 'deep-44', 'mid-22', 'mid-66', 'mid-88']);
  html = html.replace(/Z9(DEEP|MID|TINT|TINK)([0-9a-fA-F]{2})?/g, (_, kind, alpha) => {
    const base = SENTINEL[kind];
    if (alpha) { combos.add(base + '-' + alpha.toLowerCase()); return `var(--c-${base}-${alpha.toLowerCase()})`; }
    return `var(--c-${base})`;
  });
  // Nombre de tema → span vivo (texto inicial = tema por defecto).
  html = html.replace(/Z9TNAME/g, `<span class="js-theme-name">${PALETTES[DEFAULT_THEME].name}</span>`);
  return { html, combos };
}

function themeCss(combos) {
  const blocks = [];
  for (const id of PAL_ORDER) {
    const pal = PALETTES[id];
    const vars = [
      `--c-tint:${pal.tint}`, `--c-mid:${pal.mid}`, `--c-deep:${pal.deep}`,
      `--c-ink:${pal.ink}`,
    ];
    for (const combo of combos) {
      const [base, alpha] = combo.split('-');
      vars.push(`--c-${combo}:${pal[base]}${alpha}`);
    }
    blocks.push(`html[data-theme="${id}"]{${vars.join(';')}}`);
  }
  return blocks.join('\n');
}

const globalCss = () => `
  html,body{margin:0;padding:0;background:#e8e4dc;-webkit-text-size-adjust:100%}
  *{box-sizing:border-box}
  /* ── paper + grano (del bundle) ── */
  .lp-paper{position:relative;background:#F5EFE6;color:#2B2622;
    font-family:'Manrope',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
  .lp-paper::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
    opacity:.35;mix-blend-mode:multiply;
    background:
      radial-gradient(circle at 12% 18%, rgba(120,105,85,.05) 0 1px, transparent 1.4px),
      radial-gradient(circle at 62% 72%, rgba(120,105,85,.045) 0 1px, transparent 1.4px),
      radial-gradient(circle at 84% 32%, rgba(120,105,85,.04) 0 1px, transparent 1.4px);
    background-size:7px 7px, 11px 11px, 9px 9px;}
  .lp-paper > *{position:relative;z-index:1}
  .lp-link{cursor:pointer;transition:color .15s, border-color .15s, background .15s}
  .lp-link:hover{color:#2B2622}
  .lp-italic{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500}
  .lp-serif{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500}
  .lp-mono{font-family:'JetBrains Mono',ui-monospace,monospace}

  /* ── inputs (categoría d) ── */
  .lp-field,.lp-area{border:0;background:transparent;outline:none;font:inherit;
    color:inherit;padding:0;margin:0;width:100%;-webkit-appearance:none;border-radius:0}
  .lp-field{min-width:0}
  .lp-field.lp-num{-moz-appearance:textfield}
  .lp-area{display:block;resize:none;overflow:auto}
  .lp-field:focus,.lp-area:focus{background:color-mix(in srgb, var(--c-tint) 45%, transparent)}
  .lp-field::placeholder,.lp-area::placeholder{color:#B8AE9D;font-style:italic;opacity:1}

  /* ── casillas custom → toggle real (categoría c) ── */
  .lp-toggle{position:absolute;opacity:0;width:0;height:0;pointer-events:none}
  .lp-tg{display:inline-block;box-sizing:border-box;border:1.2px solid #D8CFC0;
    background:transparent;position:relative;flex-shrink:0;transition:background .12s,border-color .12s}
  .lp-toggle:checked + .lp-tg{background:var(--c-tint);border-color:var(--c-deep)}
  .lp-toggle:checked + .lp-tg::after{content:'';position:absolute;left:50%;top:47%;
    width:30%;height:58%;border:solid var(--c-deep);border-width:0 1.7px 1.7px 0;
    transform:translate(-50%,-58%) rotate(45deg)}
  .lp-cbwrap:focus-within .lp-tg{box-shadow:0 0 0 2px var(--c-tint)}

  /* ── chips de opción → radio (categoría c) ── */
  .lp-radio{position:absolute;opacity:0;width:0;height:0;pointer-events:none}
  .lp-radio:checked + .lp-chip{border-color:var(--c-deep)!important;background:var(--c-tint)!important;color:var(--c-ink)!important}
  .lp-chiplabel:focus-within .lp-chip{box-shadow:0 0 0 2px var(--c-tint)}

  /* ── router de páginas ── */
  #lp-stage{position:relative;width:${PAGE_W}px;height:${PAGE_H}px}
  .lp-page{position:absolute;top:0;left:0;display:none}
  .lp-page.is-active{display:block}

  /* ── escalado ── */
  #lp-fit{display:flex;align-items:flex-start;justify-content:center;padding:18px;
    box-sizing:border-box}
  #lp-wrap{min-height:100vh}
  #lp-stage{transform-origin:top center}

  /* ── toolbar ── */
  #lp-toolbar{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:6px;
    flex-wrap:wrap;padding:7px 12px;background:#FAF6EE;border-bottom:1px solid #D8CFC0;
    font-family:'Manrope',system-ui,sans-serif;font-size:12.5px;color:#2B2622}
  #lp-toolbar .tb-brand{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;
    font-weight:600;font-size:16px;color:#2B2622;margin-right:6px;white-space:nowrap}
  #lp-toolbar .tb-label{font-weight:600;min-width:120px;text-align:center}
  #lp-toolbar button{font:inherit;cursor:pointer;border:1px solid #D8CFC0;background:#fff;
    color:#2B2622;border-radius:7px;padding:5px 10px;line-height:1;transition:background .12s,border-color .12s}
  #lp-toolbar button:hover{background:var(--c-tint);border-color:var(--c-mid)}
  #lp-toolbar .tb-sep{width:1px;height:22px;background:#D8CFC0;margin:0 2px}
  #lp-toolbar .tb-spacer{flex:1 1 auto}
  #lp-toolbar .tb-arrow{font-size:15px;padding:5px 9px}
  #lp-toolbar .tb-dots{display:flex;gap:5px;align-items:center}
  #lp-toolbar .tb-dot{width:16px;height:16px;border-radius:50%;border:1.5px solid #00000022;
    padding:0;cursor:pointer}
  #lp-toolbar .tb-dot.on{box-shadow:0 0 0 2px #fff,0 0 0 3.5px #2B2622}
  #lp-toolbar .tb-theme-name{font-family:'JetBrains Mono',monospace;font-size:10px;
    text-transform:uppercase;letter-spacing:.1em;color:#8C8275;margin-left:4px}

  /* ── print: una página por hoja a tamaño exacto ── */
  @page{size:${PAGE_W}px ${PAGE_H}px;margin:0}
  @media print{
    html,body{background:#fff}
    #lp-toolbar{display:none!important}
    #lp-fit{padding:0;display:block}
    #lp-stage-wrap{width:auto!important;height:auto!important}
    #lp-stage{transform:none!important;width:${PAGE_W}px;height:auto}
    .lp-page{position:relative!important;display:block!important;page-break-after:always;break-after:page}
    .lp-field:focus,.lp-area:focus{background:transparent}
  }
`;

function runtimeJs() {
  return `(function(){
  "use strict";
  var DOC_ID=${JSON.stringify(DOC_ID)};
  var PAGE_W=${PAGE_W}, PAGE_H=${PAGE_H};
  var PAGES=${JSON.stringify(PAGES.map((p) => ({ id: p.id, label: p.label })))};
  var THEMES=${JSON.stringify(PAL_ORDER.map((id) => ({ id: id, name: PALETTES[id].name, deep: PALETTES[id].deep, tint: PALETTES[id].tint })))};
  var ORDER=PAGES.map(function(p){return p.id;});

  // ---- storage helpers (namespaced, try/catch) ----
  function K(page,name){return 'lp:'+DOC_ID+':'+page+'|'+name;}
  function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  function lsDel(k){try{localStorage.removeItem(k);}catch(e){}}
  function allKeys(){var o=[];try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('lp:'+DOC_ID+':')===0)o.push(k);}}catch(e){}return o;}

  function pageEl(id){return document.getElementById(id);}

  // ---- nombres estables por orden del DOM dentro de la página ----
  function assignNames(page){
    if(page.dataset.named)return;
    var n=0;
    // radios: agrupar por su atributo name si ya lo tienen; si no, por grupo DOM.
    page.querySelectorAll('input.lp-toggle, input.lp-field, textarea.lp-area').forEach(function(el){
      if(!el.name) el.name='f'+(n++); else n++;
    });
    // radios sin name → asignar por grupo (cada <label> hermano comparte contenedor)
    var rg=0;
    page.querySelectorAll('input.lp-radio').forEach(function(el){
      if(!el.name){
        var grp=el.closest('div,td,span')||page;
        if(!grp.dataset.rgrp) grp.dataset.rgrp='rg'+(rg++);
        el.name=grp.dataset.rgrp;
      }
    });
    page.dataset.named='1';
  }

  // ---- auto-crecer (libro/ledger) ----
  function rebuildGrow(page){
    page.querySelectorAll('[data-grow]').forEach(function(box){
      var addK=K(page.id, box.dataset.grow+'|addcount');
      var add=parseInt(lsGet(addK)||'0',10)||0;
      var rows=box.querySelectorAll('.lp-grow-row');
      var have=rows.length, base=parseInt(box.dataset.baseRows||have,10);
      if(!box.dataset.baseRows) box.dataset.baseRows=String(base);
      var want=base+add;
      var tmpl=rows[rows.length-1];
      while(box.querySelectorAll('.lp-grow-row').length<want && tmpl){
        appendRow(box);
      }
    });
  }
  function rowMaxIdx(box){
    var mx=-1;
    box.querySelectorAll('.lp-grow-row [name]').forEach(function(el){
      var m=/-(\\d+)-/.exec(el.name); if(m){var i=parseInt(m[1],10); if(i>mx)mx=i;}
    });
    return mx;
  }
  function appendRow(box){
    var rows=box.querySelectorAll('.lp-grow-row');
    var tmpl=rows[rows.length-1]; if(!tmpl)return null;
    var clone=tmpl.cloneNode(true);
    var idx=rowMaxIdx(box)+1;
    clone.querySelectorAll('[name]').forEach(function(el){
      el.name=el.name.replace(/-(\\d+)-/, '-'+idx+'-');
      if(el.tagName==='INPUT'&&el.type==='checkbox')el.checked=false;
      else if(el.tagName==='INPUT'&&el.type==='radio')el.checked=false;
      else el.value='';
    });
    box.appendChild(clone);
    wirePersist(clone, box.closest('.lp-page'));
    return clone;
  }
  function maybeGrow(box){
    var rows=box.querySelectorAll('.lp-grow-row');
    var last=rows[rows.length-1]; if(!last)return;
    var filled=false;
    last.querySelectorAll('input,textarea').forEach(function(el){
      if(el.type==='checkbox'||el.type==='radio'){if(el.checked)filled=true;}
      else if(el.value && el.value.trim())filled=true;
    });
    if(filled){
      appendRow(box);
      var box2=box; var page=box.closest('.lp-page');
      var addK=K(page.id, box.dataset.grow+'|addcount');
      var rowsN=box.querySelectorAll('.lp-grow-row').length;
      var add=rowsN-parseInt(box.dataset.baseRows||rowsN,10);
      lsSet(addK, String(Math.max(0,add)));
    }
  }

  // ---- persistencia ----
  function wirePersist(scope, page){
    if(!page)return;
    scope.querySelectorAll('input.lp-toggle').forEach(function(el){
      el.addEventListener('change',function(){lsSet(K(page.id,el.name), el.checked?'1':'0'); growParent(el); updateDerived(page);});
    });
    scope.querySelectorAll('input.lp-radio').forEach(function(el){
      el.addEventListener('change',function(){if(el.checked){lsSet(K(page.id,'radio|'+el.name), el.value); growParent(el);}});
    });
    scope.querySelectorAll('input.lp-field, textarea.lp-area').forEach(function(el){
      var ev=function(){lsSet(K(page.id,el.name), el.value); autoSize(el); growParent(el); updateDerived(page);};
      el.addEventListener('input',ev);
      el.addEventListener('change',ev);
    });
  }
  function growParent(el){var box=el.closest('[data-grow]'); if(box)maybeGrow(box);}
  // Canvas fijo 1080×810: los textarea no crecen, hacen scroll interno.
  function autoSize(el){ /* no-op: alto fijo por diseño */ }

  function restore(page){
    page.querySelectorAll('input.lp-toggle').forEach(function(el){var v=lsGet(K(page.id,el.name)); if(v!=null)el.checked=(v==='1');});
    page.querySelectorAll('input.lp-field, textarea.lp-area').forEach(function(el){var v=lsGet(K(page.id,el.name)); if(v!=null){el.value=v; autoSize(el);}});
    // radios por grupo
    var seen={};
    page.querySelectorAll('input.lp-radio').forEach(function(el){
      if(seen[el.name])return; seen[el.name]=1;
      var v=lsGet(K(page.id,'radio|'+el.name));
      if(v!=null){page.querySelectorAll('input.lp-radio[name="'+el.name+'"]').forEach(function(r){r.checked=(r.value===v);});}
    });
  }

  // ---- derivados en vivo ----
  function num(v){ if(v==null)return 0; var m=String(v).replace(/[^0-9.,-]/g,'').replace(',','.'); var n=parseFloat(m); return isFinite(n)?n:0; }
  function updateDerived(page){
    // barras de progreso (done/total)
    page.querySelectorAll('.lp-track').forEach(function(t){
      var d=t.querySelector('.lp-track-done'), tot=t.querySelector('.lp-track-total'), fill=t.querySelector('.lp-track-fill');
      if(!fill)return; var a=num(d&&d.value), b=num(tot&&tot.value);
      fill.style.width=(b>0?Math.max(0,Math.min(100,a/b*100)):0)+'%';
    });
    // marcadores derivados declarados con data-derive
    page.querySelectorAll('[data-derive]').forEach(function(el){
      var kind=el.dataset.derive;
      if(kind==='ledger-cobrado'||kind==='ledger-total'){
        var box=page.querySelector('[data-grow="led"]'); var sum=0;
        if(box){box.querySelectorAll('.lp-grow-row').forEach(function(r){
          var amt=num((r.querySelector('[name*="-amt"]')||{}).value);
          var st=r.querySelector('input.lp-radio:checked');
          if(kind==='ledger-total') sum+=amt;
          else if(st&&/cobr/i.test(st.value)) sum+=amt;
        });}
        el.textContent='$'+sum;
      }
      if(kind==='fin-entra'||kind==='fin-sale'||kind==='fin-queda'){
        var entra=0, sale=0;
        var lb=page.querySelector('[data-grow="led"]');
        if(lb)lb.querySelectorAll('.lp-grow-row').forEach(function(r){entra+=num((r.querySelector('[name*="-amt"]')||{}).value);});
        page.querySelectorAll('.lp-track[data-track^="gasto"]').forEach(function(t){
          sale+=num((t.querySelector('.lp-track-done')||{}).value);
        });
        if(kind==='fin-entra')el.textContent='$'+entra;
        if(kind==='fin-sale')el.textContent='$'+sale;
        if(kind==='fin-queda')el.textContent='$'+(entra-sale);
      }
    });
  }

  // ---- router ----
  function resolve(id){ return id; } // sin fechar: sin sentinels #today/#sec-now
  function show(id){
    id=resolve((id||'').replace(/^#/,''))||ORDER[0];
    if(ORDER.indexOf(id)<0) id=ORDER[0];
    var page=pageEl(id); if(!page)return;
    document.querySelectorAll('.lp-page.is-active').forEach(function(p){p.classList.remove('is-active');});
    page.classList.add('is-active');
    if(!page.dataset.init){
      assignNames(page);
      rebuildGrow(page);
      wirePersist(page,page);
      restore(page);
      page.querySelectorAll('textarea.lp-area').forEach(autoSize);
      updateDerived(page);
      page.dataset.init='1';
    }
    var meta=PAGES[ORDER.indexOf(id)];
    var lbl=document.getElementById('tb-label'); if(lbl)lbl.textContent=meta?meta.label:id;
    if(location.hash!=='#'+id){history.replaceState(null,'','#'+id);}
    window.scrollTo(0,0);
  }
  function step(d){var i=ORDER.indexOf(currentId()); if(i<0)i=0; var n=(i+d+ORDER.length)%ORDER.length; show(ORDER[n]);}
  function currentId(){var a=document.querySelector('.lp-page.is-active'); return a?a.id:ORDER[0];}

  // ---- tema ----
  function applyTheme(id){
    if(!THEMES.some(function(t){return t.id===id;})) id=${JSON.stringify(DEFAULT_THEME)};
    document.documentElement.setAttribute('data-theme',id);
    var name=(THEMES.filter(function(t){return t.id===id;})[0]||{}).name||'';
    document.querySelectorAll('.js-theme-name').forEach(function(el){el.textContent=name;});
    document.querySelectorAll('#lp-toolbar .tb-dot').forEach(function(d){d.classList.toggle('on', d.dataset.theme===id);});
    var tn=document.getElementById('tb-theme-name'); if(tn)tn.textContent=name;
    lsSet('lp:theme', id);
  }

  // ---- export / import / reset ----
  function exportData(){
    var data={app:'planificador-clinico', doc:DOC_ID, version:1, fecha:new Date().toISOString(), keys:{}};
    allKeys().forEach(function(k){data.keys[k]=lsGet(k);});
    var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=DOC_ID+'-datos.json'; a.click();
    setTimeout(function(){URL.revokeObjectURL(a.href);},1000);
  }
  function importData(){
    var inp=document.createElement('input'); inp.type='file'; inp.accept='application/json,.json';
    inp.onchange=function(){var f=inp.files[0]; if(!f)return; var fr=new FileReader();
      fr.onload=function(){try{var d=JSON.parse(fr.result); var keys=d.keys||d; Object.keys(keys).forEach(function(k){if(k.indexOf('lp:'+DOC_ID+':')===0)lsSet(k,keys[k]);}); location.reload();}catch(e){alert('Archivo no válido.');}};
      fr.readAsText(f);};
    inp.click();
  }
  function clearPage(){
    var id=currentId();
    if(!confirm('¿Borrar todo lo escrito en esta página ('+id+')? No se puede deshacer.'))return;
    var pre='lp:'+DOC_ID+':'+id+'|';
    allKeys().forEach(function(k){if(k.indexOf(pre)===0)lsDel(k);});
    location.reload();
  }
  function clearAll(){
    if(!confirm('¿Borrar TODOS los datos de este planificador? No se puede deshacer.'))return;
    allKeys().forEach(lsDel); location.reload();
  }

  // ---- escalado (canvas fijo) ----
  function fit(){
    var stage=document.getElementById('lp-stage'); if(!stage)return;
    var tb=document.getElementById('lp-toolbar');
    var pad=36, toolbarH=tb?tb.offsetHeight:0;
    var vw=window.innerWidth, vh=window.innerHeight;
    var s=Math.min((vw-pad)/PAGE_W, (vh-toolbarH-pad)/PAGE_H);
    s=Math.max(0.2, s);
    stage.style.transform='scale('+s+')';
    var fitEl=document.getElementById('lp-fit');
    if(fitEl){ fitEl.style.height=(PAGE_H*s+pad)+'px'; }
    document.getElementById('lp-stage-wrap').style.width=(PAGE_W*s)+'px';
    document.getElementById('lp-stage-wrap').style.height=(PAGE_H*s)+'px';
  }

  // ---- toolbar build ----
  function buildToolbar(){
    var tb=document.getElementById('lp-toolbar');
    tb.innerHTML='';
    function btn(txt,fn,cls,title){var b=document.createElement('button'); b.textContent=txt; if(cls)b.className=cls; if(title)b.title=title; b.addEventListener('click',fn); return b;}
    var brand=document.createElement('span'); brand.className='tb-brand'; brand.textContent='Planificador'; tb.appendChild(brand);
    tb.appendChild(btn('‹',function(){step(-1);},'tb-arrow','Página anterior'));
    var lab=document.createElement('span'); lab.className='tb-label'; lab.id='tb-label'; tb.appendChild(lab);
    tb.appendChild(btn('›',function(){step(1);},'tb-arrow','Página siguiente'));
    tb.appendChild(sep());
    tb.appendChild(btn('Índice',function(){show('hub');}));
    tb.appendChild(btn('Año',function(){show('anual');},null,'Vista anual'));
    tb.appendChild(document.createElement('span')).className='tb-spacer';
    // dots de tema
    var dots=document.createElement('span'); dots.className='tb-dots';
    THEMES.forEach(function(t){var d=document.createElement('button'); d.className='tb-dot'; d.dataset.theme=t.id; d.style.background=t.deep; d.title=t.name; d.addEventListener('click',function(){applyTheme(t.id);}); dots.appendChild(d);});
    tb.appendChild(dots);
    var tn=document.createElement('span'); tn.className='tb-theme-name'; tn.id='tb-theme-name'; tb.appendChild(tn);
    tb.appendChild(sep());
    tb.appendChild(btn('Exportar',exportData));
    tb.appendChild(btn('Importar',importData));
    tb.appendChild(btn('Borrar página',clearPage));
    tb.appendChild(btn('Borrar todo',clearAll));
    tb.appendChild(btn('Imprimir',function(){window.print();}));
    function sep(){var s=document.createElement('span'); s.className='tb-sep'; return s;}
  }

  // ---- init ----
  window.addEventListener('DOMContentLoaded',function(){
    buildToolbar();
    applyTheme(lsGet('lp:theme')||${JSON.stringify(DEFAULT_THEME)});
    window.addEventListener('hashchange',function(){show(location.hash);});
    window.addEventListener('resize',fit);
    document.addEventListener('keydown',function(e){
      var t=e.target; var typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable);
      if(typing)return;
      if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}
      if(e.key==='ArrowRight'){e.preventDefault();step(1);}
    });
    show(location.hash || '#'+ORDER[0]);
    fit();
  });
})();`;
}

async function main() {
  const fontCss = await buildFontCss();
  console.log('[build] empaquetando .jsx con esbuild…');
  const body = await bundleJsx();
  const { html: pagesHtml, combos } = processTokens(body);

  const out = `<!doctype html>
<html lang="es" data-theme="${DEFAULT_THEME}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
<title>Planificador Clínico — para psicólogos y terapeutas</title>
<style>${fontCss}</style>
<style>${globalCss()}
${themeCss(combos)}</style>
</head>
<body>
<div id="lp-toolbar"></div>
<div id="lp-wrap">
  <div id="lp-fit">
    <div id="lp-stage-wrap">
      <div id="lp-stage">
${pagesHtml}
      </div>
    </div>
  </div>
</div>
<script>${runtimeJs()}</script>
</body>
</html>`;

  await mkdir(OUT, { recursive: true });
  const file = join(OUT, DOC_ID + '.html');
  await writeFile(file, out, 'utf8');
  const mb = (Buffer.byteLength(out) / 1024 / 1024).toFixed(2);
  console.log('[build] OK → out/' + DOC_ID + '.html · ' + mb + ' MB');
  if (mb > 25) console.warn('[build] ⚠ supera 25 MB');
}

main().catch((e) => { console.error(e); process.exit(1); });
