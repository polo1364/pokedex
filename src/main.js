import './styles/main.css';
import { clearAllCache, onCacheError } from './api/cache.js';
import { bootstrapSpeciesIndex, loadGenerations, ensurePokemonLoaded } from './data/pokemon.js';
import { applyFilters, preloadVisiblePokemon } from './data/filters.js';
import { enrichFilterMetaForEntries } from './utils/filterMeta.js';
import { loadVersionNames } from './utils/versions.js';
import { store } from './state/store.js';
import { renderPokemonGrid, loadMore } from './ui/grid.js';
import {
  initSidebar, bindSidebarFilters, initViewControls, initSortControl,
} from './ui/sidebar.js';
import { initVersionDrawer } from './ui/versionDrawer.js';
import { showDetail, openModal, initModalEvents } from './ui/modal.js';

async function refreshUI(resetDisplay = true) {
  applyFilters(resetDisplay);
  await preloadVisiblePokemon();
  renderPokemonGrid();
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
}

async function init() {
  initModalEvents();
  onCacheError(() => {
    const toast = document.getElementById('cacheToast');
    if (toast) {
      toast.textContent = '儲存空間不足，請清除快取';
      toast.classList.add('show');
    }
  });

  initSidebar(() => refreshUI());
  bindSidebarFilters(() => refreshUI());
  initVersionDrawer();
  initViewControls(() => refreshUI(false));
  initSortControl((reset) => refreshUI(reset));

  window.addEventListener('pageshow', (e) => {
    const root = document.getElementById('versionDrawerRoot');
    if (e.persisted || (root && root.childElementCount === 0)) {
      initVersionDrawer();
    }
  });

  document.getElementById('loadMoreBtn')?.addEventListener('click', async () => {
    loadMore();
    await preloadVisiblePokemon();
    renderPokemonGrid();
  });

  document.getElementById('pokemonGrid')?.addEventListener('click', async (e) => {
    const card = e.target.closest('[data-id]');
    if (!card) return;
    const id = parseInt(card.dataset.id, 10);
    await showDetail(id);
  });

  document.getElementById('pokemonGrid')?.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;
    const card = e.target.closest('[data-id]');
    if (card) await showDetail(parseInt(card.dataset.id, 10));
  });

  const params = new URLSearchParams(location.search);
  const openId = params.get('id');
  applyHeldItemFromUrl(params);
  applyTmFromUrl(params);

  try {
    document.getElementById('loadingContainer').style.display = 'flex';
    await loadVersionNames();
    await loadGenerations();
    await bootstrapSpeciesIndex((pct, done, total) => {
      document.getElementById('progressBar').style.width = pct + '%';
      document.getElementById('progressText').textContent = `載入中... ${pct}% (${done}/${total})`;
    });

    document.getElementById('loadingContainer').style.display = 'none';
    await refreshUI();

    if (openId) await openModal(parseInt(openId, 10));

    backgroundLoadRemaining();
  } catch (err) {
    console.error(err);
    document.getElementById('progressText').textContent = '載入失敗，請重新整理頁面';
  }
}

async function backgroundLoadRemaining() {
  const unloaded = store.speciesIndex.filter((e) => !e.loaded);
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
