import { getItemIcon, renderCatalogIcon, bindCatalogIconFallbacks } from '../utils/catalogIcons.js';
import '../styles/catalogs.css';
import { getVersionGroupDisplayName } from '../utils/versions.js';
import { loadItemsCatalog, countVisibleCards } from '../data/items.js';
import { escapeHtml } from '../utils/infoCards.js';
import {
  cssSafeSlug,
  formatAttributeLabels,
  formatItemPrice,
  formatOtherGenerations,
  GEN_ACCENT_COLORS,
  getItemAccentColor,
} from '../utils/items.js';

let catalog = null;
let searchQuery = '';
const renderedSections = new Set();

export function initItemsPage() {
  bindSearch();
  loadAndRender();
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
  const loadingEl = document.getElementById('itemsLoading');
  const rootEl = document.getElementById('itemsContentRoot');
  const progressBar = document.getElementById('itemsProgressBar');
  const progressText = document.getElementById('itemsProgressText');

  try {
    catalog = await loadItemsCatalog((pct, done, total) => {
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressText) progressText.textContent = `載入道具資料… ${pct}% (${done}/${total})`;
    });

    hideLoading(loadingEl);
    showContent(rootEl);
    renderGenNav();
    updateCount();

    await new Promise((resolve) => requestAnimationFrame(resolve));
    renderCatalog();
  } catch (err) {
    console.error(err);
    if (progressText) progressText.textContent = err.message || '載入失敗，請重新整理頁面';
  }
}

function bindSearch() {
  const input = document.getElementById('itemSearchBox');
  input?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderedSections.clear();
    renderCatalog();
    updateCount();
    renderGenNav();
  });
}

function renderGenNav() {
  const nav = document.getElementById('itemsGenNav');
  if (!nav) return;

  nav.innerHTML = '';
  for (let gen = 1; gen <= 9; gen += 1) {
    const count = (catalog.byGen[gen] || []).filter(itemMatches).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'items-gen-pill';
    btn.dataset.gen = String(gen);
    btn.style.setProperty('--gen-accent', GEN_ACCENT_COLORS[gen]);
    btn.textContent = `第 ${gen} 世代 (${count})`;
    btn.addEventListener('click', () => scrollToGen(gen));
    nav.appendChild(btn);
  }

  if (catalog.uncategorized?.length) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'items-gen-pill items-gen-pill--muted';
    btn.dataset.gen = 'uncategorized';
    btn.textContent = `未分類 (${catalog.uncategorized.filter(itemMatches).length})`;
    btn.addEventListener('click', () => scrollToGen('uncategorized'));
    nav.appendChild(btn);
  }
}

function scrollToGen(gen) {
  const section = document.getElementById(gen === 'uncategorized' ? 'items-gen-uncategorized' : `items-gen-${gen}`);
  if (!section) return;
  section.classList.add('is-open');
  section.querySelector('.items-gen-header')?.setAttribute('aria-expanded', 'true');
  const body = section.querySelector('.items-gen-body');
  body?.removeAttribute('hidden');
  ensureSectionRendered(section);
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getDefaultOpenGen() {
  for (let gen = 9; gen >= 1; gen -= 1) {
    if (catalog.byGen[gen]?.length) return gen;
  }
  return 9;
}

function renderItemSprite(item) {
  return renderCatalogIcon(getItemIcon(item), item.displayName, { historical: Boolean(item.historicalName) });
}

function itemMatches(item) {
  if (!searchQuery) return true;
  const q = searchQuery.toLowerCase();
  return item.displayName.toLowerCase().includes(q)
    || (item.currentName || '').toLowerCase().includes(q)
    || item.slug.includes(q)
    || (item.enName || '').toLowerCase().includes(q)
    || (item.categoryZh || '').toLowerCase().includes(q);
}

function renderCatalog() {
  const root = document.getElementById('itemsContentRoot');
  if (!root || !catalog) return;

  renderedSections.clear();
  const sections = [];
  for (let gen = 1; gen <= 9; gen += 1) {
    sections.push(renderGenSection(gen, catalog.byGen[gen] || []));
  }
  if (catalog.uncategorized?.length) {
    sections.push(renderUncategorizedSection(catalog.uncategorized));
  }

  root.innerHTML = sections.join('');
  bindSectionToggles(root);

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

  const gen = section.dataset.gen;
  let items = [];
  if (gen === 'uncategorized') {
    items = catalog.uncategorized || [];
  } else {
    items = catalog.byGen[Number(gen)] || [];
  }

  const visibleItems = items.filter(itemMatches);
  grid.innerHTML = visibleItems.map((item) => renderItemCard(
    gen === 'uncategorized' ? { ...item, currentGen: null } : item,
  )).join('');
  grid.dataset.rendered = 'true';
  renderedSections.add(key);
  bindCardInteractions(grid);
}

function renderGenSection(gen, items) {
  const visibleItems = items.filter(itemMatches);
  const hidden = searchQuery && !visibleItems.length;
  const defaultOpenGen = getDefaultOpenGen();
  const defaultOpen = searchQuery ? visibleItems.length > 0 : gen === defaultOpenGen;
  const eagerRender = defaultOpen || Boolean(searchQuery);

  return `<section class="items-gen-section${defaultOpen ? ' is-open' : ''}${hidden ? ' is-hidden' : ''}" id="items-gen-${gen}" data-gen="${gen}">
    <button type="button" class="items-gen-header" aria-expanded="${defaultOpen}">
      <span class="items-gen-accent" style="--gen-accent:${GEN_ACCENT_COLORS[gen]}"></span>
      <span class="items-gen-title">第 ${gen} 世代</span>
      <span class="items-gen-count">${visibleItems.length}${searchQuery ? ` / ${items.length}` : ''} 項</span>
      <span class="drawer-chevron" aria-hidden="true">▼</span>
    </button>
    <div class="items-gen-body"${defaultOpen ? '' : ' hidden'}>
      ${visibleItems.length
    ? renderSectionGrid(visibleItems, eagerRender)
    : '<p class="items-empty-msg">此世代沒有符合的道具</p>'}
    </div>
  </section>`;
}

function renderUncategorizedSection(items) {
  const visibleItems = items.filter(itemMatches);
  const hidden = searchQuery && !visibleItems.length;
  const eagerRender = Boolean(searchQuery);

  return `<section class="items-gen-section items-gen-section--uncategorized${searchQuery && visibleItems.length ? ' is-open' : ''}${hidden ? ' is-hidden' : ''}" id="items-gen-uncategorized" data-gen="uncategorized">
    <button type="button" class="items-gen-header" aria-expanded="${Boolean(searchQuery && visibleItems.length)}">
      <span class="items-gen-accent" style="--gen-accent:#8b949e"></span>
      <span class="items-gen-title">未分類</span>
      <span class="items-gen-count">${visibleItems.length}${searchQuery ? ` / ${items.length}` : ''} 項</span>
      <span class="drawer-chevron" aria-hidden="true">▼</span>
    </button>
    <div class="items-gen-body"${searchQuery && visibleItems.length ? '' : ' hidden'}>
      ${visibleItems.length
    ? renderSectionGrid(visibleItems.map((item) => ({ ...item, currentGen: null })), eagerRender)
    : '<p class="items-empty-msg">沒有符合的道具</p>'}
    </div>
  </section>`;
}

function renderSectionGrid(items, eagerRender) {
  if (!eagerRender) {
    return '<div class="items-grid" data-rendered="false"></div>';
  }
  return `<div class="items-grid" data-rendered="true">${items.map((item) => renderItemCard(item)).join('')}</div>`;
}

function renderHoldersLink(item) {
  if (!item.heldByCount) return '';
  const params = new URLSearchParams({ heldItem: item.slug, heldItemLabel: item.currentName || item.displayName });
  return `<a class="machine-card-filter-link item-card-holders-link" href="./index.html?${escapeHtml(params.toString())}"
    title="在主圖鑑列出野生時會攜帶此道具的寶可夢（跨版本）">查看攜帶者（${item.heldByCount} 種）→</a>`;
}

function renderItemCard(item) {
  const accent = getItemAccentColor(item.pocketSlug, item.categorySlug);
  const pocketClass = cssSafeSlug(item.pocketSlug);
  const categoryClass = cssSafeSlug(item.categorySlug);
  const isMatch = !searchQuery || itemMatches(item);
  const hasEffect = Boolean(item.effectLanguage);
  const details = (item.versionDetails || []).filter((detail) => detail.language || detail.prices.length)
    .map((detail) => `<div class="catalog-version-detail">
    <strong>${escapeHtml(getVersionGroupDisplayName(detail.versionGroup))}</strong>
    ${detail.language ? `<p>${escapeHtml(detail.text)}</p>` : ''}
    ${detail.prices.length ? `<p class="item-card-cost">${detail.prices.map((price) => escapeHtml(formatItemPrice(price))).join('<br>')}</p>` : ''}
  </div>`).join('');
  const attrs = formatAttributeLabels(item.attributes);
  const otherGens = item.currentGen ? formatOtherGenerations(item.generations, item.currentGen) : '';
  const englishRow = item.hasChineseName
    ? ''
    : `<div>英文名稱 ${escapeHtml(item.enName)}</div>`;

  return `<article class="item-card item-card--pocket-${pocketClass} item-card--category-${categoryClass}${isMatch && searchQuery ? ' item-card--match' : ''}${searchQuery && !isMatch ? ' item-card--dimmed' : ''}"
    tabindex="0" style="--item-accent:${accent}" data-slug="${escapeHtml(item.slug)}">
    <div class="item-card-sprite-wrap">
      ${renderItemSprite(item)}
    </div>
    <div class="item-card-name" title="${escapeHtml(item.displayName)}">${escapeHtml(item.displayName)}</div>
    <span class="item-card-category">${escapeHtml(item.categoryZh)}</span>
    ${hasEffect ? `<p class="item-card-effect">${escapeHtml(item.effect)}</p>
    <p class="catalog-version-badge">${escapeHtml(getVersionGroupDisplayName(item.effectVersion))}</p>` : ''}
    <div class="item-inline-detail" aria-hidden="true">
      ${details ? `<div class="item-detail-section">
        <div class="item-detail-title">各版本效果與價格</div>
        ${details}
      </div>` : ''}
      <div class="item-detail-meta">
        ${englishRow}
        ${item.historicalName ? `<div>後續對應道具：${escapeHtml(item.currentName)}</div>` : ''}
        <div>分類 ${escapeHtml(item.categoryZh)} · ${escapeHtml(item.pocketZh)}</div>
        ${attrs.length ? `<div>${escapeHtml(attrs.join(' · '))}</div>` : ''}
        ${otherGens ? `<div>${escapeHtml(otherGens)}</div>` : ''}
      </div>
    </div>
    ${renderHoldersLink(item)}
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
    });
  });
}

function bindCardInteractions(container) {
  bindCatalogIconFallbacks(container);

  container.querySelectorAll('.item-card').forEach((card) => {
    if (card.dataset.bound) return;
    card.dataset.bound = 'true';
    const syncDetailAccessibility = () => {
      const visible = card.classList.contains('is-expanded') || card.matches(':focus-visible')
        || (window.matchMedia('(hover: hover)').matches && card.matches(':hover'));
      card.querySelector('.item-inline-detail')?.setAttribute('aria-hidden', String(!visible));
    };
    for (const event of ['mouseenter', 'mouseleave', 'focus', 'blur']) {
      card.addEventListener(event, syncDetailAccessibility);
    }
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (window.matchMedia('(hover: hover)').matches) return;
      card.classList.toggle('is-expanded');
      const detail = card.querySelector('.item-inline-detail');
      detail?.setAttribute('aria-hidden', card.classList.contains('is-expanded') ? 'false' : 'true');
    });

    card.addEventListener('keydown', (e) => {
      if (e.target.closest('a')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-expanded');
        const detail = card.querySelector('.item-inline-detail');
        detail?.setAttribute('aria-hidden', card.classList.contains('is-expanded') ? 'false' : 'true');
      }
    });
  });
}

function updateCount() {
  const el = document.getElementById('itemsCount');
  if (!el || !catalog) return;
  const { totalUnique, totalCards, visible } = countVisibleCards(catalog, searchQuery);
  if (!searchQuery) {
    el.textContent = `共 ${totalUnique} 項道具 · 卡片 ${totalCards} 張（跨世代重複顯示）`;
  } else if (!visible) {
    el.textContent = '找不到符合的道具';
  } else {
    el.textContent = `顯示 ${visible} 張卡片 / 共 ${totalCards} 張`;
  }
}
