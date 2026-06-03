/* brand.jsx — Sistema de marca · Planificador Profesional para Psicólogos y Terapeutas
   Tokens + 6 paletas Pantone + mapa de tipos de evento + primitives.
   Exporta todo a window al final. NO usa const styles = {} (colisiona). */

// ───────────────────────── TOKENS BASE (únicos en todas las páginas) ──
const LP = {
  brand: 'Planificador Profesional',
  brandLine2: 'para Psicólogos y Terapeutas',
  cream:     '#F5EFE6',
  creamDeep: '#EDE4D2',
  paper:     '#FAF6EE',
  ink:       '#2B2622',
  ink2:      '#5A4F45',
  ink3:      '#8C8275',
  ink4:      '#B8AE9D',
  line:      '#D8CFC0',
  lineSoft:  '#E8DFD0',
  serif:     "'Cormorant Garamond', Georgia, serif",
  sans:      "'Manrope', system-ui, sans-serif",
  mono:      "'JetBrains Mono', ui-monospace, monospace",
};

// 6 paletas Pantone suaves — mismo chroma, solo varía hue.
const PALETTES = {
  greige:   { tint:'#EFE6D2', mid:'#C9BBA0', deep:'#8A7B62', ink:'#5C4F3B', name:'Greige',   pantone:'15-1116 TCX' },
  sage:     { tint:'#DCE4D2', mid:'#A8B895', deep:'#6E8059', ink:'#4D5C3D', name:'Salvia',   pantone:'16-0220 TCX' },
  lavender: { tint:'#E1DAE6', mid:'#B6A8C4', deep:'#8473A0', ink:'#5C4E73', name:'Lavanda',  pantone:'16-3812 TCX' },
  sky:      { tint:'#D8E1E7', mid:'#A7BACA', deep:'#6F8DA4', ink:'#4D6577', name:'Cielo',    pantone:'15-4309 TCX' },
  blush:    { tint:'#ECD9D2', mid:'#D2A99A', deep:'#A87567', ink:'#76493D', name:'Rubor',    pantone:'14-1316 TCX' },
  clay:     { tint:'#E5C9B3', mid:'#C99577', deep:'#9A6243', ink:'#6B4029', name:'Arcilla',  pantone:'17-1417 TCX' },
};
const PAL_ORDER = ['greige','sage','lavender','sky','blush','clay'];
const getPal = (t) => PALETTES[t] || PALETTES.clay;

// Tipos de evento — color-coding transversal (mensual/semanal/diario).
// Devuelve config según la paleta activa para que supervisión y formación
// "impacten" visualmente en la agenda.
function eventTypes(theme) {
  const p = getPal(theme);
  return {
    sesion:      { label:'Sesión',      color:p.mid,  dot:'fill' },
    supervision: { label:'Supervisión', color:p.deep, dot:'fill' },
    formacion:   { label:'Formación',   color:LP.ink2, dot:'hollow' },
    cultural:    { label:'Cultural',    color:LP.line, dot:'soft' },
    personal:    { label:'Personal',    color:LP.ink4, dot:'fill' },
  };
}

// ───────────────────────── CSS GLOBAL (grano + clases lp-*) ──
if (typeof document !== 'undefined' && !document.getElementById('lp-brand-css')) {
  const s = document.createElement('style');
  s.id = 'lp-brand-css';
  s.textContent = `
    .lp-paper{position:relative;background:${LP.cream};color:${LP.ink};
      font-family:${LP.sans};-webkit-font-smoothing:antialiased;overflow:hidden}
    .lp-paper::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
      opacity:.35;mix-blend-mode:multiply;
      background:
        radial-gradient(circle at 12% 18%, rgba(120,105,85,.05) 0 1px, transparent 1.4px),
        radial-gradient(circle at 62% 72%, rgba(120,105,85,.045) 0 1px, transparent 1.4px),
        radial-gradient(circle at 84% 32%, rgba(120,105,85,.04) 0 1px, transparent 1.4px);
      background-size:7px 7px, 11px 11px, 9px 9px;}
    .lp-paper > *{position:relative;z-index:1}
    .lp-link{cursor:pointer;transition:color .15s, border-color .15s, background .15s}
    .lp-link:hover{color:${LP.ink}}
    .lp-cb{box-sizing:border-box}
    .lp-italic{font-family:${LP.serif};font-style:italic;font-weight:500}
    .lp-serif{font-family:${LP.serif};font-weight:500}
    .lp-mono{font-family:${LP.mono}}
  `;
  document.head.appendChild(s);
}

// ───────────────────────── ICON SET (16×16 viewbox, stroke 1.2) ──
const ICON_PATHS = {
  home:  'M2.5 7L8 2.5 13.5 7M4 6.5V13.5h8V6.5',
  grid:  'M2.5 2.5h4v4h-4zM9.5 2.5h4v4h-4zM2.5 9.5h4v4h-4zM9.5 9.5h4v4h-4z',
  cal:   'M3 4h10v9.5H3zM3 7h10M6 2.3v2.4M10 2.3v2.4',
  week:  'M3 4h10v9.5H3zM6.5 4v9.5M10 4v9.5',
  sun:   'M8 5.4a2.6 2.6 0 100 5.2 2.6 2.6 0 000-5.2M8 1.6v1.6M8 12.8v1.6M1.6 8h1.6M12.8 8h1.6M3.6 3.6l1.1 1.1M11.3 11.3l1.1 1.1M12.4 3.6l-1.1 1.1M4.7 11.3l-1.1 1.1',
  moon:  'M11.2 9.6A5 5 0 016.6 2.9 5 5 0 1011.2 9.6z',
  drop:  'M8 2.4C8 2.4 4 6.8 4 9.4a4 4 0 008 0C12 6.8 8 2.4 8 2.4z',
  heart: 'M8 13.4S2.6 9.7 2.6 6.1A2.7 2.7 0 018 4.4a2.7 2.7 0 015.4 1.7C13.4 9.7 8 13.4 8 13.4z',
  leaf:  'M3 13C3 8 7 3.6 13 3.1c.5 6-3.9 9.9-9 9.9zM5.6 10.4C8 8.4 9.9 6.5 11.4 4.6',
  coin:  'M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11M9.5 6a1.7 1.5 0 00-3.1.7c0 1.7 3.1.7 3.1 2.5a1.7 1.5 0 01-3.1.7M8 4.6v1M8 10.4v1',
  star:  'M8 2.2l1.7 3.8 4.1.4-3.1 2.7.95 4L8 11l-3.6 2.1.95-4L2.2 6.4l4.1-.4z',
  target:'M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11M8 5.4a2.6 2.6 0 100 5.2 2.6 2.6 0 000-5.2M7.95 8h.1',
  book:  'M8 4.6C6.5 3.3 4 3.3 2.6 3.8v8c1.4-.5 3.9-.5 5.4.8 1.5-1.3 4-1.3 5.4-.8v-8C12 3.3 9.5 3.3 8 4.6zM8 4.6v8',
  edit:  'M10.8 2.5l2.7 2.7L6 12.7l-3 .5.5-3zM9.9 3.4l2.7 2.7',
  arrowR:'M2.8 8h9.2M8.5 4.4L12.2 8l-3.7 3.6',
  arrowL:'M13.2 8H4M7.5 4.4L3.8 8l3.7 3.6',
  plus:  'M8 3v10M3 8h10',
  note:  'M3.5 2.5h6L13 6v7.5H3.5zM9 2.5V6h3.5',
  folder:'M2.5 4.3h3.8l1.2 1.5h6v7.4h-11z',
  chart: 'M3 13V3M3 13h10M6 13V8.2M9 13V5.6M12 13V9.6',
  flower:'M8 8c0-3 1.4-4.4 0-5.5C6.6 3.6 8 5 8 8zM8 8c2.5-1.4 4.4-1 5-.4C12.4 9.2 10 8.6 8 8zM8 8c1 2.7.3 4.4-.4 5C6 11.6 7 9.6 8 8z',
  clock: 'M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11M8 5v3.2l2.1 1.3',
  user:  'M8 8.4a2.5 2.5 0 100-5 2.5 2.5 0 000 5M3.6 13.4c0-2.3 2-3.6 4.4-3.6s4.4 1.3 4.4 3.6',
  users: 'M6 8a2.1 2.1 0 100-4.3A2.1 2.1 0 006 8M2.6 13c0-2 1.5-3.1 3.4-3.1M10 8.1a2 2 0 000-4M10.4 9.9c1.6.1 2.6 1.2 2.6 3.1',
  file:  'M4.2 2.5h5L12.5 6v7.5H4.2zM9.2 2.5V6h3.3',
  clipboard:'M5.6 3.5H4.2v10h7.6v-10H10.4M6.2 2.6h3.6v1.8H6.2zM6.2 7.4h3.6M6.2 9.9h3.6',
  bookmark:'M4.6 2.6h6.8v10.8l-3.4-2.5-3.4 2.5z',
  film:  'M3 3.6h10v8.8H3zM3 6h10M3 10h10M5.6 3.6v8.8M10.4 3.6v8.8',
  mic:   'M8 2.5a1.8 1.8 0 00-1.8 1.8v3.3a1.8 1.8 0 003.6 0V4.3A1.8 1.8 0 008 2.5M4.6 8a3.4 3.4 0 006.8 0M8 11.4v2M6.2 13.4h3.6',
  cap:   'M8 3L1.6 6 8 9l6.4-3zM4.2 7.6v3c0 1 1.9 2 3.8 2s3.8-1 3.8-2v-3M14.4 6.2v3.4',
  receipt:'M4.2 2.5h7.6v11l-1.3-1-1.2 1-1.3-1-1.2 1-1.3-1-1.2 1zM6 5.6h4M6 8.1h4M6 10.4h2.6',
  check: 'M3 8.4l3.2 3.1L13 4.6',
};
function Icon({ name, size = 16, stroke = 1.2, color = 'currentColor', style }) {
  const d = ICON_PATHS[name] || ICON_PATHS.note;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0, ...style }}>
      <path d={d} />
    </svg>
  );
}

// ───────────────────────── CHECKBOX (toggle real) ──
// Casilla custom → input real + span coloreado por CSS global. El cliente
// marca y persiste; arranca SIEMPRE en blanco (se ignora `on`, era muestra).
function CB({ on = false, size = 14, theme = 'clay', name, style }) {
  return (
    <label className="lp-cbwrap" style={{
      display: 'inline-flex', flexShrink: 0, verticalAlign: 'middle',
      cursor: 'pointer', ...style,
    }}>
      <input type="checkbox" className="lp-toggle" name={name} />
      <span className="lp-tg" style={{ width: size, height: size, borderRadius: 3 }} />
    </label>
  );
}

// ───────────────────────── LINK CHIP (píldora) ──
// Tres modos:
//  · href      → ancla navegable real (<a href="#destino">).
//  · radio+name→ opción de un grupo (radio oculto + píldora que el CSS pinta
//                al :checked). Arranca en blanco (sin selección de muestra).
//  · por defecto → píldora inerte (filtros decorativos del bundle).
function LinkChip({ theme = 'clay', active = false, children, icon, style, mono = false, href, radio = false, name, value }) {
  const p = getPal(theme);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '5px 11px', borderRadius: 20,
    border: `1px solid ${LP.line}`,
    background: 'transparent',
    color: LP.ink2,
    fontFamily: mono ? LP.mono : LP.sans,
    fontSize: 11.5, fontWeight: 500, letterSpacing: mono ? '.04em' : '.01em',
    whiteSpace: 'nowrap', lineHeight: 1, ...style,
  };
  const inner = (<>{icon && <Icon name={icon} size={13} color={LP.ink3} />}{children}</>);
  if (radio) {
    return (
      <label className="lp-chiplabel" style={{ display: 'inline-flex', cursor: 'pointer' }}>
        <input type="radio" className="lp-radio" name={name} value={value != null ? value : String(children)} />
        <span className="lp-link lp-chip" style={base}>{inner}</span>
      </label>
    );
  }
  if (href) {
    return <a className="lp-link lp-chip" href={href} style={{ ...base, textDecoration: 'none' }}>{inner}</a>;
  }
  return <span className="lp-link lp-chip" style={base}>{inner}</span>;
}

// ───────────────────────── EYEBROW (mono + hairline) ──
function Eyebrow({ children, color, line = true, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <span style={{
        fontFamily: LP.mono, fontSize: 10.5, fontWeight: 500,
        letterSpacing: '.22em', textTransform: 'uppercase',
        color: color || LP.ink3, whiteSpace: 'nowrap',
      }}>{children}</span>
      {line && <span style={{ flex: 1, height: 1, background: LP.line }} />}
    </div>
  );
}

// ───────────────────────── STATUS DOT ──
const STATUS_COLORS = {
  activo: '#6E8059', pausa: '#C99577', alta: '#A7BACA',
};
function StatusDot({ kind = 'activo', color, size = 8, hollow = false, style }) {
  const c = color || STATUS_COLORS[kind] || LP.ink4;
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0, display: 'inline-block',
      background: hollow ? 'transparent' : c,
      border: hollow ? `1.4px solid ${c}` : 'none', ...style,
    }} />
  );
}

// ───────────────────────── EVENT PILL ──
function EventPill({ type = 'sesion', label, theme = 'clay', time, style, compact = false }) {
  const et = eventTypes(theme)[type] || eventTypes(theme).sesion;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: compact ? '2px 6px' : '3px 8px', borderRadius: 4,
      border: `1px solid ${LP.lineSoft}`, background: LP.paper,
      fontFamily: LP.sans, fontSize: compact ? 9.5 : 10.5, fontWeight: 500,
      color: LP.ink2, lineHeight: 1.1, maxWidth: '100%', ...style,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: et.dot === 'soft' ? 1.5 : '50%', flexShrink: 0,
        background: et.dot === 'hollow' ? 'transparent' : et.color,
        border: et.dot === 'hollow' ? `1.3px solid ${et.color}` : 'none',
      }} />
      {time && <span style={{ fontFamily: LP.mono, fontSize: compact ? 8.5 : 9, color: LP.ink3 }}>{time}</span>}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    </span>
  );
}

// ───────────────────────── SIDE TABS (rail derecho · 5 secciones clínicas) ──
const CLINIC_TABS = [
  { key: 'pacientes',   label: 'Pacientes',   icon: 'users' },
  { key: 'supervision', label: 'Supervisión', icon: 'clipboard' },
  { key: 'formacion',   label: 'Formación',   icon: 'cap' },
  { key: 'cultura',     label: 'Cultura',     icon: 'bookmark' },
  { key: 'finanzas',    label: 'Finanzas',    icon: 'receipt' },
];
// Cada pestaña apunta a su sección (destino troncal del producto).
const TAB_HREF = {
  pacientes: '#directorio', supervision: '#supervision', formacion: '#formacion',
  cultura: '#cultura', finanzas: '#finanzas',
};
function SideTabs({ theme = 'clay', active, width = 54, height = 810 }) {
  const p = getPal(theme);
  const tabH = height / CLINIC_TABS.length;
  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, width, height,
      borderLeft: `1px solid ${LP.line}`, background: LP.paper,
      display: 'flex', flexDirection: 'column', zIndex: 3,
    }}>
      {CLINIC_TABS.map((t, i) => {
        const on = t.key === active;
        return (
          <a key={t.key} href={TAB_HREF[t.key] || '#hub'} className="lp-link" style={{
            flex: 1, minHeight: 150, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10, textDecoration: 'none',
            borderTop: i ? `1px solid ${LP.lineSoft}` : 'none',
            background: on ? p.tint : 'transparent',
            borderLeft: on ? `2px solid ${p.deep}` : '2px solid transparent',
            position: 'relative',
          }}>
            <Icon name={t.icon} size={15} stroke={1.3} color={on ? p.deep : LP.ink3} />
            <span style={{
              writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              fontFamily: LP.sans, fontSize: 9, fontWeight: 600,
              letterSpacing: '.06em', textTransform: 'uppercase',
              color: on ? p.ink : LP.ink3, whiteSpace: 'nowrap',
            }}>{t.label}</span>
          </a>
        );
      })}
    </div>
  );
}

// ───────────────────────── TOP NAV ──
const NAV_CHIPS = [
  { key: 'indice', label: 'Índice', href: '#hub' },
  { key: 'ano',    label: 'Año',    href: '#anual' },
  { key: 'mes',    label: 'Mes',    href: '#mensual' },
  { key: 'semana', label: 'Semana', href: '#semana' },
  { key: 'dia',    label: 'Día',    href: '#diario' },
  { key: 'notas',  label: 'Notas',  href: '#notas' },
];
function TopNav({ theme = 'clay', current, height = 60 }) {
  const p = getPal(theme);
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 54, height,
      borderBottom: `1px solid ${LP.line}`, background: LP.paper,
      display: 'flex', alignItems: 'center', padding: '0 26px', gap: 18, zIndex: 3,
    }}>
      <a href="#hub" className="lp-link" style={{ lineHeight: 1.04, flexShrink: 0, textDecoration: 'none' }}>
        <div style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 18, color: LP.ink, letterSpacing: '.005em' }}>{LP.brand}</div>
        <div style={{ fontFamily: LP.mono, fontSize: 7.5, letterSpacing: '.14em', textTransform: 'uppercase', color: LP.ink3, marginTop: 2 }}>{LP.brandLine2}</div>
      </a>
      <span style={{ width: 1, height: 26, background: LP.line, flexShrink: 0 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
        {NAV_CHIPS.map((c) => {
          const on = c.key === current;
          return (
            <a key={c.key} href={c.href} className="lp-link" style={{
              padding: '5px 12px', borderRadius: 16, textDecoration: 'none',
              border: `1px solid ${on ? p.deep : 'transparent'}`,
              background: on ? p.tint : 'transparent',
              color: on ? p.ink : LP.ink2,
              fontFamily: LP.sans, fontSize: 12, fontWeight: on ? 600 : 500,
              whiteSpace: 'nowrap', lineHeight: 1,
            }}>{c.label}</a>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ fontFamily: LP.mono, fontSize: 9.5, letterSpacing: '.12em', color: LP.ink3, textTransform: 'uppercase' }}>Sin fechar</span>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.mid }} />
        <span style={{ fontFamily: LP.mono, fontSize: 9.5, letterSpacing: '.12em', color: p.deep, textTransform: 'uppercase', fontWeight: 600 }}>{p.name}</span>
      </div>
    </div>
  );
}

// ───────────────────────── PAGE WRAPPER (1080×810) ──
function Page({ theme = 'clay', tab, currentNav, padding = 36, id, pageLabel, scopes, children, style }) {
  const navH = 60, railW = 54;
  return (
    <div className="lp-paper lp-page" id={id} data-label={pageLabel} data-scopes={scopes} style={{ width: 1080, height: 810, ...style }}>
      <TopNav theme={theme} current={currentNav} height={navH} />
      <SideTabs theme={theme} active={tab} width={railW} height={810} />
      <div style={{
        position: 'absolute', top: navH, left: 0, right: railW, bottom: 0,
        padding, boxSizing: 'border-box', overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  );
}

// "Lomo" visual fino al centro (metáfora de doble página).
function Spine({ left = '50%', color = LP.line, style }) {
  return (
    <div style={{
      position: 'absolute', top: 14, bottom: 14, left, width: 1,
      background: `linear-gradient(${color}, ${LP.lineSoft})`,
      transform: 'translateX(-50%)', ...style,
    }} />
  );
}

// Línea de confidencialidad (pie de fichas y registros).
function ConfidentialFooter({ style }) {
  return (
    <div style={{
      fontFamily: LP.mono, fontSize: 9, letterSpacing: '.08em',
      color: LP.ink3, textAlign: 'center', ...style,
    }}>Material confidencial · uso profesional · secreto profesional</div>
  );
}

// ───────────────────────── HELPERS DE COMPOSICIÓN COMPARTIDOS ──

// Líneas de escritura (rayado) → textarea real sobre el guion de líneas.
// El patrón rayado sigue visible como fondo; el cliente escribe encima.
function RuledLines({ n = 3, gap = 26, color = LP.lineSoft, width = '100%', name, style }) {
  return (
    <textarea className="lp-area lp-ruled" name={name} rows={n} style={{
      width, height: n * gap, lineHeight: gap + 'px',
      backgroundImage: `repeating-linear-gradient(transparent 0 ${gap - 1}px, ${color} ${gap - 1}px ${gap}px)`,
      backgroundAttachment: 'local',
      ...style,
    }} />
  );
}

// Caja punteada (para "para supervisar", observaciones, etc).
// Con `area` muestra un textarea real (placeholder = prompt del diseño).
function DottedBox({ children, theme = 'clay', label, minHeight = 60, area = false, placeholder, name, style }) {
  return (
    <div style={{
      border: `1.4px dashed ${LP.line}`, borderRadius: 6, padding: '11px 13px',
      minHeight, background: 'transparent', position: 'relative', ...style,
    }}>
      {label && (
        <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: LP.ink3, marginBottom: 7 }}>{label}</div>
      )}
      {area
        ? <textarea className="lp-area" name={name} placeholder={placeholder || ''} style={{
            width: '100%', minHeight: minHeight - 22, fontFamily: LP.serif, fontStyle: 'italic',
            fontSize: 13.5, lineHeight: 1.4, color: LP.ink,
          }} />
        : children}
    </div>
  );
}

// Línea de escritura suelta (sin etiqueta) → input real sobre el hairline.
function WInput({ name, mono = false, size = 11.5, color = LP.ink, lineColor = LP.line, style }) {
  return (
    <input type="text" className="lp-field" name={name} style={{
      borderBottom: `1px solid ${lineColor}`,
      fontFamily: mono ? LP.mono : LP.sans, fontSize: size, color,
      ...style,
    }} />
  );
}

// Campo con etiqueta + línea de escritura → input real (vacío por defecto).
function FieldLine({ label, value = '', hint, mono = false, labelW = 92, name, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, ...style }}>
      <span style={{ width: labelW, flexShrink: 0, fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600, color: LP.ink2, letterSpacing: '.01em' }}>{label}</span>
      <input type="text" className="lp-field" name={name} placeholder={hint || ''} style={{
        flex: 1, borderBottom: `1px solid ${LP.line}`, minHeight: 19, paddingBottom: 2,
        fontFamily: mono ? LP.mono : LP.sans, fontSize: 11.5, color: LP.ink,
      }} />
    </div>
  );
}

// Barra de progreso → tracker editable. El counter "hecho / total" son dos
// inputs; el runtime calcula el ancho de la barra en vivo (derivado).
function ProgressBar({ pct = 0, theme = 'clay', label, counter, height = 7, name, prefix = '', suffix = '', style }) {
  const p = getPal(theme);
  return (
    <div className="lp-track" data-track={name || ''} style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5, gap: 8 }}>
        {label && <span style={{ fontFamily: LP.sans, fontSize: 10.5, fontWeight: 500, color: LP.ink2, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>}
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 2, fontFamily: LP.mono, fontSize: 9.5, color: LP.ink3, flexShrink: 0 }}>
          {prefix}
          <input type="text" inputMode="numeric" className="lp-field lp-num lp-track-done" name={name ? name + '-done' : undefined} style={{ width: 26, textAlign: 'right', borderBottom: `1px solid ${LP.lineSoft}` }} />
          <span>/</span>
          {prefix}
          <input type="text" inputMode="numeric" className="lp-field lp-num lp-track-total" name={name ? name + '-total' : undefined} style={{ width: 26, borderBottom: `1px solid ${LP.lineSoft}` }} />
          {suffix}
        </span>
      </div>
      <div style={{ height, borderRadius: height, background: LP.lineSoft, overflow: 'hidden' }}>
        <div className="lp-track-fill" style={{ width: '0%', height: '100%', borderRadius: height, background: p.mid }} />
      </div>
    </div>
  );
}

// Mini-calendario para vista anual. weekStart: 1 (lun) o 0 (dom).
const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DOW_LUN = ['L','M','M','J','V','S','D'];
const DOW_DOM = ['D','L','M','M','J','V','S'];
function MiniCalendar({ theme = 'clay', month = 0, year = 2025, weekStart = 1, highlight = [], today, style }) {
  const p = getPal(theme);
  const dows = weekStart === 1 ? DOW_LUN : DOW_DOM;
  const firstDay = new Date(year, month, 1).getDay(); // 0=dom
  const offset = weekStart === 1 ? (firstDay + 6) % 7 : firstDay;
  const dim = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return (
    <div style={style}>
      <div style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 16, color: p.ink, marginBottom: 5 }}>{MONTHS_ES[month]}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1px 0' }}>
        {dows.map((d, i) => (
          <div key={'h' + i} style={{ fontFamily: LP.mono, fontSize: 7.5, color: LP.ink3, textAlign: 'center', paddingBottom: 3, letterSpacing: 0 }}>{d}</div>
        ))}
        {cells.map((c, i) => {
          const isWeekend = weekStart === 1 ? (i % 7 >= 5) : (i % 7 === 0 || i % 7 === 6);
          const hi = c && highlight.includes(c);
          const isToday = c && c === today;
          return (
            <div key={i} style={{
              fontFamily: LP.sans, fontSize: 9, textAlign: 'center', lineHeight: '15px', height: 15,
              color: !c ? 'transparent' : isToday ? p.ink : isWeekend ? LP.ink4 : LP.ink2,
              fontWeight: isToday || hi ? 700 : 400,
              background: isToday ? p.tint : 'transparent',
              borderRadius: 3, position: 'relative',
            }}>
              {c || '·'}
              {hi && !isToday && <span style={{ position: 'absolute', bottom: 1, left: '50%', transform: 'translateX(-50%)', width: 3, height: 3, borderRadius: '50%', background: p.deep }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, {
  LP, PALETTES, PAL_ORDER, getPal, eventTypes, CLINIC_TABS, NAV_CHIPS, STATUS_COLORS,
  Icon, CB, LinkChip, Eyebrow, StatusDot, EventPill, SideTabs, TopNav, Page, Spine, ConfidentialFooter,
  RuledLines, DottedBox, FieldLine, WInput, ProgressBar, MiniCalendar, MONTHS_ES, DOW_LUN, DOW_DOM,
});
