// =====================================================
//  EL CRIMEN DEL DÍA — Generador de Sopa de Letras
//  Usa PRNG con semilla para resultado consistente por día
// =====================================================

class SeededRandom {
  constructor(seed) {
    this.state = (seed >>> 0) || 1;
  }

  // Mulberry32 — alta calidad, simple
  next() {
    this.state = (this.state + 0x6D2B79F5) >>> 0;
    let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 0x100000000;
  }

  nextInt(max) {
    return Math.floor(this.next() * max);
  }

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = this.nextInt(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

// ─── Generador ────────────────────────────────────────────────────────────────

function generateWordSearch(words, seed, size = 12) {
  const rng = new SeededRandom(seed);

  // Normalizar palabras: mayúsculas, sin tildes
  const normalize = (w) =>
    w.toUpperCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^A-Z]/g, '');

  const normalizedWords = words.map(normalize);

  // Inicializar grilla vacía
  const grid = Array.from({ length: size }, () => Array(size).fill(''));

  // Direcciones posibles (solo 4 para legibilidad en pantalla pequeña)
  const directions = [
    [0,  1],  // →  horizontal derecha
    [1,  0],  // ↓  vertical abajo
    [1,  1],  // ↘  diagonal
    [0, -1],  // ←  horizontal izquierda
  ];

  const placed = [];

  for (let wi = 0; wi < normalizedWords.length; wi++) {
    const word = normalizedWords[wi];
    let success = false;

    // Mezclar direcciones para cada palabra
    const dirs = rng.shuffle(directions);

    outer:
    for (const dir of dirs) {
      // Intentar 150 posiciones aleatorias por dirección
      for (let attempt = 0; attempt < 150; attempt++) {
        const row = rng.nextInt(size);
        const col = rng.nextInt(size);

        if (canPlace(word, row, col, dir, grid, size)) {
          doPlace(word, row, col, dir, grid, placed, words[wi]);
          success = true;
          break outer;
        }
      }
    }

    if (!success) {
      // Fuerza bruta: probar todas las posiciones en orden
      outerFB:
      for (const dir of directions) {
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            if (canPlace(word, r, c, dir, grid, size)) {
              doPlace(word, r, c, dir, grid, placed, words[wi]);
              success = true;
              break outerFB;
            }
          }
        }
      }
    }

    if (!success) {
      console.warn(`No se pudo colocar la palabra: ${word}`);
    }
  }

  // Rellenar celdas vacías con letras aleatorias
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = alphabet[rng.nextInt(alphabet.length)];
      }
    }
  }

  return { grid, placed, size };
}

function canPlace(word, row, col, dir, grid, size) {
  for (let i = 0; i < word.length; i++) {
    const r = row + dir[0] * i;
    const c = col + dir[1] * i;
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    if (grid[r][c] !== '' && grid[r][c] !== word[i]) return false;
  }
  return true;
}

function doPlace(word, row, col, dir, grid, placed, originalWord) {
  const cells = [];
  for (let i = 0; i < word.length; i++) {
    const r = row + dir[0] * i;
    const c = col + dir[1] * i;
    grid[r][c] = word[i];
    cells.push({ r, c });
  }
  placed.push({
    word: word,              // normalizada (mayúsculas sin tildes)
    display: originalWord,  // con acentos para mostrar al usuario
    cells,
    found: false,
  });
}

// ─── Helpers de selección ─────────────────────────────────────────────────────

/**
 * Dado un punto de inicio y uno final (por arrastre),
 * devuelve las celdas de la línea recta (h, v, diagonal).
 * Devuelve [] si no están en línea recta.
 */
function getCellsInLine(start, end) {
  const dr = end.r - start.r;
  const dc = end.c - start.c;

  // Debe ser horizontal, vertical o diagonal a 45°
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return [];

  const len = Math.max(Math.abs(dr), Math.abs(dc));
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);

  const cells = [];
  for (let i = 0; i <= len; i++) {
    cells.push({ r: start.r + sr * i, c: start.c + sc * i });
  }
  return cells;
}

/**
 * Dado un array de celdas seleccionadas y la grilla,
 * arma la palabra y verifica si coincide con alguna de la lista.
 * Devuelve el objeto 'placed' correspondiente o null.
 */
function checkSelection(cells, grid, placedWords) {
  if (cells.length < 2) return null;

  const word = cells.map(({ r, c }) => grid[r][c]).join('');
  const wordRev = [...word].reverse().join('');

  for (const pw of placedWords) {
    if (pw.found) continue;
    if (word === pw.word || wordRev === pw.word) return pw;
  }
  return null;
}
