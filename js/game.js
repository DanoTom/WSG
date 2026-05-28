// =====================================================
//  EL CRIMEN DEL DÍA — Controlador principal del juego
// =====================================================

// ── Estado global ─────────────────────────────────────────────────────────────

const STATE = {
  scenario: null,
  dayNum: 0,

  phase: 'intro',
  challengeIdx: 0,

  scores: [null, null, null, null],
  accusationCorrect: null,
  accusationScore: 0,

  startTime: null,
  endTime: null,
  timerInterval: null,
  elapsed: 0,

  riddleAttempts: 0,
  riddleHintUsed: false,
  cipherHintUsed: false,
  cipherCurrentShift: 1,
  testimonyAnswered: false,

  ws: {
    data: null,
    isSelecting: false,
    startCell: null,
    selectionCells: [],
    foundCount: 0,
    hintsUsed: 0,
  },

  suspectOrder: null,
  pendingTransition: null,

  notebook: { entries: [], unread: 0 },
  testimonyParts: [],
  testimonyShownParts: 0,
};

// ── Constantes ────────────────────────────────────────────────────────────────

const MAX_CHALLENGE_SCORE = 100;
const ACCUSATION_SCORE = 200;
const MAX_TIME_BONUS = 200;
const TIME_BONUS_CUTOFF_MS = 20 * 60 * 1000;

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

function executeTransition() {
  const fn = STATE.pendingTransition;
  STATE.pendingTransition = null;
  if (fn) fn();
}

function buildSuspectOrder(dayNum, count) {
  const rng = new SeededRandom(dayNum * 97 + 31);
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = rng.nextInt(i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function difficultyLabel(level) {
  if (level === 1) return { dots: '●○○', text: 'CASO SIMPLE',   cls: 'difficulty-1' };
  if (level === 3) return { dots: '●●●', text: 'CASO MAESTRO',  cls: 'difficulty-3' };
  return                  { dots: '●●○', text: 'CASO COMPLEJO', cls: 'difficulty-2' };
}

function caesarEncode(text, shift) {
  return text.toUpperCase().split('').map(c => {
    if (/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65);
    return c;
  }).join('');
}

function caesarDecode(text, shift) {
  return caesarEncode(text, (26 - (shift % 26)) % 26);
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
    const timerEl = $('#timer');
    if (timerEl && STATE.startTime && !STATE.endTime) {
      timerEl.textContent = '⏱ ' + formatTime(Date.now() - STATE.startTime);
    }
  }, 250);
}

function renderTimeline(activeIdx) {
  const nodes = [
    { icon: '🔍', label: 'Pista' },
    { icon: '🔎', label: 'Sopa' },
    { icon: '📜', label: 'Cifrado' },
    { icon: '💬', label: 'Testigo' },
    { icon: '⚖️', label: 'Acusar' },
  ];
  let html = '<div class="timeline">';
  nodes.forEach((n, i) => {
    const isDone   = i < activeIdx;
    const isActive = i === activeIdx;
    const nodeCls  = isDone ? 'done' : isActive ? 'active' : 'pending';
    const labelCls = isDone ? 'done-label' : isActive ? 'active-label' : '';
    html += `<div class="timeline-step">
      <div class="timeline-node ${nodeCls}">${isDone ? '✓' : n.icon}</div>
      <div class="timeline-label ${labelCls}">${n.label}</div>
    </div>`;
    if (i < nodes.length - 1) {
      html += `<div class="timeline-line${isDone ? ' done' : ''}"></div>`;
    }
  });
  html += '</div>';
  return html;
}

function challengeHeader(idx) {
  return `
    <div class="challenge-header">
      <div class="challenge-timer-row">
        <div id="timer" class="timer">${STATE.startTime ? '⏱ ' + formatTime(Date.now() - STATE.startTime) : ''}</div>
      </div>
      ${renderTimeline(idx)}
    </div>
  `;
}

// ── Cuaderno del Detective ────────────────────────────────────────────────────

function addNotebookEntry(icon, title, content) {
  STATE.notebook.entries.push({ icon, title, content });
  STATE.notebook.unread++;
  updateNotebookBadge();
}

function updateNotebookBadge() {
  const badge = $('#notebook-badge');
  if (!badge) return;
  if (STATE.notebook.unread > 0) {
    badge.textContent = STATE.notebook.unread;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function toggleNotebook() {
  const drawer  = $('#notebook-drawer');
  const overlay = $('#notebook-overlay');
  if (!drawer) return;
  if (drawer.classList.contains('open')) {
    closeNotebook();
  } else {
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    STATE.notebook.unread = 0;
    updateNotebookBadge();
    renderNotebookEntries();
  }
}

function closeNotebook() {
  const drawer  = $('#notebook-drawer');
  const overlay = $('#notebook-overlay');
  if (drawer)  drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

function renderNotebookEntries() {
  const container = $('#notebook-entries');
  if (!container) return;
  if (STATE.notebook.entries.length === 0) {
    container.innerHTML = '<div class="notebook-empty">Las pistas aparecerán aquí mientras investigás.</div>';
    return;
  }
  container.innerHTML = STATE.notebook.entries.map(entry => `
    <div class="notebook-entry">
      <div class="notebook-entry-header">
        <span class="notebook-entry-icon">${entry.icon}</span>
        <span class="notebook-entry-title">${entry.title}</span>
      </div>
      <div class="notebook-entry-content">${entry.content}</div>
    </div>
  `).join('');
}

function showNotebookFAB() {
  const btn = $('#notebook-btn');
  if (btn) btn.style.display = 'flex';
}

// ── Pantalla: Intro ───────────────────────────────────────────────────────────

function renderIntro() {
  const sc = STATE.scenario;
  const suspectsHTML = STATE.suspectOrder.map(origIdx => {
    const s = sc.suspects[origIdx];
    return `<div class="suspect-card">
      <div class="suspect-emoji">${s.emoji}</div>
      <div class="suspect-name">${s.name}</div>
      <div class="suspect-role">${s.role}</div>
      <div class="suspect-detail">${s.detail}</div>
    </div>`;
  }).join('');

  const diff = difficultyLabel(sc.difficulty || 2);

  setScreen(`
    <div class="screen screen-intro">
      <div class="intro-top">
        <div class="crime-number">🗓 Crimen #${STATE.dayNum} · ${formatDate()}</div>
        <div class="difficulty-badge ${diff.cls}">${diff.dots} ${diff.text}</div>
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
  STATE.pendingTransition = nextFn;
  setScreen(`
    <div class="screen screen-transition">
      <div id="timer" class="timer timer-float">${STATE.startTime ? '⏱ ' + formatTime(Date.now() - STATE.startTime) : ''}</div>
      <div class="transition-icon">🔑</div>
      <div class="transition-title">¡Pista Desbloqueada!</div>
      <div class="transition-clue">${clueText}</div>
      <button class="btn-next" onclick="executeTransition()">Continuar →</button>
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

function continueAfterRiddleFail() {
  const ch = STATE.scenario.challenges[0];
  renderTransition(ch.clue, renderWordSearch);
}

function submitRiddle() {
  const input = $('#riddle-input');
  if (!input) return;
  const val = normalize(input.value);
  if (!val) return;

  const ch = STATE.scenario.challenges[0];
  const correct = ch.answers.some(a => normalize(a) === val);

  if (correct) {
    let score = MAX_CHALLENGE_SCORE;
    if (STATE.riddleHintUsed) score -= 25;
    if (STATE.riddleAttempts === 1) score -= 20;
    if (STATE.riddleAttempts >= 2) score -= 30;
    STATE.scores[0] = Math.max(score, 50);

    showFeedback('riddle-feedback', `✅ ¡Correcto! La respuesta es <strong>${ch.primaryAnswer}</strong>. (+${STATE.scores[0]} pts)`, 'success');
    input.disabled = true;
    $$('.btn-submit').forEach(b => b.disabled = true);
    addNotebookEntry('🔑', 'Pista 1: Adivinanza', ch.clue);
    setTimeout(() => renderTransition(ch.clue, renderWordSearch), 1800);
  } else {
    STATE.riddleAttempts++;
    const remaining = 3 - STATE.riddleAttempts;
    const attemptsEl = $('#riddle-attempts');

    if (remaining <= 0) {
      STATE.scores[0] = 0;
      showFeedback('riddle-feedback', `❌ La respuesta era <strong>${ch.primaryAnswer}</strong>.`, 'error');
      input.disabled = true;
      $$('.btn-submit').forEach(b => b.disabled = true);
      addNotebookEntry('🔑', 'Pista 1: Adivinanza', ch.clue);
      if (attemptsEl) attemptsEl.innerHTML = '<button class="btn-continue-fail" onclick="continueAfterRiddleFail()">Continuar investigación →</button>';
    } else {
      if (attemptsEl) attemptsEl.textContent = `Intentos restantes: ${remaining}`;
      showFeedback('riddle-feedback', `❌ Incorrecto. Intentá de nuevo.`, 'error');
      shakeElement(input);
      input.value = '';
      input.focus();
      if (STATE.riddleAttempts >= 2) showRiddleHint();
    }
  }
}

// ── Pantalla: Sopa de letras ──────────────────────────────────────────────────

function renderWordSearch() {
  const ch = STATE.scenario.challenges[1];

  const seed = STATE.dayNum * 100 + STATE.scenario.id;
  STATE.ws.data = generateWordSearch(ch.words, seed, 12);
  STATE.ws.foundCount  = 0;
  STATE.ws.hintsUsed   = 0;
  STATE.ws.isSelecting = false;
  STATE.ws.startCell   = null;
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
  STATE.ws.isSelecting  = true;
  STATE.ws.startCell    = cell;
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
      const totalWords = STATE.scenario.challenges[1].words.length;
      if (STATE.ws.foundCount >= totalWords) wsComplete();
    }
  }

  clearWSSelection();
  STATE.ws.selectionCells = [];
}

function updateWSSelection(cells) {
  $$('.ws-cell.selecting').forEach(c => c.classList.remove('selecting'));
  cells.forEach(({ r, c }) => {
    const cellEl = document.querySelector(`.ws-cell[data-r="${r}"][data-c="${c}"]`);
    if (cellEl && !cellEl.classList.contains('found')) cellEl.classList.add('selecting');
  });
}

function clearWSSelection() {
  $$('.ws-cell.selecting').forEach(c => c.classList.remove('selecting'));
}

function markFoundCells(cells) {
  cells.forEach(({ r, c }) => {
    const cellEl = document.querySelector(`.ws-cell[data-r="${r}"][data-c="${c}"]`);
    if (cellEl) { cellEl.classList.remove('selecting'); cellEl.classList.add('found'); }
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
  if (STATE.ws.foundCount >= totalWords) wsComplete();

  if (unfound.length <= 1) {
    const hintBtn = $('#ws-hint-btn');
    if (hintBtn) hintBtn.style.display = 'none';
  }
}

function wsComplete() {
  document.removeEventListener('pointermove', wsPointerMove);
  document.removeEventListener('pointerup', wsPointerUp);

  const score = Math.max(MAX_CHALLENGE_SCORE - STATE.ws.hintsUsed * 15, 40);
  STATE.scores[1] = score;
  showFeedback('ws-feedback', `✅ ¡Todas las palabras encontradas! (+${score} pts)`, 'success');

  const ch = STATE.scenario.challenges[1];
  addNotebookEntry('🔑', 'Pista 2: Sopa de letras', ch.clue);
  setTimeout(() => renderTransition(ch.clue, renderCipher), 1500);
}

// ── Pantalla: Mensaje Cifrado (rueda interactiva) ─────────────────────────────

function buildCipherTiles(text) {
  return text.split('').map(c => {
    if (c === ' ') return '<span class="cipher-tile cipher-space">&nbsp;</span>';
    return `<span class="cipher-tile">${c}</span>`;
  }).join('');
}

function buildDecodedTiles(encoded, playerShift) {
  const decoded = caesarDecode(encoded, playerShift);
  return decoded.split('').map(c => {
    if (c === ' ') return '<span class="cipher-tile cipher-tile-decoded cipher-space">&nbsp;</span>';
    return `<span class="cipher-tile cipher-tile-decoded">${c}</span>`;
  }).join('');
}

function renderCipher() {
  const ch = STATE.scenario.challenges[2];
  STATE.cipherHintUsed    = false;
  STATE.cipherCurrentShift = 1;

  const encoded = caesarEncode(ch.answer, ch.shift || 3);

  setScreen(`
    <div class="screen screen-challenge">
      ${challengeHeader(2)}
      <div class="challenge-card">
        <h2 class="challenge-title">${ch.title}</h2>
        <p class="challenge-instruction">${ch.context} Hay un mensaje cifrado. Usá la rueda para encontrar el desplazamiento correcto y descifrar el texto.</p>

        <div class="cipher-panel">
          <div class="cipher-section-label">Mensaje interceptado</div>
          <div class="cipher-tiles-row">${buildCipherTiles(encoded)}</div>
        </div>

        <div class="cipher-wheel-box">
          <button class="cipher-wheel-btn" onclick="adjustCipherShift(-1)">◀</button>
          <div class="cipher-wheel-display">
            <div class="cipher-shift-value" id="cipher-shift-val">+1</div>
            <div class="cipher-shift-subtitle">desplazamiento</div>
          </div>
          <button class="cipher-wheel-btn" onclick="adjustCipherShift(1)">▶</button>
        </div>

        <div class="cipher-panel cipher-panel-decoded">
          <div class="cipher-section-label">Descifrado</div>
          <div class="cipher-tiles-row" id="cipher-decoded-tiles">${buildDecodedTiles(encoded, 1)}</div>
        </div>

        <div id="cipher-hint" class="hint-box" style="display:none"></div>

        <div class="attempts-info">
          <span></span>
          <button class="btn-hint" id="cipher-hint-btn" onclick="showCipherHint()" style="display:none">Ver pista (−25 pts)</button>
        </div>

        <button class="btn-submit btn-full" id="cipher-confirm-btn" onclick="submitCipherWheel()">Confirmar respuesta</button>

        <div id="cipher-feedback" class="feedback"></div>
      </div>
    </div>
  `);

  setTimeout(() => {
    setTimeout(() => {
      const hintBtn = $('#cipher-hint-btn');
      if (hintBtn) hintBtn.style.display = 'inline-block';
    }, 20000);
  }, 300);
}

function adjustCipherShift(delta) {
  STATE.cipherCurrentShift = ((STATE.cipherCurrentShift - 1 + delta + 25) % 25) + 1;
  updateCipherDisplay();
}

function updateCipherDisplay() {
  const shift   = STATE.cipherCurrentShift;
  const shiftEl = $('#cipher-shift-val');
  if (shiftEl) shiftEl.textContent = '+' + shift;

  const ch      = STATE.scenario.challenges[2];
  const encoded = caesarEncode(ch.answer, ch.shift || 3);
  const tilesEl = $('#cipher-decoded-tiles');
  if (tilesEl) tilesEl.innerHTML = buildDecodedTiles(encoded, shift);
}

function submitCipherWheel() {
  const ch      = STATE.scenario.challenges[2];
  const encoded = caesarEncode(ch.answer, ch.shift || 3);
  const decoded = caesarDecode(encoded, STATE.cipherCurrentShift);

  if (normalize(decoded) === normalize(ch.answer)) {
    const score = STATE.cipherHintUsed ? MAX_CHALLENGE_SCORE - 25 : MAX_CHALLENGE_SCORE;
    STATE.scores[2] = score;

    showFeedback('cipher-feedback', `✅ ¡Correcto! El mensaje era <strong>${ch.answer}</strong>. (+${score} pts)`, 'success');
    const confirmBtn = $('#cipher-confirm-btn');
    if (confirmBtn) confirmBtn.disabled = true;
    $$('.cipher-wheel-btn').forEach(b => b.disabled = true);
    addNotebookEntry('🔑', 'Pista 3: Cifrado', ch.clue);
    setTimeout(() => renderTransition(ch.clue, renderTestimony), 1800);
  } else {
    showFeedback('cipher-feedback', `❌ Ese desplazamiento no descifra el mensaje. Seguí intentando.`, 'error');
  }
}

function showCipherHint() {
  if (STATE.cipherHintUsed) return;
  STATE.cipherHintUsed = true;

  const ch = STATE.scenario.challenges[2];
  STATE.cipherCurrentShift = ch.shift || 3;
  updateCipherDisplay();

  const hintBox = $('#cipher-hint');
  if (hintBox) {
    hintBox.style.display = 'block';
    hintBox.classList.add('hint-appear');
    hintBox.innerHTML = `💡 El desplazamiento correcto es <strong>+${ch.shift || 3}</strong>. ${ch.hint}`;
  }
  const hintBtn = $('#cipher-hint-btn');
  if (hintBtn) hintBtn.style.display = 'none';
}

// ── Pantalla: Testimonio (burbujas progresivas) ───────────────────────────────

function buildTestimonyQuestion(ch) {
  const optionsHTML = ch.options.map((opt, i) =>
    `<button class="testimony-option" onclick="submitTestimony(${i}, ${opt.correct})" data-idx="${i}">
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span class="option-text">${opt.text}</span>
    </button>`
  ).join('');
  return `
    <div class="testimony-question">${ch.question}</div>
    <div class="testimony-options" id="testimony-options">${optionsHTML}</div>
  `;
}

function renderTestimony() {
  const ch = STATE.scenario.challenges[3];
  STATE.testimonyAnswered   = false;
  STATE.testimonyParts      = ch.text.split('\n\n').filter(p => p.trim());
  STATE.testimonyShownParts = 1;

  addNotebookEntry('💬', ch.title, ch.text.replace(/\n\n/g, '\n'));

  const firstBubble = `
    <div class="testimony-bubble">
      <div class="testimony-speaker">🗣️ ${ch.title}</div>
      ${STATE.testimonyParts[0].replace(/\n/g, '<br>')}
    </div>
  `;

  const hasMore        = STATE.testimonyParts.length > 1;
  const questionBlock  = hasMore ? '' : buildTestimonyQuestion(ch);
  const continueBtn    = hasMore
    ? `<button class="btn-testimony-continue" onclick="revealNextTestimonyPart()">Continuar interrogatorio →</button>`
    : '';

  setScreen(`
    <div class="screen screen-challenge">
      ${challengeHeader(3)}
      <div class="challenge-card">
        <h2 class="challenge-title">${ch.title}</h2>
        <p class="challenge-instruction">${ch.instruction}</p>
        <div class="testimony-bubbles" id="testimony-bubbles">
          ${firstBubble}
        </div>
        <div id="testimony-continue-wrap">${continueBtn}</div>
        <div id="testimony-question-section">${questionBlock}</div>
        <div id="testimony-feedback" class="feedback"></div>
        <div id="testimony-explanation" class="explanation-box" style="display:none"></div>
      </div>
    </div>
  `);
}

function revealNextTestimonyPart() {
  const ch       = STATE.scenario.challenges[3];
  const bubblesEl = $('#testimony-bubbles');
  if (!bubblesEl) return;

  const nextIdx = STATE.testimonyShownParts;
  if (nextIdx >= STATE.testimonyParts.length) return;

  const newBubble = document.createElement('div');
  newBubble.className = 'testimony-bubble testimony-bubble-new';
  newBubble.innerHTML = STATE.testimonyParts[nextIdx].replace(/\n/g, '<br>');
  bubblesEl.appendChild(newBubble);
  setTimeout(() => newBubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);

  STATE.testimonyShownParts++;

  if (STATE.testimonyShownParts >= STATE.testimonyParts.length) {
    const continueWrap = $('#testimony-continue-wrap');
    if (continueWrap) continueWrap.innerHTML = '';

    const questionSection = $('#testimony-question-section');
    if (questionSection) {
      questionSection.innerHTML = buildTestimonyQuestion(ch);
      questionSection.classList.add('testimony-question-appear');
    }
  }
}

function submitTestimony(idx, isCorrect) {
  if (STATE.testimonyAnswered) return;
  STATE.testimonyAnswered = true;

  const ch      = STATE.scenario.challenges[3];
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

  const suspectsHTML = STATE.suspectOrder.map((origIdx, displayIdx) => {
    const s = sc.suspects[origIdx];
    return `<button class="accuse-card" onclick="submitAccusation(${displayIdx})">
      <div class="accuse-emoji">${s.emoji}</div>
      <div class="accuse-name">${s.name}</div>
      <div class="accuse-role">${s.role}</div>
    </button>`;
  }).join('');

  const partial = STATE.scores.reduce((a, b) => a + (b || 0), 0);

  setScreen(`
    <div class="screen screen-challenge screen-accusation">
      ${challengeHeader(4)}
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

function submitAccusation(displayIdx) {
  const sc = STATE.scenario;
  const originalIdx = STATE.suspectOrder[displayIdx];
  STATE.accusationCorrect = (originalIdx === sc.culprit);
  STATE.accusationScore   = STATE.accusationCorrect ? ACCUSATION_SCORE : 0;

  stopTimer();
  saveResult();
  STATE.stats = updateStats();
  renderResults();
}

// ── Pantalla: Resultados ──────────────────────────────────────────────────────

function renderResults() {
  const sc      = STATE.scenario;
  const culprit = sc.suspects[sc.culprit];
  const total   = totalScore();
  const maxScore = maxPossibleScore();
  const timeBonus = getTimeBonusScore();
  const timeStr = formatTime(STATE.elapsed);

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

  const pct = total / maxScore;
  let rank, rankClass;
  if (pct >= 0.9)      { rank = '🏆 Detective Maestro';       rankClass = 'rank-gold'; }
  else if (pct >= 0.7) { rank = '🥈 Detective Experto';        rankClass = 'rank-silver'; }
  else if (pct >= 0.5) { rank = '🥉 Detective en Progreso';    rankClass = 'rank-bronze'; }
  else                 { rank = '🔰 Detective Novato';          rankClass = 'rank-novice'; }

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

  if (STATE.countdownInterval) clearInterval(STATE.countdownInterval);
  STATE.countdownInterval = setInterval(() => {
    const el = $('#countdown');
    if (el) el.textContent = timeUntilNextCrime();
  }, 60000);
}

// ── Compartir ─────────────────────────────────────────────────────────────────

function shareResults(emojiChain, timeStr, total, maxScore) {
  const sc      = STATE.scenario;
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
  void el.offsetWidth;
  el.classList.add('shake');
}

// ── Estadísticas persistentes ────────────────────────────────────────────────

function loadStats() {
  const defaults = {
    played: 0, solved: 0, streak: 0, bestStreak: 0,
    lastSolvedDay: null, bestTime: null, bestScore: 0,
  };
  try {
    const raw = localStorage.getItem('crimen_stats');
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch(e) { return defaults; }
}

function updateStats() {
  const s = loadStats();
  if (s.lastPlayedDay === STATE.dayNum) return s;

  s.played++;

  if (STATE.accusationCorrect) {
    s.solved++;
    s.streak = (s.lastSolvedDay === STATE.dayNum - 1) ? s.streak + 1 : 1;
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
  const winRate    = stats.played > 0 ? Math.round((stats.solved / stats.played) * 100) : 0;
  const bestTimeStr = stats.bestTime ? formatTime(stats.bestTime) : '—';
  return `
    <div class="stats-block">
      <div class="stats-title">📊 Tus Estadísticas</div>
      <div class="stats-grid">
        <div class="stat-cell"><div class="stat-value">${stats.played}</div><div class="stat-label">Jugados</div></div>
        <div class="stat-cell"><div class="stat-value">${stats.solved}</div><div class="stat-label">Resueltos</div></div>
        <div class="stat-cell"><div class="stat-value">${winRate}%</div><div class="stat-label">Éxito</div></div>
        <div class="stat-cell"><div class="stat-value">🔥 ${stats.streak}</div><div class="stat-label">Racha</div></div>
        <div class="stat-cell"><div class="stat-value">🏆 ${stats.bestStreak}</div><div class="stat-label">Mejor racha</div></div>
        <div class="stat-cell"><div class="stat-value">⚡ ${bestTimeStr}</div><div class="stat-label">Mejor tiempo</div></div>
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
  try { localStorage.setItem(`crimen_${STATE.dayNum}`, JSON.stringify(result)); } catch(e) {}
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
  showNotebookFAB();
  renderRiddle();
}

function init() {
  STATE.dayNum    = getDayNumber();
  STATE.scenario  = getTodaysCrime();
  STATE.suspectOrder = buildSuspectOrder(STATE.dayNum, STATE.scenario.suspects.length);

  const saved = loadSavedResult();
  if (saved) {
    STATE.scores          = saved.scores;
    STATE.accusationCorrect = saved.accusationCorrect;
    STATE.accusationScore = saved.accusationScore;
    STATE.elapsed         = saved.elapsed;
    STATE.startTime       = Date.now() - saved.elapsed;
    STATE.endTime         = Date.now();
    STATE.stats           = loadStats();
    renderResults();
    return;
  }

  renderIntro();
}

document.addEventListener('DOMContentLoaded', init);
