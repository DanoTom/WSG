// verify.mjs — comprueba el .html contra file:// con Chromium headless.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = 'file://' + join(__dirname, '..', 'out', 'Planificador-Clinico.html');

const CANDIDATES = [
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
];
const exe = CANDIDATES.find(existsSync);

const results = [];
function check(name, cond, extra) { results.push({ name, ok: !!cond, extra: extra || '' }); }

const browser = await chromium.launch({ executablePath: exe, headless: true, args: ['--no-sandbox','--allow-file-access-from-files'] });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
const page = await ctx.newPage();

const consoleErrors = [];
const netReqs = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('request', (r) => { const u = r.url(); if (!u.startsWith('file://') && !u.startsWith('data:')) netReqs.push(u); });

await page.goto(FILE, { waitUntil: 'load' });
await page.waitForTimeout(400);

// 1. sin errores de consola / sin red
check('sin errores de consola', consoleErrors.length === 0, consoleErrors.join(' | '));
check('sin llamadas de red', netReqs.length === 0, netReqs.join(' | '));

// 2. estructura: páginas montadas, stickers/mockups fuera
const ids = await page.$$eval('.lp-page', (els) => els.map((e) => e.id));
const expected = ['portada','hub','anual','mensual','semana','diario','directorio','ficha','registro','supervision','formacion','cultura','finanzas','notas'];
check('14 páginas con id', expected.every((id) => ids.includes(id)) && ids.length === expected.length, ids.join(','));
check('stickers/mockups excluidos', !ids.includes('stickers') && !ids.some((i) => i.startsWith('mk')));

// 4. etiqueta sin contador X/Y
const label = await page.$eval('#tb-label', (e) => e.textContent);
check('etiqueta sin contador X/Y', !/\d+\s*\/\s*\d+/.test(label), label);

// navegación: ir a finanzas vía hash
await page.goto(FILE + '#finanzas', { waitUntil: 'load' });
await page.waitForTimeout(300);
let active = await page.$eval('.lp-page.is-active', (e) => e.id);
check('navegación por hash → finanzas', active === 'finanzas', active);

// 5. checkbox persiste
await page.goto(FILE + '#diario', { waitUntil: 'load' });
await page.waitForTimeout(200);
const firstCb = await page.$('#diario input.lp-toggle');
if (firstCb) { await firstCb.evaluate((el) => { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); }); }
const cbName = firstCb ? await firstCb.getAttribute('name') : null;
// 6. campo de texto persiste
const firstField = await page.$('#diario textarea.lp-area, #diario input.lp-field');
const fieldName = firstField ? await firstField.getAttribute('name') : null;
if (firstField) { await firstField.evaluate((el) => { el.value = 'PRUEBA-PERSIST'; el.dispatchEvent(new Event('input', { bubbles: true })); }); }
await page.waitForTimeout(200);

// recargar y comprobar
await page.goto(FILE + '#diario', { waitUntil: 'load' });
await page.waitForTimeout(300);
const cbChecked = cbName ? await page.$eval('#diario input.lp-toggle[name="'+cbName+'"]', (e) => e.checked).catch(()=>false) : false;
check('casilla persiste tras recargar', cbChecked, cbName);
const fieldVal = fieldName ? await page.$eval('#diario [name="'+fieldName+'"]', (e) => e.value).catch(()=>'') : '';
check('campo texto persiste tras recargar', fieldVal === 'PRUEBA-PERSIST', fieldVal);

// 13. otra página del mismo no contaminada
const otherField = await page.$eval('#registro', () => true).catch(()=>false);

// 7. derivado live (finanzas total)
await page.goto(FILE + '#finanzas', { waitUntil: 'load' });
await page.waitForTimeout(300);
const amt = await page.$('#finanzas [data-grow="led"] .lp-grow-row [name*="-amt"]');
const derive = await page.$('#finanzas [data-derive="fin-entra"]');
if (amt && derive) {
  await amt.evaluate((el) => { el.value = '50'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.waitForTimeout(150);
  const txt = await derive.evaluate((e) => e.textContent);
  check('derivado "Entra" en vivo', /50/.test(txt), txt);
} else check('derivado "Entra" en vivo', false, 'sin ledger/derive (amt='+!!amt+' derive='+!!derive+')');

// 8. ledger auto-crece
if (amt) {
  const rowsBefore = await page.$$eval('#finanzas [data-grow="led"] .lp-grow-row', (r) => r.length);
  // rellenar última fila
  const lastAmt = await page.$$('#finanzas [data-grow="led"] .lp-grow-row [name*="-amt"]');
  if (lastAmt.length) { await lastAmt[lastAmt.length-1].evaluate((el) => { el.value = '33'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await page.waitForTimeout(150); }
  const rowsAfter = await page.$$eval('#finanzas [data-grow="led"] .lp-grow-row', (r) => r.length);
  check('ledger auto-crece', rowsAfter > rowsBefore, rowsBefore+'→'+rowsAfter);
} else check('ledger auto-crece', false, 'sin ledger');

// 9. tema live cambia --c-deep
const deepBefore = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--c-deep').trim());
await page.evaluate(() => document.querySelector('#lp-toolbar .tb-dot[data-theme="sage"]').click());
await page.waitForTimeout(150);
const deepAfter = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--c-deep').trim());
check('tema live cambia --c-deep', deepBefore !== deepAfter && deepAfter.length > 0, deepBefore+'→'+deepAfter);
const tname = await page.$eval('.js-theme-name', (e) => e.textContent).catch(()=>'');
check('js-theme-name actualizado', /Salvia/i.test(tname), tname);

// 11. print → PDF con N páginas
const pdfPath = join(__dirname, '..', 'out', '_verify.pdf');
await page.pdf({ path: pdfPath, width: '1080px', height: '810px', printBackground: true });
check('PDF generado', existsSync(pdfPath));

await browser.close();

let pass = 0;
for (const r of results) { console.log((r.ok ? '✓' : '✗') + ' ' + r.name + (r.extra ? '  ['+r.extra+']' : '')); if (r.ok) pass++; }
console.log('\n' + pass + '/' + results.length + ' OK');
process.exit(pass === results.length ? 0 : 1);
