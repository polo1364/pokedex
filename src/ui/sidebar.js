import { store } from '../state/store.js';
import { typeColors, typeNamesCN } from '../config.js';
import { clearAllCache } from '../api/cache.js';

export function initSidebar(onFilterChange) {
  initTypeFilters(onFilterChange);
  bindMobileMenu();
}

function initTypeFilters(onFilterChange) {
  const container = document.getElementById('typeFilters');
  container.innerHTML = '';
  Object.keys(typeColors).forEach((type) => {
    const btn = document.createElement('button');
    btn.className = 'type-btn';
    btn.textContent = typeNamesCN[type];
    btn.style.background = typeColors[type];
    btn.style.color = 'white';
    btn.dataset.type = type;
    btn.addEventListener('click', () => {
      filterByType(type, onFilterChange);
      closeMobileSidebar();
    });
    container.appendChild(btn);
  });
}

function filterByType(type, onFilterChange) {
  const btn = document.querySelector(`[data-type="${type}"]`);
  const isActive = btn?.classList.contains('active');
  document.querySelectorAll('.type-btn').forEach((b) => b.classList.remove('active'));
  if (isActive) store.currentFilters.type = 'all';
  else {
    btn.classList.add('active');
    store.currentFilters.type = type;
  }
  onFilterChange();
}

export function bindSidebarFilters(onFilterChange) {
  document.getElementById('searchBox').addEventListener('input', (e) => {
    store.currentFilters.search = e.target.value.toLowerCase();
    onFilterChange();
  });

  document.querySelectorAll('#genFilters .filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#genFilters .filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      store.currentFilters.gen = btn.dataset.gen;
      onFilterChange();
      closeMobileSidebar();
    });
  });

  document.getElementById('favoritesFilter')?.addEventListener('click', () => {
    const btn = document.getElementById('favoritesFilter');
    store.currentFilters.favorites = !store.currentFilters.favorites;
    btn.classList.toggle('active', store.currentFilters.favorites);
    onFilterChange();
  });

  document.getElementById('clearCacheBtn')?.addEventListener('click', async () => {
    await clearAllCache();
    alert('快取已清除，建議重新整理頁面。');
  });
}

function bindMobileMenu() {
  document.getElementById('menuBtn')?.addEventListener('click', openMobileSidebar);
  document.getElementById('sidebarOverlay')?.addEventListener('click', closeMobileSidebar);
}

export function openMobileSidebar() {
  document.querySelector('.sidebar')?.classList.add('open');
  document.getElementById('sidebarOverlay')?.classList.add('active');
}

export function closeMobileSidebar() {
  document.querySelector('.sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('active');
}

export function initViewControls(onChange) {
  document.querySelectorAll('.view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      store.viewMode = btn.dataset.view;
      localStorage.setItem('pokedex_view_mode', store.viewMode);
      onChange();
    });
  });
  const active = document.querySelector(`.view-btn[data-view="${store.viewMode}"]`);
  active?.classList.add('active');
}

export function initSortControl(onChange) {
  document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    store.sortBy = e.target.value;
    onChange(false);
  });
}
