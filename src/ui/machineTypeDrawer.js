import { typeColors, typeNamesCN, TYPE_ORDER } from '../config.js';
import { updateMachinesBackToTop } from './backToTop.js';

const STORAGE_KEY = 'machines_gen_type_filters';

/** @type {Map<number, string>} */
const genTypeFilters = new Map();
let drawerEl = null;
let drawerTargetGen = null;
let drawerAvailableTypes = new Set(TYPE_ORDER);
/** @type {((gen: number) => void) | null} */
let onFilterChange = null;

function loadSavedFilters() {
  try {
    const legacy = localStorage.getItem('machines_type_filter');
    if (legacy && legacy !== 'all') {
      localStorage.removeItem('machines_type_filter');
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    Object.entries(parsed).forEach(([gen, type]) => {
      const g = Number(gen);
      if (g >= 1 && g <= 9 && typeof type === 'string') {
        genTypeFilters.set(g, type);
      }
    });
  } catch { /* ignore */ }
}

function saveFilters() {
  const obj = Object.fromEntries(genTypeFilters);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

export function getMachineTypeFilter(gen) {
  return genTypeFilters.get(gen) || 'all';
}

export function ensureMachineTypeFilterAvailable(gen, availableTypes = TYPE_ORDER) {
  const current = getMachineTypeFilter(gen);
  if (current === 'all' || availableTypes.has(current)) return false;
  genTypeFilters.delete(gen);
  saveFilters();
  return true;
}

export function initMachineTypeDrawer(onChange) {
  onFilterChange = onChange;
  loadSavedFilters();
  mountDrawer();
  syncDrawerButtons();
}

export function openMachineTypeDrawer(gen, availableTypes = TYPE_ORDER) {
  drawerTargetGen = gen;
  drawerAvailableTypes = new Set(availableTypes);
  openDrawer();
}

export function syncGenTypeFilterButtons() {
  document.querySelectorAll('.machines-gen-type-filter-btn').forEach((btn) => {
    const gen = Number(btn.dataset.gen);
    const filter = getMachineTypeFilter(gen);
    const active = filter !== 'all';
    btn.classList.toggle('is-active', active);
    btn.textContent = active
      ? `篩選：${typeNamesCN[filter] || filter}`
      : '屬性篩選';
    btn.setAttribute('aria-expanded', String(
      drawerTargetGen === gen && (drawerEl?.classList.contains('is-open') ?? false),
    ));
  });
}

function mountDrawer() {
  if (drawerEl) return;

  drawerEl = document.createElement('div');
  drawerEl.id = 'machineTypeDrawer';
  drawerEl.className = 'machines-type-drawer';
  drawerEl.hidden = true;
  drawerEl.innerHTML = `
    <div class="machines-type-drawer-backdrop" data-close="1"></div>
    <aside class="machines-type-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="machineTypeDrawerTitle">
      <header class="machines-type-drawer-header">
        <h2 id="machineTypeDrawerTitle" class="machines-type-drawer-title">屬性篩選</h2>
        <button type="button" class="machines-type-drawer-close" aria-label="關閉">×</button>
      </header>
      <div class="machines-type-drawer-body">
        <p class="machines-type-drawer-hint">選擇招式屬性以篩選此世代卡片</p>
        <button type="button" class="type-btn type-btn--all machines-type-all-btn" data-type="all">全部屬性</button>
        <div class="type-filters machines-type-grid"></div>
      </div>
    </aside>
  `;

  const grid = drawerEl.querySelector('.machines-type-grid');
  TYPE_ORDER.forEach((type) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'type-btn';
    btn.dataset.type = type;
    btn.textContent = typeNamesCN[type];
    btn.style.background = typeColors[type];
    grid.appendChild(btn);
  });

  drawerEl.querySelector('.machines-type-drawer-close')?.addEventListener('click', closeDrawer);
  drawerEl.querySelector('.machines-type-drawer-backdrop')?.addEventListener('click', closeDrawer);
  drawerEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.type-btn');
    if (!btn) return;
    applyTypeFilter(btn.dataset.type || 'all');
  });

  document.body.appendChild(drawerEl);
  document.addEventListener('keydown', onDocumentKeydown);
}

function applyTypeFilter(type) {
  const gen = drawerTargetGen;
  if (!gen) return;
  if (type !== 'all' && !drawerAvailableTypes.has(type)) return;

  const current = getMachineTypeFilter(gen);
  const next = type === current && type !== 'all' ? 'all' : type;

  if (next === 'all') genTypeFilters.delete(gen);
  else genTypeFilters.set(gen, next);

  saveFilters();
  syncDrawerButtons();
  syncGenTypeFilterButtons();
  onFilterChange?.(gen);
  if (next !== 'all') closeDrawer();
}

function syncDrawerButtons() {
  if (!drawerEl) return;
  const filter = drawerTargetGen ? getMachineTypeFilter(drawerTargetGen) : 'all';
  drawerEl.querySelector('.machines-type-all-btn')?.classList.toggle('active', filter === 'all');
  drawerEl.querySelectorAll('.machines-type-grid .type-btn').forEach((btn) => {
    const type = btn.dataset.type;
    const available = drawerAvailableTypes.has(type);
    btn.disabled = !available;
    btn.classList.toggle('is-disabled', !available);
    btn.classList.toggle('active', available && type === filter);
    btn.title = available ? '' : '此世代沒有這個屬性的招式機';
  });

  const title = drawerEl.querySelector('#machineTypeDrawerTitle');
  if (title && drawerTargetGen) {
    title.textContent = `第 ${drawerTargetGen} 世代 · 屬性篩選`;
  }
}

function openDrawer() {
  mountDrawer();
  if (!drawerEl || !drawerTargetGen || drawerEl.classList.contains('is-open')) return;
  syncDrawerButtons();
  drawerEl.hidden = false;
  document.body.classList.add('machines-type-drawer-open');
  updateMachinesBackToTop();
  syncGenTypeFilterButtons();
  requestAnimationFrame(() => {
    drawerEl?.classList.add('is-open');
    syncGenTypeFilterButtons();
  });
}

function closeDrawer() {
  if (!drawerEl?.classList.contains('is-open')) return;
  drawerEl.classList.remove('is-open');
  document.body.classList.remove('machines-type-drawer-open');
  updateMachinesBackToTop();
  syncGenTypeFilterButtons();
  window.setTimeout(() => {
    if (drawerEl && !drawerEl.classList.contains('is-open')) {
      drawerEl.hidden = true;
      drawerTargetGen = null;
    }
  }, 280);
}

function onDocumentKeydown(e) {
  if (e.key !== 'Escape' || !drawerEl?.classList.contains('is-open')) return;
  if (document.body.classList.contains('learners-modal-open')) return;
  if (document.getElementById('modal')?.classList.contains('active')) return;
  e.preventDefault();
  closeDrawer();
}
