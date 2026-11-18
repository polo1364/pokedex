import { store } from '../state/store.js';
import { typeColors, typeNamesCN, TYPE_ORDER } from '../config.js';
import { clearAllCache } from '../api/cache.js';
import {
  STAT_FILTER_KEYS, STAT_FILTER_LABELS, EGG_FILTER_KEYS,
  normalizeAdvanced, hasAdvancedFilter, resolveAbility,
} from '../utils/advancedFilters.js';
import { EGG_GROUP_NAMES } from '../utils/breeding.js';

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
  const isActive = store.currentFilters.type === type;
  document.querySelectorAll('.type-btn:not(.type-btn--all)').forEach((b) => b.classList.remove('active'));
  allBtn?.classList.remove('active');

  if (type === 'all') {
    store.currentFilters.type = 'all';
    allBtn?.classList.add('active');
  } else {
    const btn = document.querySelector(`.type-btn[data-type="${type}"]:not(.type-btn--all)`);
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
    store.currentFilters.searchRaw = e.target.value;
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
  document.querySelectorAll('.view-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.view === store.viewMode);
  });
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

/** 依 store 目前的篩選狀態更新側欄、搜尋框、排序與檢視按鈕（網址還原或上一頁時使用）。 */
export function syncFilterControls() {
  const { gen, type, favorites } = store.currentFilters;
  document.querySelectorAll('#genFilters .filter-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.gen === gen);
  });
  document.querySelectorAll('.type-btn:not(.type-btn--all)').forEach((b) => {
    b.classList.toggle('active', b.dataset.type === type);
  });
  document.getElementById('typeFilterAll')?.classList.toggle('active', type === 'all');
  document.getElementById('favoritesFilter')?.classList.toggle('active', favorites);
  const searchBox = document.getElementById('searchBox');
  const searchText = store.currentFilters.searchRaw ?? store.currentFilters.search;
  if (searchBox && searchBox.value !== searchText) searchBox.value = searchText;
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = store.sortBy;
  document.querySelectorAll('.view-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.view === store.viewMode);
  });
  syncAdvancedControls();
}

/* ---------- 進階篩選 ---------- */

const EGG_LABEL_OVERRIDES = { undiscovered: '未發現（無法孵化）' };

function updateAdvancedBadge() {
  const badge = document.getElementById('advCount');
  if (!badge) return;
  const adv = store.currentFilters.adv;
  const count = [adv.type2 !== 'all', adv.min !== null || adv.max !== null, Boolean(adv.ability), Boolean(adv.egg)]
    .filter(Boolean).length;
  badge.hidden = count === 0;
  badge.textContent = String(count);
}

/** 依 store 的進階篩選更新側欄控制項；有啟用時自動展開抽屜。 */
export function syncAdvancedControls() {
  const adv = store.currentFilters.adv;
  if (!adv) return;
  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el && el.value !== value) el.value = value;
  };
  set('advType2', adv.type2);
  set('advStat', adv.stat);
  set('advMin', adv.min === null ? '' : String(adv.min));
  set('advMax', adv.max === null ? '' : String(adv.max));
  set('advAbility', adv.ability ? (store.abilityNames[adv.ability] || adv.ability) : '');
  set('advEgg', adv.egg);
  updateAdvancedBadge();
  if (hasAdvancedFilter(adv)) {
    const drawer = document.querySelector('.sidebar-drawer[data-drawer="advanced"]');
    const toggle = drawer?.querySelector('.sidebar-drawer-toggle');
    const body = document.getElementById('advancedDrawerBody');
    if (drawer && toggle && body && !drawer.classList.contains('is-open')) setDrawerOpen(drawer, toggle, body, true);
  }
}

/** 特性輸入框的候選清單（預建索引載入後呼叫）。 */
export function populateAbilityOptions() {
  const list = document.getElementById('advAbilityList');
  if (!list) return;
  const names = Object.values(store.abilityNames).sort((a, b) => a.localeCompare(b, 'zh-Hant'));
  list.innerHTML = names.map((n) => `<option value="${n.replace(/"/g, '&quot;')}"></option>`).join('');
  syncAdvancedControls();
}

export function initAdvancedFilters(onFilterChange) {
  const type2 = document.getElementById('advType2');
  const stat = document.getElementById('advStat');
  const min = document.getElementById('advMin');
  const max = document.getElementById('advMax');
  const ability = document.getElementById('advAbility');
  const hint = document.getElementById('advAbilityHint');
  const egg = document.getElementById('advEgg');
  if (!type2 || !stat || !min || !max || !ability || !egg) return;

  type2.insertAdjacentHTML('beforeend', TYPE_ORDER.map((t) => `<option value="${t}">${typeNamesCN[t]}</option>`).join(''));
  stat.innerHTML = STAT_FILTER_KEYS.map((k) => `<option value="${k}">${STAT_FILTER_LABELS[k]}</option>`).join('');
  egg.insertAdjacentHTML('beforeend', EGG_FILTER_KEYS
    .map((k) => `<option value="${k}">${EGG_LABEL_OVERRIDES[k] || EGG_GROUP_NAMES[k] || k}</option>`).join(''));

  const apply = (patch) => {
    const next = normalizeAdvanced({ ...store.currentFilters.adv, ...patch });
    if (JSON.stringify(next) === JSON.stringify(store.currentFilters.adv)) return;
    store.currentFilters.adv = next;
    updateAdvancedBadge();
    onFilterChange();
  };

  type2.addEventListener('change', () => apply({ type2: type2.value }));
  stat.addEventListener('change', () => apply({ stat: stat.value }));
  egg.addEventListener('change', () => apply({ egg: egg.value }));

  let rangeTimer = null;
  const applyRange = () => {
    clearTimeout(rangeTimer);
    apply({ min: min.value, max: max.value });
  };
  for (const input of [min, max]) {
    input.addEventListener('input', () => {
      clearTimeout(rangeTimer);
      rangeTimer = setTimeout(applyRange, 450);
    });
    input.addEventListener('change', () => {
      applyRange();
      syncAdvancedControls();
    });
  }

  const applyAbility = () => {
    const text = ability.value.trim();
    const slug = resolveAbility(text, store.abilityNames);
    hint.textContent = text && !slug ? `找不到「${text}」這個特性` : '';
    apply({ ability: slug });
  };
  ability.addEventListener('change', applyAbility);
  ability.addEventListener('input', () => {
    // 從候選清單點選或輸入完整名稱時立即套用；清空時取消篩選
    if (!ability.value.trim() || resolveAbility(ability.value, store.abilityNames)) applyAbility();
  });

  document.getElementById('advReset')?.addEventListener('click', () => {
    hint.textContent = '';
    store.currentFilters.adv = normalizeAdvanced({});
    syncAdvancedControls();
    onFilterChange();
  });

  syncAdvancedControls();
}
