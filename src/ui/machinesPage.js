import { loadMachinesCatalog } from '../data/machines.js';
import { typeColors, TYPE_ORDER, typeNamesCN } from '../config.js';
import { escapeHtml } from '../utils/infoCards.js';
import { GEN_ACCENT_COLORS } from '../utils/items.js';
import { openMachineLearnersModal } from './machineLearnersModal.js';
import {
  ensureMachineTypeFilterAvailable,
  getMachineTypeFilter,
  initMachineTypeDrawer,
  openMachineTypeDrawer,
  syncGenTypeFilterButtons,
} from './machineTypeDrawer.js';
import { updateBackToTop } from './backToTop.js';
import {
  cssSafeKind,
  KIND_COLORS,
  KIND_LABELS_CN,
  KIND_TIPS_CN,
} from '../utils/machines.js';

let catalog = null;
let searchQuery = '';
let kindFilter = 'all';
const renderedSections = new Set();

const KIND_FILTERS = [
  { id: 'all', label: '全部', color: '#8b949e', tip: '顯示所有招式機' },
  { id: 'TM', label: KIND_LABELS_CN.TM, color: KIND_COLORS.TM, tip: KIND_TIPS_CN.TM },
  { id: 'HM', label: KIND_LABELS_CN.HM, color: KIND_COLORS.HM, tip: KIND_TIPS_CN.HM },
  { id: 'TR', label: KIND_LABELS_CN.TR, color: KIND_COLORS.TR, tip: KIND_TIPS_CN.TR },
];

const KIND_ORDER = { TM: 0, HM: 1, TR: 2 };

const SORT_OPTIONS = [
  { id: 'number', label: '編號' },
  { id: 'type', label: '屬性' },
];

let machineSortBy = localStorage.getItem('machines_sort_by') || 'number';

export function initMachinesPage() {
  initMachineTypeDrawer(refreshGenSectionFilter);
  bindSearch();
  bindKindFilters();
  bindFilterLinks();
  bindGenSortControls();
  loadAndRender();
}

function refreshGenSectionFilter(gen) {
  refreshGenSection(gen);
  renderGenNav();
  updateCount();
  syncGenTypeFilterButtons();
}

function refreshCatalogFilters() {
  renderedSections.clear();
  renderGenNav();
  renderCatalog();
  updateCount();
  syncGenTypeFilterButtons();
}

function bindGenSortControls() {
  const root = document.getElementById('machinesContentRoot');
  root?.addEventListener('click', (e) => {
    const filterBtn = e.target.closest('.machines-gen-type-filter-btn');
    if (filterBtn) {
      e.stopPropagation();
      const gen = Number(filterBtn.dataset.gen);
      openMachineTypeDrawer(gen, getAvailableTypesForGen(gen));
      return;
    }
    const btn = e.target.closest('.machines-gen-sort-btn');
    if (!btn) return;
    e.stopPropagation();
    const sort = btn.dataset.sort;
    if (!sort || sort === machineSortBy) return;
    applyMachineSort(sort);
  });
}

function sortByNumber(a, b) {
  const ka = KIND_ORDER[a.kind] ?? 9;
  const kb = KIND_ORDER[b.kind] ?? 9;
  if (ka !== kb) return ka - kb;
  return a.number - b.number;
}

function sortMachineEntries(items, sortBy = machineSortBy) {
  const list = [...items];
  if (sortBy === 'type') {
    list.sort((a, b) => {
      const ta = TYPE_ORDER.indexOf(a.type);
      const tb = TYPE_ORDER.indexOf(b.type);
      const ia = ta >= 0 ? ta : 999;
      const ib = tb >= 0 ? tb : 999;
      if (ia !== ib) return ia - ib;
      return sortByNumber(a, b);
    });
    return list;
  }
  list.sort(sortByNumber);
  return list;
}

function applyMachineSort(sort) {
  machineSortBy = sort;
  localStorage.setItem('machines_sort_by', sort);
  syncGenSortButtons();
  document.querySelectorAll('.machines-gen-section').forEach((section) => {
    const grid = section.querySelector('.items-grid');
    if (!grid || grid.dataset.rendered !== 'true') return;
    rerenderSectionGrid(section);
  });
}

function syncGenSortButtons() {
  document.querySelectorAll('.machines-gen-sort-btn').forEach((btn) => {
    const active = btn.dataset.sort === machineSortBy;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function renderGenSortToolbar(gen) {
  const typeFilter = getMachineTypeFilter(gen);
  const filterActive = typeFilter !== 'all';
  const filterLabel = filterActive
    ? `篩選：${typeNamesCN[typeFilter] || typeFilter}`
    : '屬性篩選';

  return `<div class="machines-gen-toolbar">
    <span class="machines-gen-sort-label">排列</span>
    <div class="machines-gen-sort-group" role="group" aria-label="第 ${gen} 世代排列順序">
      ${SORT_OPTIONS.map((opt) => `
        <button type="button"
          class="machines-gen-sort-btn${opt.id === machineSortBy ? ' is-active' : ''}"
          data-sort="${opt.id}"
          data-gen="${gen}"
          aria-pressed="${opt.id === machineSortBy}">${opt.label}</button>
      `).join('')}
    </div>
    <button type="button"
      class="machines-gen-type-filter-btn${filterActive ? ' is-active' : ''}"
      data-gen="${gen}"
      aria-haspopup="dialog"
      aria-expanded="false">${filterLabel}</button>
  </div>`;
}

function getSectionItems(gen) {
  return sortMachineEntries((catalog.byGen[gen] || []).filter((e) => entryMatches(e, gen)));
}

function getAvailableTypesForGen(gen) {
  const available = new Set(
    (catalog?.byGen[gen] || [])
      .filter(entryMatchesBase)
      .map((entry) => entry.type)
  );
  ensureMachineTypeFilterAvailable(gen, available);
  return available;
}

function refreshGenSection(gen) {
  const section = document.getElementById(`machines-gen-${gen}`);
  if (!section || !catalog) return;

  getAvailableTypesForGen(gen);
  const items = catalog.byGen[gen] || [];
  const visibleItems = items.filter((e) => entryMatches(e, gen));
  const hasFilter = sectionHasFilter(gen);

  const countEl = section.querySelector('.items-gen-count');
  if (countEl) {
    countEl.textContent = `${visibleItems.length}${hasFilter ? ` / ${items.length}` : ''} 張`;
  }

  const body = section.querySelector('.items-gen-body');
  if (!body) return;

  renderedSections.delete(sectionKey(section));

  if (!visibleItems.length) {
    body.innerHTML = `${renderGenSortToolbar(gen)}<p class="items-empty-msg">此世代沒有符合的招式機</p>`;
    syncGenTypeFilterButtons();
    return;
  }

  const sorted = sortMachineEntries(visibleItems);
  body.innerHTML = `${renderGenSortToolbar(gen)}<div class="items-grid" data-rendered="true">${sorted.map((entry) => renderMachineCard(entry)).join('')}</div>`;
  renderedSections.add(sectionKey(section));
  bindCardInteractions(body.querySelector('.items-grid'));
  syncGenTypeFilterButtons();
}

function sectionHasFilter(gen) {
  return Boolean(searchQuery)
    || kindFilter !== 'all'
    || getMachineTypeFilter(gen) !== 'all';
}

function rerenderSectionGrid(section) {
  const gen = Number(section.dataset.gen);
  const grid = section.querySelector('.items-grid');
  if (!grid) return;
  const items = getSectionItems(gen);
  grid.innerHTML = items.map((entry) => renderMachineCard(entry)).join('');
  grid.dataset.rendered = 'true';
  renderedSections.add(sectionKey(section));
  bindCardInteractions(grid);
}

function bindFilterLinks() {
  const root = document.getElementById('machinesContentRoot');
  root?.addEventListener('click', (e) => {
    const btn = e.target.closest('.machine-card-filter-link');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    openMachineLearnersModal({
      moveName: btn.dataset.moveName || '',
      moveSlug: btn.dataset.moveSlug || '',
      displayLabel: btn.dataset.displayLabel || '',
      typeLabel: btn.dataset.typeLabel || '',
    });
  });
}

function hideLoading(loadingEl) {
  if (!loadingEl) return;
  loadingEl.hidden = true;
  loadingEl.style.display = 'none';
}

function showContent(rootEl) {
  if (!rootEl) return;
  rootEl.hidden = false;
  rootEl.style.removeProperty('display');
}

async function loadAndRender() {
  const loadingEl = document.getElementById('machinesLoading');
  const rootEl = document.getElementById('machinesContentRoot');
  const progressBar = document.getElementById('machinesProgressBar');
  const progressText = document.getElementById('machinesProgressText');

  try {
    catalog = await loadMachinesCatalog((pct, done, total) => {
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressText) progressText.textContent = `載入招式機資料… ${pct}% (${done}/${total})`;
    });

    hideLoading(loadingEl);
    showContent(rootEl);
    renderGenNav();
    updateCount();

    await new Promise((resolve) => requestAnimationFrame(resolve));
    renderCatalog();
    updateBackToTop('machinesBackToTop');
  } catch (err) {
    console.error(err);
    if (progressText) progressText.textContent = '載入失敗，請重新整理頁面';
  }
}

function bindSearch() {
  const input = document.getElementById('machineSearchBox');
  input?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    refreshCatalogFilters();
  });
}

function bindKindFilters() {
  const nav = document.getElementById('machinesKindNav');
  if (!nav) return;

  nav.innerHTML = KIND_FILTERS.map((f) => `
    <button type="button"
      class="machines-kind-pill${f.id === kindFilter ? ' is-active' : ''}"
      data-kind="${f.id}"
      style="--kind-accent:${f.color}"
      aria-pressed="${f.id === kindFilter}">
      ${escapeHtml(f.label)}
      <span class="machines-kind-tip" role="tooltip">${escapeHtml(f.tip)}</span>
    </button>
  `).join('');

  nav.querySelectorAll('.machines-kind-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      kindFilter = btn.dataset.kind || 'all';
      nav.querySelectorAll('.machines-kind-pill').forEach((b) => {
        const active = b.dataset.kind === kindFilter;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      renderedSections.clear();
      renderGenNav();
      renderCatalog();
      updateCount();
      syncGenTypeFilterButtons();
    });
  });
}

function renderGenNav() {
  const nav = document.getElementById('machinesGenNav');
  if (!nav) return;

  nav.innerHTML = '';
  for (let gen = 1; gen <= 9; gen += 1) {
    const all = catalog.byGen[gen] || [];
    getAvailableTypesForGen(gen);
    const count = all.filter((e) => entryMatches(e, gen)).length;
    if (!count && (searchQuery || kindFilter !== 'all')) continue;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'items-gen-pill machines-gen-pill';
    btn.dataset.gen = String(gen);
    btn.style.setProperty('--gen-accent', GEN_ACCENT_COLORS[gen]);
    btn.textContent = `第 ${gen} 世代 (${count})`;
    btn.addEventListener('click', () => scrollToGen(gen));
    nav.appendChild(btn);
  }
}

function scrollToGen(gen) {
  const section = document.getElementById(`machines-gen-${gen}`);
  if (!section) return;
  section.classList.add('is-open');
  const body = section.querySelector('.items-gen-body');
  body?.removeAttribute('hidden');
  ensureSectionRendered(section);
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getDefaultOpenGen() {
  for (let gen = 9; gen >= 1; gen -= 1) {
    const items = (catalog.byGen[gen] || []).filter((e) => entryMatches(e, gen));
    if (items.length) return gen;
  }
  return 9;
}

function entryMatchesBase(entry) {
  if (kindFilter !== 'all' && entry.kind !== kindFilter) return false;
  if (!searchQuery) return true;
  const q = searchQuery.toLowerCase();
  return entry.displayLabel.toLowerCase().includes(q)
    || entry.moveName.toLowerCase().includes(q)
    || entry.moveNameEn.toLowerCase().includes(q)
    || (entry.moveEffect || '').toLowerCase().includes(q)
    || entry.moveSlug.includes(q)
    || entry.itemSlug.includes(q)
    || entry.typeLabel.includes(q);
}

function entryMatches(entry, gen) {
  if (!entryMatchesBase(entry)) return false;
  const typeFilter = getMachineTypeFilter(gen);
  return typeFilter === 'all' || entry.type === typeFilter;
}

function renderCatalog() {
  const root = document.getElementById('machinesContentRoot');
  if (!root || !catalog) return;

  renderedSections.clear();
  const sections = [];
  for (let gen = 1; gen <= 9; gen += 1) {
    sections.push(renderGenSection(gen, catalog.byGen[gen] || []));
  }

  root.innerHTML = sections.filter(Boolean).join('');
  bindSectionToggles(root);
  syncGenSortButtons();
  syncGenTypeFilterButtons();

  root.querySelectorAll('.items-gen-section.is-open').forEach((section) => {
    ensureSectionRendered(section);
  });
  root.querySelectorAll('.items-grid[data-rendered="true"]').forEach((grid) => {
    bindCardInteractions(grid);
  });
}

function sectionKey(section) {
  return section.id || section.dataset.gen || '';
}

function ensureSectionRendered(section) {
  const key = sectionKey(section);
  if (!key || renderedSections.has(key)) return;

  const body = section.querySelector('.items-gen-body');
  const grid = body?.querySelector('.items-grid');
  if (!grid) return;
  if (grid.dataset.rendered === 'true') {
    renderedSections.add(key);
    return;
  }

  const gen = Number(section.dataset.gen);
  const items = getSectionItems(gen);
  grid.innerHTML = items.map((entry) => renderMachineCard(entry)).join('');
  grid.dataset.rendered = 'true';
  renderedSections.add(key);
  bindCardInteractions(grid);
}

function renderGenSection(gen, items) {
  getAvailableTypesForGen(gen);
  const visibleItems = items.filter((e) => entryMatches(e, gen));
  if (!visibleItems.length && !items.length) return '';
  const hasFilter = sectionHasFilter(gen);
  const hidden = (searchQuery || kindFilter !== 'all') && !visibleItems.length;
  const defaultOpenGen = getDefaultOpenGen();
  const defaultOpen = gen === defaultOpenGen && !searchQuery && kindFilter === 'all';
  const eagerRender = defaultOpen || Boolean(searchQuery) || kindFilter !== 'all' || getMachineTypeFilter(gen) !== 'all';

  return `<section class="items-gen-section machines-gen-section${defaultOpen ? ' is-open' : ''}${hidden ? ' is-hidden' : ''}" id="machines-gen-${gen}" data-gen="${gen}">
    <button type="button" class="items-gen-header" aria-expanded="${defaultOpen}">
      <span class="items-gen-accent" style="--gen-accent:${GEN_ACCENT_COLORS[gen]}"></span>
      <span class="items-gen-title">第 ${gen} 世代</span>
      <span class="items-gen-count">${visibleItems.length}${hasFilter ? ` / ${items.length}` : ''} 張</span>
      <span class="drawer-chevron" aria-hidden="true">▼</span>
    </button>
    <div class="items-gen-body"${defaultOpen ? '' : ' hidden'}>
      ${visibleItems.length
    ? renderSectionGrid(visibleItems, eagerRender, gen)
    : `${renderGenSortToolbar(gen)}<p class="items-empty-msg">此世代沒有符合的招式機</p>`}
    </div>
  </section>`;
}

function renderSectionGrid(items, eagerRender, gen) {
  const toolbar = renderGenSortToolbar(gen);
  if (!eagerRender) {
    return `${toolbar}<div class="items-grid" data-rendered="false"></div>`;
  }
  const sorted = sortMachineEntries(items);
  return `${toolbar}<div class="items-grid" data-rendered="true">${sorted.map((entry) => renderMachineCard(entry)).join('')}</div>`;
}

function renderMachineSprite(entry) {
  const icon = escapeHtml(entry.placeholderIcon || '💿');
  if (entry.sprite) {
    return `<img class="item-card-sprite" src="${escapeHtml(entry.sprite)}" alt="" loading="lazy" width="48" height="48" data-placeholder="${icon}">`;
  }
  if (entry.spriteFallback && entry.kind !== 'TR') {
    return `<img class="item-card-sprite" src="${escapeHtml(entry.spriteFallback)}" alt="" loading="lazy" width="48" height="48" data-placeholder="${icon}">`;
  }
  return `<span class="item-card-sprite-placeholder" aria-hidden="true">${icon}</span>`;
}

function renderMachineCard(entry) {
  const kindClass = cssSafeKind(entry.kind);
  const typeColor = typeColors[entry.type] || '#666';
  const kindColor = KIND_COLORS[entry.kind] || '#58a6ff';
  const englishRow = entry.hasChineseMoveName
    ? ''
    : `<div>英文名稱 ${escapeHtml(entry.moveNameEn)}</div>`;
  const typeChip = `<span class="machine-card-type" style="background:${typeColor}">${escapeHtml(entry.typeLabel)}</span>`;

  return `<article class="item-card machine-card machine-card--kind-${kindClass} machine-card--type-${entry.type}"
    tabindex="0" style="--machine-kind-accent:${kindColor};--machine-type-accent:${typeColor}" data-slug="${escapeHtml(entry.itemSlug)}">
    <div class="item-card-sprite-wrap">
      ${renderMachineSprite(entry)}
    </div>
    <span class="machine-card-kind">${escapeHtml(entry.displayLabel)}</span>
    <div class="machine-card-move">${escapeHtml(entry.moveName)}</div>
    ${typeChip}
    <p class="item-card-effect machine-card-effect">${escapeHtml(entry.moveEffect || '無繁中效果說明')}</p>
    <button type="button" class="machine-card-filter-link"
      data-move-slug="${escapeHtml(entry.moveSlug)}"
      data-move-name="${escapeHtml(entry.moveName)}"
      data-display-label="${escapeHtml(entry.displayLabel)}"
      data-type-label="${escapeHtml(entry.typeLabel)}">篩選圖鑑</button>
    <div class="machine-card-tip item-inline-detail" aria-hidden="true">
      <div class="item-detail-section">
        <div class="item-detail-title">招式效果</div>
        <p class="item-detail-effect">${escapeHtml(entry.moveEffect || '無繁中效果說明')}</p>
      </div>
      <div class="item-detail-meta">
        ${englishRow}
        <div>${escapeHtml(entry.kindLabel)} · ${escapeHtml(entry.displayLabel)}</div>
        <div>屬性 ${escapeHtml(entry.typeLabel)}</div>
      </div>
    </div>
  </article>`;
}

function bindSectionToggles(root) {
  root.querySelectorAll('.items-gen-header').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.items-gen-section');
      const body = section?.querySelector('.items-gen-body');
      const open = !section.classList.contains('is-open');
      section.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        body?.removeAttribute('hidden');
        ensureSectionRendered(section);
      } else {
        body?.setAttribute('hidden', '');
      }
      updateBackToTop('machinesBackToTop');
    });
  });
}

function bindCardInteractions(container) {
  container.querySelectorAll('.item-card-sprite[data-placeholder]').forEach((img) => {
    img.addEventListener('error', () => {
      const icon = img.dataset.placeholder || '💿';
      const placeholder = document.createElement('span');
      placeholder.className = 'item-card-sprite-placeholder';
      placeholder.setAttribute('aria-hidden', 'true');
      placeholder.textContent = icon;
      img.replaceWith(placeholder);
    }, { once: true });
  });

  container.querySelectorAll('.machine-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.machine-card-filter-link')) return;
      if (window.matchMedia('(hover: hover)').matches) return;
      card.classList.toggle('is-expanded');
      const detail = card.querySelector('.machine-card-tip');
      detail?.setAttribute('aria-hidden', card.classList.contains('is-expanded') ? 'false' : 'true');
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.machine-card-filter-link')) return;
        e.preventDefault();
        card.classList.toggle('is-expanded');
        const detail = card.querySelector('.machine-card-tip');
        detail?.setAttribute('aria-hidden', card.classList.contains('is-expanded') ? 'false' : 'true');
      }
    });
  });
}

function updateCount() {
  const el = document.getElementById('machinesCount');
  if (!el || !catalog) return;

  let totalCards = 0;
  let visible = 0;
  for (let gen = 1; gen <= 9; gen += 1) {
    const items = catalog.byGen[gen] || [];
    getAvailableTypesForGen(gen);
    totalCards += items.length;
    visible += items.filter((e) => entryMatches(e, gen)).length;
  }

  const anyTypeFilter = [...Array(9)].some((_, i) => getMachineTypeFilter(i + 1) !== 'all');
  if (!searchQuery && kindFilter === 'all' && !anyTypeFilter) {
    el.textContent = `共 ${catalog.totalMachines} 項招式機 · 卡片 ${totalCards} 張（跨世代顯示）`;
  } else if (!visible) {
    el.textContent = '找不到符合的招式機';
  } else {
    el.textContent = `顯示 ${visible} 張卡片 / 共 ${totalCards} 張`;
  }
}
