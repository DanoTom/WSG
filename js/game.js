// =====================================================
//  EL CRIMEN DEL DÍA — Controlador principal del juego
// =====================================================

// ── Estado global ─────────────────────────────────────────────────────────────

const STATE = {
  scenario: null,
  dayNum: 0,

  // Flujo: 'intro' | 'challenge' | 'transition' | 'accusation' | 'results'
  phase: 'intro',
  challengeIdx: 0,    // 0-3 (4 desafíos antes de la acusación)

  // Puntuaciones [0-3]
  scores: [null, null, null, null],
  accusationCorrect: null,
  accusationScore: 0,

  // Timer
  startTime: null,
  endTime: null,
  timerInterval: null,
  elapsed: 0,

  // Estado del desafío actual
  riddleAttempts: 0,
  riddleHintUsed: false,
  cipherAttempts: 0,
  cipherHintUsed: false,
  testimonyAnswered: false,

  // Sopa de letras
  ws: {
    data: null,     // { grid, placed, size }
    isSelecting: false,
    startCell: null,
    selectionCells: [],
    foundCount: 0,
    hintsUsed: 0,
  },
};

// ── Constantes ────────────────────────────────────────────────────────────────

const MAX_CHALLENGE_SCORE = 100;
const ACCUSATION_SCORE = 200;
const MAX_TIME_BONUS = 200;
const TIME_BONUS_CUTOFF_MS = 20 * 60 * 1000; // 20 minutos

// ── Utilidades ────────────────────────────────────────────────────────────────

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60).toString().padStart(2, '0');
  const s = (total % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function normalize(str) {
  return str.toUpperCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

function caesarEncode(text, shift) {
  return text.toUpperCase().split('').map(c => {
    if (/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65);
    return c;
  }).join('');
}

function timeUntilNextCrime() {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  const ms = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  return `${hours}h ${mins}m`;
}

// ── Timer ─────────────────────────────────────────────────────────────────────

function startTimer() {
  STATE.startTime = Date.now();
  STATE.timerInterval = setInterval(tickTimer, 1000);
}

function tickTimer() {
  STATE.elapsed = Date.now() - STATE.startTime;
  const timerEl = $('#timer');
  if (timerEl) timerEl.textContent = '⏱ ' + formatTime(STATE.elapsed);
}

function stopTimer() {
  clearInterval(STATE.timerInterval);
  STATE.endTime = Date.now();
  STATE.elapsed = STATE.endTime - STATE.startTime;
}

// ── Puntuación ────────────────────────────────────────────────────────────────

function getTimeBonusScore() {
  if (!STATE.startTime || !STATE.endTime) return 0;
  const elapsed = STATE.elapsed;
  if (elapsed >= TIME_BONUS_CUTOFF_MS) return 0;
  const frac = 1 - (elapsed / TIME_BONUS_CUTOFF_MS);
  return Math.round(MAX_TIME_BONUS * frac);
}

function totalScore() {
  const challengeTotal = STATE.scores.reduce((a, b) => a + (b || 0), 0);
  return challengeTotal + STATE.accusationScore + getTimeBonusScore();
}

function maxPossibleScore() {
  return MAX_CHALLENGE_SCORE * 4 + ACCUSATION_SCORE + MAX_TIME_BONUS;
}

// ── Render helpers ────────────────────────────────────────────────────────────

function setScreen(html) {
  const app = $('#app');
  app.style.opacity = '0';
  setTimeout(() => {
    app.innerHTML = html;
    app.style.opacity = '1';
    // Reattach timer display
    const timerEl = $('#timer');
    if (timerEl && STATE.startTime && !STATE.endTime) {
      timerEl.textContent = '⏱ ' + formatTime(Date.now() - STATE.startTime);
    }
  }, 250);
}

function challengeHeader(idx) {
  const labels = ['Adivinanza', 'Sopa de Letras', 'Mensaje Cifrado', 'Testimonio'];
  const icons  = ['🔍', '🔎', '📜', '💬'];
  const progress = ((idx + 1) / 5) * 100;
  return `
    <div class="challenge-header">
      <div class="challenge-meta">
        <span class="challenge-badge">${icons[idx]} PRUEBA ${idx + 1}/5</span>
        <span class="challenge-type-label">${labels[idx]}</span>
      </div>
      <div id="timer" class="timer">${STATE.startTime ? '⏱ ' + formatTime(Date.now() - STATE.startTime) : ''}</div>
    </div>
    <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${progress}%"></div></div>
  `;
}

// ── Pantalla: Intro ───────────────────────────────────────────────────────────

function renderIntro() {
  const sc = STATE.scenario;
  const suspectsHTML = sc.suspects.map((s, i) =>
    `<div class="suspect-card">
      <div class="suspect-emoji">${s.emoji}</div>
      <div class="suspect-name">${s.name}</div>
      <div class="suspect-role">${s.role}</div>
      <div class="suspect-detail">${s.detail}</div>
    </div>`
  ).join('');

  setScreen(`
    <div class="screen screen-intro">
      <div class="intro-top">
        <div class="crime-number">🗓 Crimen #${STATE.dayNum} · ${formatDate()}</div>
        <h1 class="crime-title">${sc.title}</h1>
        <p class="crime-setting">${sc.setting}</p>
      </div>

      <div class="case-file">
        <div class="case-file-header">📁 EXPEDIENTE DEL CASO</div>
        <p class="case-description">${sc.description}</p>
        <div class="victim-block">
          <span class="victim-label">☠️ VÍCTIMA</span>
          <span class="victim-name">${sc.victim.name}</span>
          <span class="victim-role">${sc.victim.age} años · ${sc.victim.role}</span>
          <span class="victim-detail">${sc.victim.detail}</span>
        </div>
      </div>

      <div class="suspects-section">
        <div class="suspects-title">👥 SOSPECHOSOS</div>
        <div class="suspects-grid">${suspectsHTML}</div>
      </div>

      <div class="intro-instructions">
        <p>Resolverás <strong>5 pruebas</strong> para descubrir quién es el asesino.</p>
        <p>El tiempo corre desde que comenzás. ¡Buena suerte, detective!</p>
      </div>

      <button class="btn-start" onclick="startGame()">🔍 Comenzar Investigación</button>
    </div>
  `);
}

// ── Pantalla: Transición entre desafíos ──────────────────────────────────────

function renderTransition(clueText, nextFn) {
  setScreen(`
    <div class="screen screen-transition">
      <div id="timer" class="timer timer-float">${STATE.startTime ? '⏱ ' + formatTime(Date.now() - STATE.startTime) : ''}</div>
      <div class="transition-icon">🔑</div>
      <div class="transition-title">¡Pista Desbloqueada!</div>
      <div class="transition-clue">${clueText}</div>
      <button class="btn-next" onclick="(${nextFn.toString()})()">Continuar →</button>
    </div>
  `);
}

// ── Pantalla: Adivinanza ──────────────────────────────────────────────────────

function renderRiddle() {
  const ch = STATE.scenario.challenges[0];
  STATE.riddleAttempts = 0;
  STATE.riddleHintUsed = false;

  setScreen(`
    <div class="screen screen-challenge">
      ${challengeHeader(0)}
      <div class="challenge-card">
        <h2 class="challenge-title">${ch.title}</h2>
        <p class="challenge-instruction">${ch.instruction}</p>
        <div class="riddle-box">
          <div class="riddle-text">${ch.riddle.replace(/\n/g, '<br>')}</div>
        </div>
        <div id="riddle-hint" class="hint-box" style="display:none">
          💡 Pista: ${ch.hint}
        </div>
        <div class="input-row">
          <input id="riddle-input" class="text-input" type="text" placeholder="Tu respuesta..." autocomplete="off" autocorrect="off" spellcheck="false" maxlength="40"
            onkeydown="if(event.key==='Enter') submitRiddle()">
          <button class="btn-submit" onclick="submitRiddle()">Confirmar</button>
        </div>
        <div id="riddle-feedback" class="feedback"></div>
        <div class="attempts-info">
          <span id="riddle-attempts">Intentos restantes: 3</span>
          <button class="btn-hint" id="hint-btn" onclick="showRiddleHint()" style="display:none">Ver pista (−25 pts)</button>
        </div>
      </div>
    </div>
  `);

  setTimeout(() => {
    const input = $('#riddle-input');
    if (input) input.focus();
    // Mostrar botón de pista después de 20 segundos
    setTimeout(() => {
      const hintBtn = $('#hint-btn');
      if (hintBtn) hintBtn.style.display = 'inline-block';
    }, 20000);
  }, 300);
}

function showRiddleHint() {
  if (STATE.riddleHintUsed) return;
  STATE.riddleHintUsed = true;
  const hintBox = $('#riddle-hint');
  if (hintBox) { hintBox.style.display = 'block'; hintBox.classList.add('hint-appear'); }
  const hintBtn = $('#hint-btn');
  if (hintBtn) hintBtn.style.display = 'none';
}

function submitRiddle() {
  const input = $('#riddle-input');
  if (!input) return;
  const val = normalize(input.value);
  if (!val) return;

  const ch = STATE.scenario.challenges[0];
  const correct = ch.answers.some(a => normalize(a) === val);

  if (correct) {
    // Calcular puntuación
    let score = MAX_CHALLENGE_SCORE;
    if (STATE.riddleHintUsed) score -= 25;
    if (STATE.riddleAttempts === 1) score -= 20;
    if (STATE.riddleAttempts >= 2) score -= 30;
    STATE.scores[0] = Math.max(score, 50);

    showFeedback('riddle-feedback', `✅ ¡Correcto! La respuesta es <strong>${ch.primaryAnswer}</strong>. (+${STATE.scores[0]} pts)`, 'success');
    input.disabled = true;
    $$('.btn-submit').forEach(b => b.disabled = true);
    setTimeout(() => {
      renderTransition(ch.clue, renderWordSearch);
    }, 1800);
  } else {
    STATE.riddleAttempts++;
    const remaining = 3 - STATE.riddleAttempts;
    const attemptsEl = $('#riddle-attempts');
    if (attemptsEl) attemptsEl.textContent = `Intentos restantes: ${remaining}`;

    if (remaining <= 0) {
      STATE.scores[0] = 0;
      showFeedback('riddle-feedback', `❌ La respuesta era <strong>${ch.primaryAnswer}</strong>.`, 'error');
      input.disabled = true;
      $$('.btn-submit').forEach(b => b.disabled = true);
      setTimeout(() => {
        renderTransition(ch.clue, renderWordSearch);
      }, 2500);
    } else {
      showFeedback('riddle-feedback', `❌ Incorrecto. Intentá de nuevo.`, 'error');
      shakeElement(input);
      input.value = '';
      input.focus();
      // Mostrar pista automáticamente en el segundo intento fallido
      if (STATE.riddleAttempts >= 2) showRiddleHint();
    }
  }
}

// ── Pantalla: Sopa de letras ──────────────────────────────────────────────────

function renderWordSearch() {
  const ch = STATE.scenario.challenges[1];

  // Generar la sopa con semilla = dayNum * 100 + scenarioId
  const seed = STATE.dayNum * 100 + STATE.scenario.id;
  STATE.ws.data = generateWordSearch(ch.words, seed, 12);
  STATE.ws.foundCount = 0;
  STATE.ws.hintsUsed = 0;
  STATE.ws.isSelecting = false;
  STATE.ws.startCell = null;
  STATE.ws.selectionCells = [];

  const wordListHTML = ch.words.map(w =>
    `<span class="ws-word" id="wsw-${normalize(w)}">${w}</span>`
  ).join('');

  setScreen(`
    <div class="screen screen-challenge screen-ws">
      ${challengeHeader(1)}
      <div class="challenge-card">
        <h2 class="challenge-title">${ch.title}</h2>
        <p class="challenge-instruction">${ch.instruction}</p>
        <div class="ws-layout">
          <div id="ws-grid-container" class="ws-grid-container">
            ${buildGridHTML()}
          </div>
          <div class="ws-sidebar">
            <div class="ws-words-label">Palabras a encontrar:</div>
            <div class="ws-word-list">${wordListHTML}</div>
            <div class="ws-found-count">
              Encontradas: <span id="ws-found-num">0</span>/${ch.words.length}
            </div>
            <button class="btn-hint-ws" onclick="wsHint()" id="ws-hint-btn">
              💡 Revelar una palabra (−15 pts)
            </button>
          </div>
        </div>
        <div id="ws-feedback" class="feedback"></div>
      </div>
    </div>
  `);

  setTimeout(attachWordSearchEvents, 300);
}

function buildGridHTML() {
  const { grid, size } = STATE.ws.data;
  let html = `<div class="ws-grid" id="ws-grid" style="grid-template-columns: repeat(${size}, 1fr)">`;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      html += `<div class="ws-cell" data-r="${r}" data-c="${c}">${grid[r][c]}</div>`;
    }
  }
  html += '</div>';
  return html;
}

function attachWordSearchEvents() {
  const grid = $('#ws-grid');
  if (!grid) return;

  // Prevenir scroll en móvil durante la sopa
  grid.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

  grid.addEventListener('pointerdown', wsPointerDown);
  document.addEventListener('pointermove', wsPointerMove);
  document.addEventListener('pointerup', wsPointerUp);
}

function getCellFromPoint(x, y) {
  const el = document.elementFromPoint(x, y);
  if (el && el.classList.contains('ws-cell')) {
    return { r: parseInt(el.dataset.r), c: parseInt(el.dataset.c) };
  }
  return null;
}

function wsPointerDown(e) {
  e.preventDefault();
  const cell = getCellFromPoint(e.clientX, e.clientY);
  if (!cell) return;
  STATE.ws.isSelecting = true;
  STATE.ws.startCell = cell;
  STATE.ws.selectionCells = [cell];
  updateWSSelection([cell]);
}

function wsPointerMove(e) {
  if (!STATE.ws.isSelecting) return;
  const cell = getCellFromPoint(e.clientX, e.clientY);
  if (!cell) return;

  const line = getCellsInLine(STATE.ws.startCell, cell);
  if (line.length > 0) {
    STATE.ws.selectionCells = line;
    updateWSSelection(line);
  }
}

function wsPointerUp(e) {
  if (!STATE.ws.isSelecting) return;
  STATE.ws.isSelecting = false;

  const cells = STATE.ws.selectionCells;
  const { data } = STATE.ws;

  if (cells.length >= 2) {
    const found = checkSelection(cells, data.grid, data.placed);
    if (found) {
      found.found = true;
      STATE.ws.foundCount++;
      markFoundCells(found.cells);
      markWordFound(found.word);

      const foundNumEl = $('#ws-found-num');
      if (foundNumEl) foundNumEl.textContent = STATE.ws.foundCount;

      // ¿Todas encontradas?
      const totalWords = STATE.scenario.challenges[1].words.length;
      if (STATE.ws.foundCount >= totalWords) {
        wsComplete();
      }
    }
  }

  // Limpiar selección visual
  clearWSSelection();
  STATE.ws.selectionCells = [];
}

function updateWSSelection(cells) {
  // Limpiar selección anterior
  $$('.ws-cell.selecting').forEach(c => c.classList.remove('selecting'));
  // Marcar celdas actuales
  cells.forEach(({ r, c }) => {
    const cellEl = document.querySelector(`.ws-cell[data-r="${r}"][data-c="${c}"]`);
    if (cellEl && !cellEl.classList.contains('found')) {
      cellEl.classList.add('selecting');
    }
  });
}

function clearWSSelection() {
  $$('.ws-cell.selecting').forEach(c => c.classList.remove('selecting'));
}

function markFoundCells(cells) {
  cells.forEach(({ r, c }) => {
    const cellEl = document.querySelector(`.ws-cell[data-r="${r}"][data-c="${c}"]`);
    if (cellEl) {
      cellEl.classList.remove('selecting');
      cellEl.classList.add('found');
    }
  });
}

function markWordFound(normalizedWord) {
  const wordEl = document.getElementById(`wsw-${normalizedWord}`);
  if (wordEl) wordEl.classList.add('found');
}

function wsHint() {
  const unfound = STATE.ws.data.placed.filter(p => !p.found);
  if (unfound.length === 0) return;

  STATE.ws.hintsUsed++;
  const target = unfound[0];
  target.found = true;
  STATE.ws.foundCount++;

  markFoundCells(target.cells);
  markWordFound(target.word);

  const foundNumEl = $('#ws-found-num');
  if (foundNumEl) foundNumEl.textContent = STATE.ws.foundCount;

  const totalWords = STATE.scenario.challenges[1].words.length;
  if (STATE.ws.foundCount >= totalWords) {
    wsComplete();
  }

  // Si ya no quedan palabras, ocultar botón
  if (unfound.length <= 1) {
    const hintBtn = $('#ws-hint-btn');
    if (hintBtn) hintBtn.style.display = 'none';
  }
}

function wsComplete() {
  // Desconectar eventos de pointer
  document.removeEventListener('pointermove', wsPointerMove);
  document.removeEventListener('pointerup', wsPointerUp);

  const score = Math.max(MAX_CHALLENGE_SCORE - STATE.ws.hintsUsed * 15, 40);
  STATE.scores[1] = score;

  showFeedback('ws-feedback', `✅ ¡Todas las palabras encontradas! (+${score} pts)`, 'success');

  const ch = STATE.scenario.challenges[1];
  setTimeout(() => {
    renderTransition(ch.clue, renderCipher);
  }, 1500);
}

// ── Pantalla: Mensaje Cifrado ─────────────────────────────────────────────────

function renderCipher() {
  const ch = STATE.scenario.challenges[2];
  STATE.cipherAttempts = 0;
  STATE.cipherHintUsed = false;

  const shift = ch.shift || 3;
  const encoded = caesarEncode(ch.answer, shift);
  const instruction = `${ch.context} Es un cifrado César con desplazamiento +${shift}. Descifralo:`;

  // Construir tabla de referencia para este shift
  const refHTML = buildCaesarRef(shift);

  setScreen(`
    <div class="screen screen-challenge">
      ${challengeHeader(2)}
      <div class="challenge-card">
        <h2 class="challenge-title">${ch.title}</h2>
        <p class="challenge-instruction">${instruction}</p>
        <div class="cipher-box">
          <div class="cipher-encoded">${encoded}</div>
          <div class="cipher-shift-label">Clave: cada letra fue desplazada +${shift} posiciones hacia adelante en el abecedario</div>
        </div>
        <div class="cipher-ref-toggle">
          <button class="btn-hint" onclick="toggleCipherRef()">📖 Mostrar tabla de referencia</button>
        </div>
        <div id="cipher-ref" class="cipher-ref" style="display:none">${refHTML}</div>
        <div id="cipher-hint" class="hint-box" style="display:none">
          💡 Pista: ${ch.hint}
        </div>
        <div class="input-row">
          <input id="cipher-input" class="text-input" type="text" placeholder="Mensaje descifrado..." autocomplete="off" autocorrect="off" spellcheck="false" maxlength="40"
            onkeydown="if(event.key==='Enter') submitCipher()">
          <button class="btn-submit" onclick="submitCipher()">Confirmar</button>
        </div>
        <div id="cipher-feedback" class="feedback"></div>
        <div class="attempts-info">
          <span id="cipher-attempts">Intentos restantes: 3</span>
          <button class="btn-hint" id="cipher-hint-btn" onclick="showCipherHint()" style="display:none">Ver pista (−25 pts)</button>
        </div>
      </div>
    </div>
  `);

  setTimeout(() => {
    const input = $('#cipher-input');
    if (input) input.focus();
    setTimeout(() => {
      const hintBtn = $('#cipher-hint-btn');
      if (hintBtn) hintBtn.style.display = 'inline-block';
    }, 20000);
  }, 300);
}

function buildCaesarRef(shift) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rows = '';
  for (let i = 0; i < 26; i++) {
    const original = alphabet[i];
    const encoded = alphabet[(i + shift) % 26];
    rows += `<span class="caesar-pair"><span class="caesar-orig">${original}</span><span class="caesar-arrow">→</span><span class="caesar-enc">${encoded}</span></span>`;
  }
  return `<div class="caesar-ref">${rows}</div>`;
}

function toggleCipherRef() {
  const ref = $('#cipher-ref');
  if (!ref) return;
  ref.style.display = ref.style.display === 'none' ? 'block' : 'none';
}

function showCipherHint() {
  if (STATE.cipherHintUsed) return;
  STATE.cipherHintUsed = true;
  const hintBox = $('#cipher-hint');
  if (hintBox) { hintBox.style.display = 'block'; hintBox.classList.add('hint-appear'); }
  const hintBtn = $('#cipher-hint-btn');
  if (hintBtn) hintBtn.style.display = 'none';
}

function submitCipher() {
  const input = $('#cipher-input');
  if (!input) return;
  const val = normalize(input.value);
  if (!val) return;

  const ch = STATE.scenario.challenges[2];
  const correct = normalize(ch.answer) === val;

  if (correct) {
    let score = MAX_CHALLENGE_SCORE;
    if (STATE.cipherHintUsed) score -= 25;
    if (STATE.cipherAttempts === 1) score -= 20;
    if (STATE.cipherAttempts >= 2) score -= 30;
    STATE.scores[2] = Math.max(score, 50);

    showFeedback('cipher-feedback', `✅ ¡Correcto! El mensaje oculto era <strong>${ch.answer}</strong>. (+${STATE.scores[2]} pts)`, 'success');
    input.disabled = true;
    $$('.btn-submit').forEach(b => b.disabled = true);
    setTimeout(() => renderTransition(ch.clue, renderTestimony), 1800);
  } else {
    STATE.cipherAttempts++;
    const remaining = 3 - STATE.cipherAttempts;
    const attemptsEl = $('#cipher-attempts');
    if (attemptsEl) attemptsEl.textContent = `Intentos restantes: ${remaining}`;

    if (remaining <= 0) {
      STATE.scores[2] = 0;
      showFeedback('cipher-feedback', `❌ La respuesta era <strong>${ch.answer}</strong>.`, 'error');
      input.disabled = true;
      $$('.btn-submit').forEach(b => b.disabled = true);
      setTimeout(() => renderTransition(ch.clue, renderTestimony), 2500);
    } else {
      showFeedback('cipher-feedback', `❌ Incorrecto. Intentá de nuevo.`, 'error');
      shakeElement(input);
      input.value = '';
      input.focus();
      if (STATE.cipherAttempts >= 2) showCipherHint();
    }
  }
}

// ── Pantalla: Testimonio ──────────────────────────────────────────────────────

function renderTestimony() {
  const ch = STATE.scenario.challenges[3];
  STATE.testimonyAnswered = false;

  // Mezclar opciones pero recordar cuál es la correcta
  const optionsWithIndex = ch.options.map((opt, i) => ({ ...opt, origIdx: i }));

  const optionsHTML = optionsWithIndex.map((opt, i) =>
    `<button class="testimony-option" onclick="submitTestimony(${i}, ${opt.correct})" data-idx="${i}">
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span class="option-text">${opt.text}</span>
    </button>`
  ).join('');

  setScreen(`
    <div class="screen screen-challenge">
      ${challengeHeader(3)}
      <div class="challenge-card">
        <h2 class="challenge-title">${ch.title}</h2>
        <p class="challenge-instruction">${ch.instruction}</p>
        <div class="testimony-box">
          <div class="testimony-text">${ch.text.replace(/\n/g, '<br>')}</div>
        </div>
        <div class="testimony-question">${ch.question}</div>
        <div class="testimony-options" id="testimony-options">
          ${optionsHTML}
        </div>
        <div id="testimony-feedback" class="feedback"></div>
        <div id="testimony-explanation" class="explanation-box" style="display:none"></div>
      </div>
    </div>
  `);
}

function submitTestimony(idx, isCorrect) {
  if (STATE.testimonyAnswered) return;
  STATE.testimonyAnswered = true;

  const ch = STATE.scenario.challenges[3];
  const buttons = $$('.testimony-option');
  buttons.forEach(b => b.disabled = true);

  const chosen = buttons[idx];
  if (isCorrect) {
    STATE.scores[3] = MAX_CHALLENGE_SCORE;
    chosen.classList.add('correct');
    showFeedback('testimony-feedback', `✅ ¡Correcto! Bien razonado. (+${MAX_CHALLENGE_SCORE} pts)`, 'success');
  } else {
    STATE.scores[3] = 0;
    chosen.classList.add('wrong');
    // Marcar la correcta
    buttons.forEach(b => {
      const idx2 = parseInt(b.dataset.idx);
      if (ch.options[idx2] && ch.options[idx2].correct) b.classList.add('correct');
    });
    showFeedback('testimony-feedback', `❌ Respuesta incorrecta.`, 'error');
  }

  const explanationEl = $('#testimony-explanation');
  if (explanationEl) {
    explanationEl.style.display = 'block';
    explanationEl.innerHTML = `📖 <strong>Explicación:</strong> ${ch.explanation}`;
  }

  setTimeout(() => renderAccusation(), 3000);
}

// ── Pantalla: Acusación Final ─────────────────────────────────────────────────

function renderAccusation() {
  const sc = STATE.scenario;

  const suspectsHTML = sc.suspects.map((s, i) =>
    `<button class="accuse-card" onclick="submitAccusation(${i})">
      <div class="accuse-emoji">${s.emoji}</div>
      <div class="accuse-name">${s.name}</div>
      <div class="accuse-role">${s.role}</div>
    </button>`
  ).join('');

  // Puntuación parcial
  const partial = STATE.scores.reduce((a, b) => a + (b || 0), 0);

  setScreen(`
    <div class="screen screen-challenge screen-accusation">
      <div class="challenge-header">
        <div class="challenge-meta">
          <span class="challenge-badge">⚖️ PRUEBA 5/5</span>
          <span class="challenge-type-label">Acusación Final</span>
        </div>
        <div id="timer" class="timer">${STATE.startTime ? '⏱ ' + formatTime(Date.now() - STATE.startTime) : ''}</div>
      </div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:100%"></div></div>

      <div class="challenge-card accusation-card">
        <h2 class="challenge-title">¿Quién es el asesino?</h2>
        <p class="challenge-instruction">
          Basándote en todas las pruebas que recopilaste, ¿a quién acusás del crimen?<br>
          <strong>Esta es tu única oportunidad. Elegí con cuidado.</strong>
        </p>
        <div class="accusation-score-hint">
          Puntuación parcial: <strong>${partial} pts</strong> · Acertar vale +${ACCUSATION_SCORE} pts adicionales
        </div>
        <div class="accuse-grid">${suspectsHTML}</div>
      </div>
    </div>
  `);
}

function submitAccusation(idx) {
  const sc = STATE.scenario;
  STATE.accusationCorrect = (idx === sc.culprit);
  STATE.accusationScore = STATE.accusationCorrect ? ACCUSATION_SCORE : 0;

  stopTimer();
  saveResult();
  STATE.stats = updateStats();
  renderResults();
}

// ── Pantalla: Resultados ──────────────────────────────────────────────────────

function renderResults() {
  const sc = STATE.scenario;
  const culprit = sc.suspects[sc.culprit];
  const total = totalScore();
  const maxScore = maxPossibleScore();
  const timeBonus = getTimeBonusScore();
  const challengeTotal = STATE.scores.reduce((a, b) => a + (b || 0), 0);
  const timeStr = formatTime(STATE.elapsed);

  // Emoji chain para compartir
  const emojiChain = STATE.scores.map(s => {
    if (s === null || s === 0) return '🟥';
    if (s >= MAX_CHALLENGE_SCORE) return '🟩';
    return '🟨';
  }).join('') + (STATE.accusationCorrect ? '🟩' : '🟥');

  const verdict = STATE.accusationCorrect
    ? `✅ ¡CASO RESUELTO! Acusaste correctamente a <strong>${culprit.name}</strong>.`
    : `❌ Caso sin resolver. El verdadero culpable era <strong>${culprit.name}</strong>.`;

  const challengeRows = [
    '🔍 Adivinanza',
    '🔎 Sopa de Letras',
    '📜 Mensaje Cifrado',
    '💬 Testimonio',
  ].map((label, i) => {
    const s = STATE.scores[i];
    const icon = s === MAX_CHALLENGE_SCORE ? '✅' : s > 0 ? '🟡' : '❌';
    return `<div class="result-row">
      <span class="result-label">${label}</span>
      <span class="result-score ${s > 0 ? 'positive' : 'zero'}">${icon} ${s !== null ? s : 0} pts</span>
    </div>`;
  }).join('');

  // Determinar rango
  const pct = total / maxScore;
  let rank, rankClass;
  if (pct >= 0.9) { rank = '🏆 Detective Maestro'; rankClass = 'rank-gold'; }
  else if (pct >= 0.7) { rank = '🥈 Detective Experto'; rankClass = 'rank-silver'; }
  else if (pct >= 0.5) { rank = '🥉 Detective en Progreso'; rankClass = 'rank-bronze'; }
  else { rank = '🔰 Detective Novato'; rankClass = 'rank-novice'; }

  setScreen(`
    <div class="screen screen-results">
      <div class="results-header">
        <div class="results-title">El Crimen del Día</div>
        <div class="results-subtitle">${sc.title}</div>
      </div>

      <div class="verdict-banner ${STATE.accusationCorrect ? 'verdict-win' : 'verdict-lose'}">
        ${verdict}
      </div>

      <div class="culprit-reveal">
        <div class="culprit-emoji">${culprit.emoji}</div>
        <div class="culprit-name">${culprit.name}</div>
        <div class="culprit-role">${culprit.role}</div>
        <div class="culprit-detail">${culprit.detail}</div>
      </div>

      <div class="results-scores">
        ${challengeRows}
        <div class="result-row">
          <span class="result-label">⚖️ Acusación Final</span>
          <span class="result-score ${STATE.accusationScore > 0 ? 'positive' : 'zero'}">${STATE.accusationCorrect ? '✅' : '❌'} ${STATE.accusationScore} pts</span>
        </div>
        <div class="result-row">
          <span class="result-label">⏱ Bonus de tiempo (${timeStr})</span>
          <span class="result-score ${timeBonus > 0 ? 'positive' : 'zero'}">${timeBonus > 0 ? '⚡' : '—'} ${timeBonus} pts</span>
        </div>
        <div class="result-total-row">
          <span class="result-total-label">TOTAL</span>
          <span class="result-total-score">${total} / ${maxScore}</span>
        </div>
      </div>

      <div class="rank-badge ${rankClass}">${rank}</div>

      <div class="results-actions">
        <button class="btn-share" onclick="shareResults('${emojiChain}', '${timeStr}', ${total}, ${maxScore})">
          📤 Compartir resultado
        </button>
        <div id="share-feedback" class="share-feedback"></div>
      </div>

      ${STATE.stats ? renderStatsBlock(STATE.stats) : ''}

      <div class="results-next">
        <div class="next-crime-text">🗓 Próximo crimen en <strong id="countdown">${timeUntilNextCrime()}</strong></div>
      </div>
    </div>
  `);

  // Refrescar la cuenta regresiva cada minuto
  if (STATE.countdownInterval) clearInterval(STATE.countdownInterval);
  STATE.countdownInterval = setInterval(() => {
    const el = $('#countdown');
    if (el) el.textContent = timeUntilNextCrime();
  }, 60000);
}

// ── Compartir ─────────────────────────────────────────────────────────────────

function shareResults(emojiChain, timeStr, total, maxScore) {
  const sc = STATE.scenario;
  const verdict = STATE.accusationCorrect ? '✅ RESUELTO' : '❌ SIN RESOLVER';
  const siteURL = window.location.href.split('?')[0];

  const text = [
    `🔍 El Crimen del Día #${STATE.dayNum}`,
    `"${sc.title}"`,
    ``,
    `⏱ Tiempo: ${timeStr}`,
    `🏆 Puntuación: ${total}/${maxScore}`,
    `🎯 Caso: ${verdict}`,
    ``,
    emojiChain,
    ``,
    `¿Podés resolver el crimen de hoy?`,
    siteURL,
  ].join('\n');

  // Web Share API (móvil) o copiar al portapapeles
  if (navigator.share) {
    navigator.share({ title: 'El Crimen del Día', text }).catch(() => copyToClipboard(text));
  } else {
    copyToClipboard(text);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const fb = $('#share-feedback');
    if (fb) {
      fb.textContent = '✅ ¡Copiado al portapapeles!';
      fb.style.display = 'block';
      setTimeout(() => { fb.style.display = 'none'; }, 3000);
    }
  }).catch(() => {
    // Fallback: prompt con el texto
    prompt('Copiá este texto para compartir:', text);
  });
}

// ── Feedback visual ───────────────────────────────────────────────────────────

function showFeedback(id, html, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = html;
  el.className = `feedback feedback-${type} feedback-visible`;
  setTimeout(() => el.classList.remove('feedback-visible'), 3000);
}

function shakeElement(el) {
  if (!el) return;
  el.classList.remove('shake');
  // Forzar reflow para que la animación se reinicie aunque se aplique seguidamente
  void el.offsetWidth;
  el.classList.add('shake');
}

// ── Estadísticas persistentes ────────────────────────────────────────────────

function loadStats() {
  const defaults = {
    played: 0,
    solved: 0,
    streak: 0,
    bestStreak: 0,
    lastSolvedDay: null,
    bestTime: null,
    bestScore: 0,
  };
  try {
    const raw = localStorage.getItem('crimen_stats');
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch(e) {
    return defaults;
  }
}

function updateStats() {
  const s = loadStats();

  // Evitar contar dos veces el mismo día si por alguna razón se llama dos veces
  if (s.lastPlayedDay === STATE.dayNum) return s;

  s.played++;

  if (STATE.accusationCorrect) {
    s.solved++;

    // Racha: ¿se resolvió ayer también?
    if (s.lastSolvedDay === STATE.dayNum - 1) {
      s.streak++;
    } else {
      s.streak = 1;
    }
    s.lastSolvedDay = STATE.dayNum;

    if (s.streak > s.bestStreak) s.bestStreak = s.streak;
    if (!s.bestTime || STATE.elapsed < s.bestTime) s.bestTime = STATE.elapsed;
    const score = totalScore();
    if (score > s.bestScore) s.bestScore = score;
  } else {
    s.streak = 0;
  }

  s.lastPlayedDay = STATE.dayNum;
  try { localStorage.setItem('crimen_stats', JSON.stringify(s)); } catch(e) {}
  return s;
}

function renderStatsBlock(stats) {
  const winRate = stats.played > 0 ? Math.round((stats.solved / stats.played) * 100) : 0;
  const bestTimeStr = stats.bestTime ? formatTime(stats.bestTime) : '—';
  return `
    <div class="stats-block">
      <div class="stats-title">📊 Tus Estadísticas</div>
      <div class="stats-grid">
        <div class="stat-cell">
          <div class="stat-value">${stats.played}</div>
          <div class="stat-label">Jugados</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">${stats.solved}</div>
          <div class="stat-label">Resueltos</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">${winRate}%</div>
          <div class="stat-label">Éxito</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">🔥 ${stats.streak}</div>
          <div class="stat-label">Racha</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">🏆 ${stats.bestStreak}</div>
          <div class="stat-label">Mejor racha</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">⚡ ${bestTimeStr}</div>
          <div class="stat-label">Mejor tiempo</div>
        </div>
      </div>
    </div>
  `;
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

function saveResult() {
  const result = {
    dayNum: STATE.dayNum,
    scores: STATE.scores,
    accusationCorrect: STATE.accusationCorrect,
    accusationScore: STATE.accusationScore,
    elapsed: STATE.elapsed,
    timestamp: Date.now(),
  };
  try {
    localStorage.setItem(`crimen_${STATE.dayNum}`, JSON.stringify(result));
  } catch(e) {}
}

function loadSavedResult() {
  try {
    const raw = localStorage.getItem(`crimen_${STATE.dayNum}`);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

// ── Inicio ────────────────────────────────────────────────────────────────────

function startGame() {
  startTimer();
  STATE.phase = 'challenge';
  renderRiddle();
}

function init() {
  STATE.dayNum = getDayNumber();
  STATE.scenario = getTodaysCrime();

  // ¿Ya jugó hoy?
  const saved = loadSavedResult();
  if (saved) {
    STATE.scores = saved.scores;
    STATE.accusationCorrect = saved.accusationCorrect;
    STATE.accusationScore = saved.accusationScore;
    STATE.elapsed = saved.elapsed;
    STATE.startTime = Date.now() - saved.elapsed;
    STATE.endTime = Date.now();
    STATE.stats = loadStats();
    renderResults();
    return;
  }

  renderIntro();
}

// Arrancar
document.addEventListener('DOMContentLoaded', init);
