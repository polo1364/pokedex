import './styles/main.css';
import { clearAllCache, onCacheError } from './api/cache.js';
import { bootstrapSpeciesIndex, ensurePokemonLoaded } from './data/pokemon.js';
import { applyFilters, preloadVisiblePokemon } from './data/filters.js';
import { enrichFilterMetaForEntries } from './utils/filterMeta.js';
import { loadVersionNames } from './utils/versions.js';
import { store } from './state/store.js';
import { fetchJson } from './api/client.js';
import { BASE_URL } from './config.js';
import { getChineseName } from './utils/i18n.js';
import { renderPokemonGrid, patchPokemonCard, loadMore } from './ui/grid.js';
import {
  initSidebar, bindSidebarFilters, initViewControls, initSortControl, syncFilterControls,
  initAdvancedFilters, populateAbilityOptions,
} from './ui/sidebar.js';
import {
  readUrlState, buildUrlWithState, urlChangeKind, DEFAULT_URL_STATE,
} from './utils/urlState.js';
import { initVersionDrawer } from './ui/versionDrawer.js';
import { showDetail, openModal, initModalEvents, closeModal } from './ui/modal.js';
import { initCompare, openCompareFromUrl } from './ui/compare.js';
import { initBackup } from './ui/backup.js';

let refreshSeq = 0;

// 先立即渲染（未載入的卡片顯示骨架），再逐張補上屬性資料，
// 避免載入條結束後整個網格空白、計數顯示 0。
async function refreshUI(resetDisplay = true) {
  const seq = ++refreshSeq;
  applyFilters(resetDisplay);
  renderPokemonGrid();
  await preloadVisiblePokemon((entry) => {
    if (seq === refreshSeq) patchPokemonCard(entry);
  });
  if (seq === refreshSeq) renderPokemonGrid();
}

function currentUrlState() {
  const f = store.currentFilters;
  return {
    gen: f.gen,
    type: f.type,
    q: f.searchRaw ?? f.search,
    fav: f.favorites,
    sort: store.sortBy,
    view: store.viewMode,
    adv: f.adv,
    forms: f.forms,
  };
}

/**
 * 套用網址中的篩選狀態。fillDefaults 為 true 時（上一頁／下一頁），
 * 網址沒寫到的欄位一律回到預設值；首次載入則沿用 localStorage 記住的排序與檢視。
 */
function applyUrlState(params, { fillDefaults = false } = {}) {
  const parsed = readUrlState(params);
  const state = fillDefaults ? { ...DEFAULT_URL_STATE, ...parsed } : parsed;
  const f = store.currentFilters;
  if (state.gen !== undefined) f.gen = state.gen;
  if (state.type !== undefined) f.type = state.type;
  if (state.q !== undefined) {
    f.searchRaw = state.q;
    f.search = state.q.toLowerCase();
  }
  if (state.fav !== undefined) f.favorites = state.fav;
  if (state.sort !== undefined) store.sortBy = state.sort;
  if (state.view !== undefined) store.viewMode = state.view;
  if (state.adv !== undefined) f.adv = { ...state.adv };
  if (state.forms !== undefined) f.forms = state.forms;
}

/** 使用者改變篩選後，把狀態寫進網址：一般變更新增上一頁紀錄，打字搜尋只取代目前紀錄。 */
function syncUrl() {
  const next = buildUrlWithState(location.href, currentUrlState());
  const kind = urlChangeKind(location.href, next);
  if (kind === 'push') history.pushState(null, '', next);
  else if (kind === 'replace') history.replaceState(null, '', next);
}

function onUserFilterChange(resetDisplay = true) {
  syncUrl();
  return refreshUI(resetDisplay);
}

function applyHeldItemFromUrl(params) {
  const slug = params.get('heldItemSlug') || params.get('heldItem') || params.get('item');
  if (!slug) return;
  store.currentFilters.item = slug.trim();
  store.currentFilters.itemLabel = (params.get('heldItemLabel') || slug).trim();
}

function applyTmFromUrl(params) {
  const tm = params.get('tm') || params.get('move');
  if (!tm) return;
  store.currentFilters.tm = tm.trim();
  store.currentFilters.tmLabel = (params.get('tmLabel') || '').trim();
}

/** 網址只帶招式代碼（如 thunderbolt）時，補抓繁中招式名供篩選標籤顯示。 */
async function resolveTmLabel() {
  const { tm, tmLabel } = store.currentFilters;
  if (!tm || tmLabel) return;
  try {
    const slug = encodeURIComponent(tm.toLowerCase());
    const data = await fetchJson(`${BASE_URL}/move/${slug}`, `move_${slug}`);
    const name = getChineseName(data.names);
    if (name && store.currentFilters.tm === tm) store.currentFilters.tmLabel = name;
  } catch { /* 保留代碼顯示 */ }
}

async function init() {
  initModalEvents();
  initCompare({
    showDetail: async (id) => {
      closeModal();
      await showDetail(id);
    },
  });
  onCacheError(() => {
    const toast = document.getElementById('cacheToast');
    if (toast) {
      toast.textContent = '儲存空間不足，請清除快取';
      toast.classList.add('show');
    }
  });

  const params = new URLSearchParams(location.search);
  applyUrlState(params);

  initSidebar(() => onUserFilterChange());
  bindSidebarFilters(() => onUserFilterChange());
  initVersionDrawer();
  initViewControls(() => onUserFilterChange(false));
  initSortControl((reset) => onUserFilterChange(reset));
  initAdvancedFilters(() => onUserFilterChange());
  initBackup({ onRestored: () => refreshUI(false) });
  document.getElementById('formsSelect')?.addEventListener('change', (e) => {
    store.currentFilters.forms = e.target.value;
    onUserFilterChange();
  });
  syncFilterControls();

  window.addEventListener('popstate', () => {
    const popped = new URLSearchParams(location.search);
    applyUrlState(popped, { fillDefaults: true });
    store.currentFilters.item = '';
    store.currentFilters.itemLabel = '';
    store.currentFilters.tm = '';
    store.currentFilters.tmLabel = '';
    applyHeldItemFromUrl(popped);
    applyTmFromUrl(popped);
    syncFilterControls();
    resolveTmLabel().finally(() => refreshUI());
  });

  window.addEventListener('pageshow', (e) => {
    const root = document.getElementById('versionDrawerRoot');
    if (e.persisted || (root && root.childElementCount === 0)) {
      initVersionDrawer();
    }
  });

  document.getElementById('loadMoreBtn')?.addEventListener('click', async () => {
    loadMore();
    await refreshUI(false);
  });

  document.getElementById('statTags')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-clear]');
    if (!btn) return;
    const url = new URL(location.href);
    if (btn.dataset.clear === 'item') {
      store.currentFilters.item = '';
      store.currentFilters.itemLabel = '';
      ['heldItemSlug', 'heldItem', 'item', 'heldItemLabel'].forEach((k) => url.searchParams.delete(k));
    } else if (btn.dataset.clear === 'tm') {
      store.currentFilters.tm = '';
      store.currentFilters.tmLabel = '';
      ['tm', 'move', 'tmLabel'].forEach((k) => url.searchParams.delete(k));
    }
    history.pushState(null, '', url);
    refreshUI();
  });

  document.getElementById('pokemonGrid')?.addEventListener('click', async (e) => {
    const card = e.target.closest('[data-id]');
    if (!card) return;
    const id = parseInt(card.dataset.id, 10);
    await showDetail(id);
  });

  document.getElementById('pokemonGrid')?.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('[data-id]');
    if (card) e.preventDefault();
    if (card) await showDetail(parseInt(card.dataset.id, 10));
  });

  const openId = params.get('id');
  applyHeldItemFromUrl(params);
  applyTmFromUrl(params);

  try {
    document.getElementById('loadingContainer').style.display = 'flex';
    // 版本中文名只在詳情視窗用到，且有內建對照表可先頂著，不阻塞首頁顯示。
    loadVersionNames().catch(() => {});
    await resolveTmLabel();
    await bootstrapSpeciesIndex((pct, done, total) => {
      document.getElementById('progressBar').style.width = pct + '%';
      document.getElementById('progressText').textContent = `載入中... ${pct}% (${done}/${total})`;
    });

    document.getElementById('loadingContainer').style.display = 'none';
    populateAbilityOptions();
    const formsSelect = document.getElementById('formsSelect');
    if (formsSelect) formsSelect.disabled = !store.formEntries.length;
    await refreshUI();

    if (!openCompareFromUrl() && openId) await openModal(parseInt(openId, 10));

    backgroundLoadRemaining();
  } catch (err) {
    console.error(err);
    document.getElementById('progressText').textContent = '載入失敗，請重新整理頁面';
  }
}

async function backgroundLoadRemaining() {
  // 精簡索引已涵蓋網格所需欄位，不必在背景下載全部 1025 筆完整資料。
  const unloaded = store.speciesIndex.filter((e) => !e.loaded && !e.summary);
  for (const entry of unloaded) {
    try {
      await ensurePokemonLoaded(entry);
    } catch { /* partial recovery */ }
  }
  const { item, tm } = store.currentFilters;
  if (item || tm) {
    await enrichFilterMetaForEntries(store.speciesIndex.filter((e) => e.loaded));
  }
  await refreshUI(false);
}

init();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    reg.update();
  }).catch(() => {});
}
