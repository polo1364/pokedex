import { store } from '../state/store.js';
import { typeColors, typeNamesCN, TYPE_ORDER } from '../config.js';
import { clearAllCache } from '../api/cache.js';

const DRAWER_STORAGE_KEY = 'pokedex_drawer_state';

export function initSidebar(onFilterChange) {
  initTypeFilters(onFilterChange);
  bindMobileMenu();
  initDrawers();
}

export function initDrawers() {
  const saved = JSON.parse(localStorage.getItem(DRAWER_STORAGE_KEY) || '{}');

  document.querySelectorAll('.sidebar-drawer').forEach((drawer) => {
    const id = drawer.dataset.drawer;
    const toggle = drawer.querySelector('.sidebar-drawer-toggle');
    const body = drawer.querySelector('.sidebar-drawer-body');
    if (!toggle || !body) return;

    const defaultOpen = id === 'gen' || id === 'type';
    const isOpen = saved[id] !== undefined ? saved[id] : defaultOpen;
    setDrawerOpen(drawer, toggle, body, isOpen);

    toggle.addEventListener('click', () => {
      const open = !drawer.classList.contains('is-open');
      setDrawerOpen(drawer, toggle, body, open);
      saved[id] = open;
      localStorage.setItem(DRAWER_STORAGE_KEY, JSON.stringify(saved));
    });
  });
}

function setDrawerOpen(drawer, toggle, body, open) {
  drawer.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  if (open) {
    body.removeAttribute('hidden');
  } else {
    body.setAttribute('hidden', '');
  }
}

function initTypeFilters(onFilterChange) {
  const container = document.getElementById('typeFilters');
  container.innerHTML = '';
  TYPE_ORDER.forEach((type) => {
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

  document.getElementById('typeFilterAll')?.addEventListener('click', () => {
    filterByType('all', onFilterChange);
    closeMobileSidebar();
  });
}

function filterByType(type, onFilterChange) {
  const allBtn = document.getElementById('typeFilterAll');
  document.querySelectorAll('.type-btn:not(.type-btn--all)').forEach((b) => b.classList.remove('active'));
  allBtn?.classList.remove('active');

  if (type === 'all') {
    store.currentFilters.type = 'all';
    allBtn?.classList.add('active');
  } else {
    const btn = document.querySelector(`.type-btn[data-type="${type}"]:not(.type-btn--all)`);
    const isActive = btn?.classList.contains('active');
    if (isActive) {
      store.currentFilters.type = 'all';
      allBtn?.classList.add('active');
    } else {
      btn?.classList.add('active');
      store.currentFilters.type = type;
    }
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
    localStorage.setItem('pokedex_sort_by', store.sortBy);
    onChange(false);
  });
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect && store.sortBy) sortSelect.value = store.sortBy;
}
