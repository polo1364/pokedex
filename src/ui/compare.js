/**
 * 寶可夢比較：底部比較清單（最多 3 隻）與並排比較視窗。
 * 清單存在 localStorage；比較視窗開啟時網址帶 ?compare=6,9,3，可直接分享。
 */
import '../styles/compare.css';
import { typeColors, typeNamesCN } from '../config.js';
import { fetchJson } from '../api/client.js';
import { escapeHtml } from '../utils/infoCards.js';
import { getChineseName } from '../utils/i18n.js';
import { getPokemonImage } from '../utils/sprites.js';
import { getFormLabelByPokemonId, getPokemonFormLabel } from '../utils/forms.js';
import { resolvePokemonById } from '../data/pokemon.js';
import {
  MAX_COMPARE, parseCompareIds, toggleCompareId, buildStatRows, defensiveProfile,
} from '../utils/compare.js';

const STORAGE_KEY = 'pokedex_compare_ids';
const STAT_BAR_MAX = 255;
const TOTAL_BAR_MAX = 720;

let compareIds = loadIds();
const listeners = new Set();
let openToken = 0;
let onShowDetail = null;
let lastFocus = null;

function loadIds() {
  try {
    return parseCompareIds(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').join(','));
  } catch {
    return [];
  }
}

function saveIds() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
  } catch { /* 無法儲存時仍可在本次瀏覽使用 */ }
}

function setIds(ids) {
  compareIds = ids;
  saveIds();
  listeners.forEach((fn) => fn(compareIds));
}

export function getCompareIds() {
  return [...compareIds];
}

export function isCompareEnabled() {
  return Boolean(document.getElementById('compareTray'));
}

export function onCompareChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** 加入或移除比較；回傳 { added, full }。 */
export function toggleCompare(id) {
  const result = toggleCompareId(compareIds, id);
  if (result.ids !== compareIds) setIds(result.ids);
  if (result.full) showCompareToast(`最多比較 ${MAX_COMPARE} 隻，請先從底部清單移除`);
  return result;
}

function showCompareToast(text) {
  const toast = document.getElementById('compareToast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(showCompareToast.timer);
  showCompareToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

const formNames = new Map();

function isDefaultForm(pokemon) {
  const varieties = pokemon.speciesData?.varieties;
  const def = varieties?.find((v) => v.is_default) || varieties?.[0];
  if (def) return parseInt(def.pokemon.url.split('/').filter(Boolean).pop(), 10) === pokemon.id;
  return pokemon.id <= 1025;
}

function displayName(pokemon) {
  const base = pokemon.chineseName || pokemon.name;
  if (isDefaultForm(pokemon)) return base;
  // 官方繁中形態名（如「超級噴火龍Ｘ」）已含寶可夢名稱，直接使用
  const official = formNames.get(pokemon.id);
  if (official) return official.includes(base) ? official : `${base}（${official}）`;
  const form = getFormLabelByPokemonId(pokemon.id, pokemon.name, pokemon.species?.name);
  return form && form !== '一般' && form !== pokemon.name ? `${base}（${form}）` : base;
}

/** 非預設形態先抓官方繁中形態名，之後 displayName 同步取用。 */
async function preloadFormNames(pokemons) {
  await Promise.all(pokemons.map(async (p) => {
    if (isDefaultForm(p) || formNames.has(p.id)) return;
    const label = await getPokemonFormLabel(p, p.speciesData).catch(() => null);
    if (label && /[一-鿿]/.test(label)) formNames.set(p.id, label);
  }));
}

function typeBadge(type) {
  return `<span class="type-badge" style="background:${typeColors[type] || '#666'}">${escapeHtml(typeNamesCN[type] || type)}</span>`;
}

/* ---------- 底部比較清單 ---------- */

const trayCache = new Map();

function renderTray() {
  const tray = document.getElementById('compareTray');
  if (!tray) return;
  if (!compareIds.length) {
    tray.hidden = true;
    tray.innerHTML = '';
    document.body.classList.remove('compare-tray-open');
    return;
  }
  tray.hidden = false;
  document.body.classList.add('compare-tray-open');
  const slots = compareIds.map((id) => {
    const p = trayCache.get(id);
    const name = p ? escapeHtml(displayName(p)) : `#${String(id).padStart(4, '0')}`;
    const img = p ? getPokemonImage(p) : '';
    return `<li class="compare-chip">
      ${img ? `<img src="${img}" alt="" loading="lazy">` : '<span class="compare-chip-ph" aria-hidden="true"></span>'}
      <span class="compare-chip-name">${name}</span>
      <button type="button" class="compare-chip-remove" data-remove="${id}" aria-label="從比較移除 ${name}">×</button>
    </li>`;
  }).join('');
  const empty = Array.from({ length: MAX_COMPARE - compareIds.length }, () =>
    '<li class="compare-chip compare-chip--empty" aria-hidden="true">＋</li>').join('');
  tray.innerHTML = `
    <span class="compare-tray-title">比較 ${compareIds.length}/${MAX_COMPARE}</span>
    <ul class="compare-tray-list">${slots}${empty}</ul>
    <div class="compare-tray-actions">
      <button type="button" class="compare-tray-btn compare-tray-btn--primary" data-compare-open ${compareIds.length < 2 ? 'disabled title="至少選 2 隻"' : ''}>開始比較</button>
      <button type="button" class="compare-tray-btn" data-compare-clear>清空</button>
    </div>`;

  for (const id of compareIds) {
    if (trayCache.has(id)) continue;
    resolvePokemonById(id).then(async (p) => {
      await preloadFormNames([p]);
      trayCache.set(id, p);
      if (compareIds.includes(id)) renderTray();
    }).catch(() => {});
  }
}

/* ---------- 比較視窗 ---------- */

function statCell(value, max, best) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return `<td class="compare-stat${best ? ' is-best' : ''}">
    <span class="compare-stat-value">${value}</span>
    <span class="compare-stat-bar" aria-hidden="true"><span style="width:${pct}%"></span></span>
  </td>`;
}

function profileCell(types) {
  const groups = defensiveProfile(types);
  const line = (label, list, cls) => (list.length
    ? `<div class="compare-weak-row ${cls}"><span class="compare-weak-label">${label}</span><span class="compare-weak-types">${list.map(typeBadge).join('')}</span></div>`
    : '');
  return line('4×', groups.quad, 'is-quad')
    + line('2×', groups.double, 'is-double')
    + line('½', groups.half, 'is-half')
    + line('¼', groups.quarter, 'is-quarter')
    + line('0×', groups.immune, 'is-immune');
}

function renderCompareTable(pokemons) {
  const rows = buildStatRows(pokemons);
  const head = pokemons.map((p) => `<th scope="col" class="compare-col-head">
      <button type="button" class="compare-remove" data-remove="${p.id}" aria-label="移除 ${escapeHtml(displayName(p))}">×</button>
      <button type="button" class="compare-open-detail" data-detail="${p.id}">
        <img src="${getPokemonImage(p)}" alt="" loading="lazy">
        <span class="compare-head-num">#${String(p.id).padStart(4, '0')}</span>
        <span class="compare-head-name">${escapeHtml(displayName(p))}</span>
      </button>
      <span class="compare-head-types">${(p.types || []).map((t) => typeBadge(t.type.name)).join('')}</span>
    </th>`).join('');

  const statRows = rows.map((row) => `<tr class="${row.key === 'total' ? 'compare-total-row' : ''}">
      <th scope="row">${row.label}</th>
      ${row.values.map((v, i) => statCell(v, row.key === 'total' ? TOTAL_BAR_MAX : STAT_BAR_MAX, row.best[i])).join('')}
    </tr>`).join('');

  const measure = (label, fn) => `<tr><th scope="row">${label}</th>${pokemons.map((p) => `<td>${fn(p)}</td>`).join('')}</tr>`;

  return `<div class="compare-table-wrap"><table class="compare-table">
    <thead><tr><td class="compare-corner"></td>${head}</tr></thead>
    <tbody>
      <tr class="compare-section-row"><th colspan="${pokemons.length + 1}">種族值</th></tr>
      ${statRows}
      <tr class="compare-section-row"><th colspan="${pokemons.length + 1}">基本資料</th></tr>
      ${measure('身高', (p) => (Number.isFinite(p.height) ? `${(p.height / 10).toFixed(1)} m` : '—'))}
      ${measure('體重', (p) => (Number.isFinite(p.weight) ? `${(p.weight / 10).toFixed(1)} kg` : '—'))}
      ${measure('特性', (p) => `<div class="compare-abilities" data-abilities="${p.id}">${(p.abilities || []).map((a) => `<span class="compare-ability${a.is_hidden ? ' is-hidden' : ''}">${escapeHtml(a.ability.name)}</span>`).join('')}</div>`)}
      <tr class="compare-section-row"><th colspan="${pokemons.length + 1}">受到攻擊的倍率</th></tr>
      <tr class="compare-weak"><th scope="row">屬性相剋</th>${pokemons.map((p) => `<td>${profileCell((p.types || []).map((t) => t.type.name))}</td>`).join('')}</tr>
    </tbody>
  </table></div>`;
}

async function fillAbilityNames(pokemons, token) {
  await Promise.all(pokemons.map(async (p) => {
    const abilities = p.abilities || [];
    const names = await Promise.all(abilities.map(async (a) => {
      try {
        const data = await fetchJson(a.ability.url, `ability_${a.ability.name}`);
        const zh = getChineseName(data.names);
        return zh === '（無繁中譯名）' ? a.ability.name : zh;
      } catch {
        return a.ability.name;
      }
    }));
    if (token !== openToken) return;
    const el = document.querySelector(`#compareModal [data-abilities="${p.id}"]`);
    if (el) {
      el.innerHTML = abilities.map((a, i) => `<span class="compare-ability${a.is_hidden ? ' is-hidden' : ''}">${escapeHtml(names[i])}${a.is_hidden ? '<small>隱藏</small>' : ''}</span>`).join('');
    }
  }));
}

function setCompareParam(ids) {
  const url = new URL(location.href);
  if (ids?.length) url.searchParams.set('compare', ids.join(','));
  else url.searchParams.delete('compare');
  // 逗號不必編碼，網址較好讀：?compare=6,9,3
  const href = url.href.replace(/([?&]compare=)([^&#]*)/, (_, key, value) => key + value.replace(/%2C/gi, ','));
  history.replaceState(history.state, '', href);
}

export async function openCompare(ids = compareIds) {
  const modal = document.getElementById('compareModal');
  if (!modal || ids.length < 1) return;
  const token = ++openToken;
  if (!modal.classList.contains('active')) lastFocus = document.activeElement;
  modal.classList.add('active');
  document.body.classList.add('modal-open');
  const body = modal.querySelector('.compare-body');
  body.innerHTML = '<div class="compare-loading"><div class="spinner"></div><p>載入比較資料…</p></div>';
  setCompareParam(ids);
  modal.querySelector('.compare-close')?.focus();

  const results = await Promise.all(ids.map((id) => resolvePokemonById(id).catch(() => null)));
  if (token !== openToken) return;
  const pokemons = results.filter(Boolean);
  await preloadFormNames(pokemons);
  if (token !== openToken) return;
  pokemons.forEach((p) => trayCache.set(p.id, p));
  renderTray();
  if (!pokemons.length) {
    body.innerHTML = '<p class="empty-msg">無法載入比較資料，請稍後再試</p>';
    return;
  }
  body.innerHTML = renderCompareTable(pokemons);
  fillAbilityNames(pokemons, token);
}

export function closeCompare() {
  const modal = document.getElementById('compareModal');
  if (!modal?.classList.contains('active')) return;
  openToken++;
  modal.classList.remove('active');
  if (!document.querySelector('#modal.active')) document.body.classList.remove('modal-open');
  setCompareParam(null);
  if (lastFocus?.isConnected) lastFocus.focus();
}

function ensureMarkup() {
  if (!document.getElementById('compareTray')) {
    const tray = document.createElement('div');
    tray.id = 'compareTray';
    tray.className = 'compare-tray';
    tray.hidden = true;
    tray.setAttribute('role', 'region');
    tray.setAttribute('aria-label', '比較清單');
    document.body.appendChild(tray);
  }
  if (!document.getElementById('compareModal')) {
    const modal = document.createElement('div');
    modal.id = 'compareModal';
    modal.className = 'compare-modal';
    modal.innerHTML = `<div class="compare-dialog" role="dialog" aria-modal="true" aria-labelledby="compareTitle">
      <div class="compare-header">
        <h2 id="compareTitle">寶可夢比較</h2>
        <button type="button" class="compare-close" aria-label="關閉比較">×</button>
      </div>
      <div class="compare-body"></div>
    </div>`;
    document.body.appendChild(modal);
  }
  if (!document.getElementById('compareToast')) {
    const toast = document.createElement('div');
    toast.id = 'compareToast';
    toast.className = 'compare-toast';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }
}

/**
 * @param {{ showDetail: (id:number) => Promise<void> }} options
 */
export function initCompare({ showDetail }) {
  onShowDetail = showDetail;
  ensureMarkup();

  const tray = document.getElementById('compareTray');
  tray.addEventListener('click', (e) => {
    const remove = e.target.closest('[data-remove]');
    if (remove) {
      setIds(compareIds.filter((id) => id !== Number(remove.dataset.remove)));
      return;
    }
    if (e.target.closest('[data-compare-open]')) openCompare();
    if (e.target.closest('[data-compare-clear]')) setIds([]);
  });

  const modal = document.getElementById('compareModal');
  modal.addEventListener('click', async (e) => {
    if (e.target === modal || e.target.closest('.compare-close')) {
      closeCompare();
      return;
    }
    const remove = e.target.closest('[data-remove]');
    if (remove) {
      const id = Number(remove.dataset.remove);
      setIds(compareIds.filter((x) => x !== id));
      const shown = [...modal.querySelectorAll('[data-detail]')].map((el) => Number(el.dataset.detail)).filter((x) => x !== id);
      if (shown.length) openCompare(shown);
      else closeCompare();
      return;
    }
    const detail = e.target.closest('[data-detail]');
    if (detail && onShowDetail) {
      closeCompare();
      await onShowDetail(Number(detail.dataset.detail));
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeCompare();
    }
  }, true);

  onCompareChange(renderTray);
  renderTray();
}

/** 網址帶 ?compare= 時開啟比較（需在物種索引載入後呼叫）。 */
export function openCompareFromUrl() {
  const fromUrl = parseCompareIds(new URLSearchParams(location.search).get('compare'));
  if (!fromUrl.length) return false;
  setIds(fromUrl);
  openCompare(fromUrl);
  return true;
}
