// fonts.mjs — descarga los subsets de Google Fonts que el copy del bundle
// necesita, los convierte a data:font/woff2;base64 e inyecta @font-face.
// El resultado se cachea en assets/fonts/fonts-inline.css para que los
// builds posteriores sean offline. Si la descarga falla, devuelve '' y el
// build cae a la cadena font-family del bundle (system fonts).

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE = join(__dirname, '..', 'assets', 'fonts', 'fonts-inline.css');

// User-Agent de Chrome real → Google Fonts devuelve woff2 (no ttf).
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Las familias/pesos solicitados por el host del bundle.
const CSS2_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600' +
  '&family=Manrope:wght@300;400;500;600;700' +
  '&family=JetBrains+Mono:wght@400;500;600' +
  '&display=swap';

async function toDataUri(url) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error('font fetch ' + r.status + ' ' + url);
  const buf = Buffer.from(await r.arrayBuffer());
  return 'data:font/woff2;base64,' + buf.toString('base64');
}

export async function buildFontCss({ force = false } = {}) {
  if (!force && existsSync(CACHE)) {
    const cached = await readFile(CACHE, 'utf8');
    if (cached.trim()) {
      console.log('[fonts] usando caché assets/fonts/fonts-inline.css');
      return cached;
    }
  }
  try {
    console.log('[fonts] descargando CSS de Google Fonts…');
    const cssRes = await fetch(CSS2_URL, { headers: { 'User-Agent': UA } });
    if (!cssRes.ok) throw new Error('css2 ' + cssRes.status);
    let css = await cssRes.text();

    // Inlinea cada url(...) woff2 como data URI (sólo subset latin + latin-ext).
    // Google emite bloques @font-face con un comentario /* latin */ encima.
    const blocks = css.split('@font-face');
    const out = [];
    for (let i = 1; i < blocks.length; i++) {
      const before = blocks[i - 1];
      const subsetMatch = before.match(/\/\*\s*([a-z0-9-]+)\s*\*\/\s*$/i);
      const subset = subsetMatch ? subsetMatch[1] : '';
      if (subset && subset !== 'latin' && subset !== 'latin-ext') continue;
      let block = '@font-face' + blocks[i].split('@font-face')[0];
      const m = block.match(/url\((https:\/\/[^)]+\.woff2)\)/);
      if (!m) { out.push(block); continue; }
      const data = await toDataUri(m[1]);
      block = block.replace(m[1], data);
      out.push(block);
    }
    const result = out.join('\n');
    await mkdir(dirname(CACHE), { recursive: true });
    await writeFile(CACHE, result, 'utf8');
    console.log('[fonts] OK · ' + (result.length / 1024 / 1024).toFixed(2) + ' MB inline · cacheado');
    return result;
  } catch (e) {
    console.warn('[fonts] descarga fallida (' + e.message + ') → fallback a system fonts');
    return '';
  }
}

// Ejecutable directo: `node build/fonts.mjs [--force]`
if (import.meta.url === `file://${process.argv[1]}`) {
  buildFontCss({ force: process.argv.includes('--force') }).then(() => {});
}
