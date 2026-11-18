/**
 * 招式與特性圖鑑頁。
 * 列表資料來自預建索引（moves-index / abilities-index / species-index），打開即可搜尋；
 * 展開招式時才向 PokéAPI 取得「可學會的寶可夢」。
 */
import '../styles/move-catalog.css';
import { BASE_URL, typeColors, typeNamesCN, TYPE_ORDER } from '../config.js';
import { fetchJson } from '../api/client.js';
import { escapeHtml } from '../utils/infoCards.js';
import { initBackToTop } from './backToTop.js';
import {
  MOVE_CLASSES, MOVE_CLASS_LABELS, MAX_GEN,
  filterMoves, sortMoves, filterAbilities, sortAbilities, buildAbilityHolders,
  learnersFromMove, readCatalogState, catalogStateToSearch,
} from '../utils/moveCatalog.js';

const ARTWORK = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const SORT_LABELS = {
  moves: { id: '編號', name: '名稱', power: '威力（高→低）', accuracy: '命中（高→低）', pp: 'PP（多→少）', gen: '世代' },
  abilities: { id: '編號', name: '名稱', count: '擁有的寶可夢數', gen: '世代' },
};

let moves = [];
let abilities = [];
let speciesById = new Map();
let holders = new Map();
let state = readCatalogState(location.search);
let searchTimer = null;

const $ = (id) => document.getElementById(id);

function typeBadge(type) {
  return `<span class="type-badge mc-type" style="background:${typeColors[type] || '#666'}">${escapeHtml(typeNamesCN[type] || type)}</span>`;
}

function classChip(cls) {
  return `<span class="mc-class mc-class--${cls}">${MOVE_CLASS_LABELS[cls] || cls}</span>`;
}

function value(v, suffix = '') {
  return v === null || v === undefined ? '—' : `${v}${suffix}`;
}

function pokemonChip(id, { hidden = false } = {}) {
  const e = speciesById.get(id);
  if (!e) return '';
  return `<a class="mc-mon${hidden ? ' is-hidden' : ''}" href="./index.html?id=${id}" title="${escapeHtml(e.zh)}${hidden ? '（隱藏特性）' : ''}">
    <img src="${ARTWORK}/${e.p || e.id}.png" alt="" loading="lazy" width="48" height="48">
    <span>${escapeHtml(e.zh)}</span>${hidden ? '<small>隱藏</small>' : ''}
  </a>`;
}

/* ---------- 狀態與網址 ---------- */

function syncUrl() {
  const url = new URL(location.href);
  url.search = catalogStateToSearch(state);
  history.replaceState(null, '', url);
}

function setState(patch, { rerender = true } = {}) {
  clearTimeout(searchTimer);
  state = { ...state, ...patch };
  syncUrl();
  if (rerender) render();
}

/* ---------- 控制列 ---------- */

function fillSelect(select, options, selected) {
  select.innerHTML = options.map(([v, label]) => `<option value="${v}"${v === selected ? ' selected' : ''}>${label}</option>`).join('');
}

function renderControls() {
  const isMoves = state.tab === 'moves';
  document.querySelectorAll('.mc-tab').forEach((tab) => {
    const on = tab.dataset.tab === state.tab;
    tab.setAttribute('aria-selected', String(on));
    tab.classList.toggle('active', on);
    tab.tabIndex = on ? 0 : -1;
  });
  $('mcList').setAttribute('aria-labelledby', isMoves ? 'mcTabMoves' : 'mcTabAbilities');
  document.querySelectorAll('.mc-moves-only').forEach((el) => { el.hidden = !isMoves; });
  $('mcSearch').placeholder = isMoves ? '搜尋招式名稱（繁中或英文）或編號…' : '搜尋特性名稱（繁中或英文）或編號…';
  if ($('mcSearch').value.trim() !== state.q) $('mcSearch').value = state.q;
  $('mcType').value = state.type;
  $('mcClass').value = state.cls;
  $('mcGen').value = state.gen;
  fillSelect($('mcSort'), Object.entries(SORT_LABELS[state.tab]), state.sort);
}

/* ---------- 招式 ---------- */

function renderMoveRow(m) {
  const open = state.open === m.n;
  return `<article class="mc-row mc-row--move${open ? ' is-open' : ''}" data-slug="${m.n}" id="move-${m.n}">
    <button type="button" class="mc-row-head" aria-expanded="${open}" aria-controls="move-${m.n}-body"
      data-stats="威力 ${value(m.p)}・命中 ${m.a === null ? '必中' : `${m.a}%`}・PP ${value(m.pp)}・第 ${m.g} 代">
      <span class="mc-name"><strong>${escapeHtml(m.zh)}</strong><small>${escapeHtml(m.n.replace(/-/g, ' '))}</small></span>
      <span class="mc-cell mc-cell--type">${typeBadge(m.t)}</span>
      <span class="mc-cell mc-cell--class">${classChip(m.c)}</span>
      <span class="mc-cell mc-num" data-label="威力">${value(m.p)}</span>
      <span class="mc-cell mc-num" data-label="命中">${m.a === null ? '必中' : `${m.a}%`}</span>
      <span class="mc-cell mc-num" data-label="PP">${value(m.pp)}</span>
      <span class="mc-cell mc-gen" data-label="世代">第 ${m.g} 代</span>
    </button>
    <div class="mc-row-body" id="move-${m.n}-body" ${open ? '' : 'hidden'}>
      <p class="mc-desc">${escapeHtml(m.d || '尚無說明')}${m.en ? '<span class="mc-en-note">（無繁中說明）</span>' : ''}</p>
      <div class="mc-learners" data-learners="${m.n}"></div>
    </div>
  </article>`;
}

async function loadLearners(row) {
  const slug = row.dataset.slug;
  const box = row.querySelector('[data-learners]');
  if (!box || box.dataset.loaded) return;
  box.dataset.loaded = 'loading';
  box.innerHTML = '<p class="mc-loading">載入可學會的寶可夢…</p>';
  try {
    const data = await fetchJson(`${BASE_URL}/move/${slug}/`, `learners_move_v2_${slug}`);
    const { ids, forms } = learnersFromMove(data);
    box.dataset.loaded = '1';
    box.innerHTML = `<h3 class="mc-sub">可學會的寶可夢 <span>${ids.length} 種${forms ? `（另有 ${forms} 種形態）` : ''}</span></h3>
      ${ids.length ? `<div class="mc-mon-grid">${ids.map((id) => pokemonChip(id)).join('')}</div>` : '<p class="mc-empty-inline">沒有寶可夢能學會這個招式（例如極巨招式、Z 招式）。</p>'}`;
  } catch {
    delete box.dataset.loaded;
    box.innerHTML = '<p class="mc-empty-inline">無法載入可學會的寶可夢，請稍後再展開一次。</p>';
  }
}

/* ---------- 特性 ---------- */

function renderAbilityRow(a) {
  const open = state.open === a.n;
  const list = holders.get(a.n) || [];
  return `<article class="mc-row mc-row--ability${open ? ' is-open' : ''}" data-slug="${a.n}" id="ability-${a.n}">
    <button type="button" class="mc-row-head" aria-expanded="${open}" aria-controls="ability-${a.n}-body">
      <span class="mc-name"><strong>${escapeHtml(a.zh)}</strong><small>${escapeHtml(a.n.replace(/-/g, ' '))}</small></span>
      <span class="mc-cell mc-ability-desc">${escapeHtml(a.d || '尚無說明')}</span>
      <span class="mc-cell mc-num" data-label="寶可夢">${list.length} 種</span>
      <span class="mc-cell mc-gen" data-label="世代">第 ${a.g} 代</span>
    </button>
    <div class="mc-row-body" id="ability-${a.n}-body" ${open ? '' : 'hidden'}>
      <p class="mc-desc">${escapeHtml(a.d || '尚無說明')}${a.en ? '<span class="mc-en-note">（無繁中說明）</span>' : ''}</p>
      <h3 class="mc-sub">擁有此特性的寶可夢 <span>${list.length} 種</span>
        ${list.length ? `<a class="mc-dex-link" href="./index.html?ability=${a.n}">在圖鑑中篩選 →</a>` : ''}</h3>
      ${list.length
    ? `<div class="mc-mon-grid">${list.map((h) => pokemonChip(h.id, { hidden: h.hidden })).join('')}</div>`
    : '<p class="mc-empty-inline">目前沒有寶可夢以一般形態擁有此特性（可能只出現在特殊形態）。</p>'}
    </div>
  </article>`;
}

/* ---------- 列表 ---------- */

function render() {
  renderControls();
  const list = $('mcList');
  let rows;
  let total;
  if (state.tab === 'moves') {
    total = moves.length;
    rows = sortMoves(filterMoves(moves, state), state.sort);
    list.innerHTML = rows.length
      ? `<div class="mc-head mc-head--move" aria-hidden="true"><span>招式</span><span>屬性</span><span>分類</span><span>威力</span><span>命中</span><span>PP</span><span>世代</span></div>${rows.map(renderMoveRow).join('')}`
      : '<p class="mc-empty">找不到符合的招式</p>';
  } else {
    total = abilities.length;
    rows = sortAbilities(filterAbilities(abilities, state), state.sort, holders);
    list.innerHTML = rows.length
      ? `<div class="mc-head mc-head--ability" aria-hidden="true"><span>特性</span><span>效果</span><span>寶可夢</span><span>世代</span></div>${rows.map(renderAbilityRow).join('')}`
      : '<p class="mc-empty">找不到符合的特性</p>';
  }
  $('mcCount').textContent = rows.length === total ? `共 ${total} 筆` : `顯示 ${rows.length} / ${total} 筆`;
  const openRow = state.open ? list.querySelector(`.mc-row[data-slug="${state.open}"]`) : null;
  if (openRow && state.tab === 'moves') loadLearners(openRow);
}

function toggleRow(row) {
  const head = row.querySelector('.mc-row-head');
  const body = row.querySelector('.mc-row-body');
  const opening = body.hidden;
  $('mcList').querySelectorAll('.mc-row.is-open').forEach((r) => {
    if (r === row) return;
    r.classList.remove('is-open');
    r.querySelector('.mc-row-head').setAttribute('aria-expanded', 'false');
    r.querySelector('.mc-row-body').hidden = true;
  });
  body.hidden = !opening;
  row.classList.toggle('is-open', opening);
  head.setAttribute('aria-expanded', String(opening));
  setState({ open: opening ? row.dataset.slug : '' }, { rerender: false });
  if (opening && state.tab === 'moves') loadLearners(row);
}

function bindEvents() {
  document.querySelectorAll('.mc-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.dataset.tab === state.tab) return;
      setState({ tab: tab.dataset.tab, sort: 'id', open: '', type: 'all', cls: 'all' });
    });
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const other = document.querySelector(`.mc-tab:not([data-tab="${tab.dataset.tab}"])`);
      other.focus();
      other.click();
    });
  });
  $('mcSearch').addEventListener('input', (e) => {
    // 狀態立即更新（其他篩選在延遲期間變動時才不會用到舊字串），只延遲重繪
    state = { ...state, q: e.target.value.trim(), open: '' };
    syncUrl();
    clearTimeout(searchTimer);
    searchTimer = setTimeout(render, 150);
  });
  $('mcType').addEventListener('change', (e) => setState({ type: e.target.value }));
  $('mcClass').addEventListener('change', (e) => setState({ cls: e.target.value }));
  $('mcGen').addEventListener('change', (e) => setState({ gen: e.target.value }));
  $('mcSort').addEventListener('change', (e) => setState({ sort: e.target.value }));
  $('mcList').addEventListener('click', (e) => {
    const head = e.target.closest('.mc-row-head');
    if (head) toggleRow(head.closest('.mc-row'));
  });
}

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function initMoveCatalogPage() {
  fillSelect($('mcType'), [['all', '全部'], ...TYPE_ORDER.map((t) => [t, typeNamesCN[t]])], state.type);
  fillSelect($('mcClass'), [['all', '全部'], ...MOVE_CLASSES.map((c) => [c, MOVE_CLASS_LABELS[c]])], state.cls);
  fillSelect($('mcGen'), [['all', '全部'], ...Array.from({ length: MAX_GEN }, (_, i) => [String(i + 1), `第 ${i + 1} 世代`])], state.gen);
  bindEvents();
  initBackToTop({ bodyClass: 'move-catalog-body', buttonId: 'mcBackToTop' });

  try {
    const [m, a, s] = await Promise.all([
      loadJson('./data/moves-index.json'),
      loadJson('./data/abilities-index.json'),
      loadJson('./data/species-index.json'),
    ]);
    moves = m.entries || [];
    abilities = a.entries || [];
    speciesById = new Map((s.entries || []).map((e) => [e.id, e]));
    holders = buildAbilityHolders(s.entries || []);
  } catch {
    $('mcList').innerHTML = '<p class="mc-empty">無法載入資料，請重新整理頁面。</p>';
    return;
  }

  $('mcMovesCount').textContent = String(moves.length);
  $('mcAbilitiesCount').textContent = String(abilities.length);
  render();
  if (state.open) {
    const row = $('mcList').querySelector(`.mc-row[data-slug="${state.open}"]`);
    row?.scrollIntoView({ block: 'start' });
  }
}
