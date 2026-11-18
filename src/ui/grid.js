import { store } from '../state/store.js';
import { typeColors, typeNamesCN } from '../config.js';
import { getPokemonImage } from '../utils/sprites.js';
import { entryTypes, entryTotalStats } from '../utils/entrySummary.js';
import { STAT_FILTER_LABELS } from '../utils/advancedFilters.js';
import { EGG_GROUP_NAMES } from '../utils/breeding.js';

export function renderPokemonGrid() {
  const grid = document.getElementById('pokemonGrid');
  const displayed = store.filteredPokemon.slice(0, store.displayCount);
  const isList = store.viewMode === 'list';

  if (isList) {
    grid.className = 'pokemon-list';
    grid.innerHTML = displayed.map((entry) => renderListRow(entry)).join('');
  } else {
    grid.className = 'pokemon-grid';
    grid.innerHTML = displayed.map((entry) => renderCard(entry)).join('');
  }

  updateStatSummary(displayed.length);
  document.getElementById('loadMoreContainer').style.display = 'none';
}

function getActiveFilterLabels() {
  const { gen, type, favorites, item, itemLabel, tm, tmLabel } = store.currentFilters;
  const labels = [];
  if (gen !== 'all') labels.push({ kind: 'gen', text: `第 ${gen} 世代` });
  if (type !== 'all') labels.push({ kind: 'type', text: typeNamesCN[type] || type, typeKey: type });
  const searchText = document.getElementById('searchBox')?.value?.trim();
  if (searchText) labels.push({ kind: 'search', text: `搜尋：${searchText}` });
  if (item) labels.push({ kind: 'item', text: `道具：${itemLabel || item}` });
  if (tm) labels.push({ kind: 'tm', text: `招式機：${tmLabel || tm}` });
  if (favorites) labels.push({ kind: 'favorites', text: '我的收藏' });
  const adv = store.currentFilters.adv;
  if (adv && adv.type2 !== 'all') labels.push({ kind: 'type', text: `＋${typeNamesCN[adv.type2] || adv.type2}`, typeKey: adv.type2 });
  if (adv && (adv.min !== null || adv.max !== null)) {
    const range = adv.min !== null && adv.max !== null
      ? (adv.min === adv.max ? `= ${adv.min}` : `${adv.min}–${adv.max}`)
      : adv.min !== null ? `≥ ${adv.min}` : `≤ ${adv.max}`;
    labels.push({ kind: 'stat', text: `${STAT_FILTER_LABELS[adv.stat]} ${range}` });
  }
  if (adv?.ability) labels.push({ kind: 'ability', text: `特性：${store.abilityNames[adv.ability] || adv.ability}` });
  if (adv?.egg) labels.push({ kind: 'egg', text: `蛋群：${EGG_GROUP_NAMES[adv.egg] || adv.egg}` });
  return labels;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updateStatSummary(shown) {
  const total = store.speciesIndex.length;
  const labels = getActiveFilterLabels();
  const tagsEl = document.getElementById('statTags');
  const countEl = document.getElementById('statCount');
  const labelEl = document.getElementById('statLabel');
  const cardEl = document.getElementById('statCard');

  if (!labels.length) {
    cardEl.classList.remove('stat-card--filtered');
    tagsEl.hidden = true;
    tagsEl.innerHTML = '';
    countEl.textContent = String(total);
    labelEl.textContent = '圖鑑';
    labelEl.hidden = false;
    return;
  }

  cardEl.classList.add('stat-card--filtered');
  tagsEl.hidden = false;
  tagsEl.innerHTML = labels.map((item) => {
    if (item.kind === 'type') {
      const bg = typeColors[item.typeKey] || '#666';
      return `<span class="stat-tag stat-tag--type" style="background:${bg}">${escapeHtml(item.text)}</span>`;
    }
    if (item.kind === 'item' || item.kind === 'tm') {
      // 道具／招式機篩選只能從網址帶入，側欄沒有對應按鈕，因此在標籤上提供清除。
      return `<span class="stat-tag stat-tag--${item.kind}">${escapeHtml(item.text)}<button type="button" class="stat-tag-clear" data-clear="${item.kind}" aria-label="清除${escapeHtml(item.text)}篩選">×</button></span>`;
    }
    return `<span class="stat-tag stat-tag--${item.kind}">${escapeHtml(item.text)}</span>`;
  }).join('');
  countEl.textContent = `${shown} / ${total}`;
  labelEl.hidden = true;
}

const ARTWORK_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

/** 尚未載入完整資料時，先以物種編號推得官方立繪，避免整片「?」佔位圖。 */
function entryImage(entry) {
  if (entry.pokemon) return getPokemonImage(entry.pokemon);
  const artworkId = entry.summary?.p || entry.id;
  if (artworkId > 0) return `${ARTWORK_BASE}/${artworkId}.png`;
  return getPokemonImage(null);
}

function typeBadges(entry) {
  const types = entryTypes(entry);
  if (!types) return '<span class="type-badge type-badge--skeleton" aria-label="載入中"></span>';
  return types
    .map((t) => `<span class="type-badge" style="background:${typeColors[t] || '#666'}">${typeNamesCN[t] || t}</span>`)
    .join('');
}

function renderCard(entry) {
  const img = entryImage(entry);
  const name = escapeHtml(entry.chineseName || entry.name);
  return `
    <div class="pokemon-card" data-id="${entry.id}" role="button" tabindex="0">
      <div class="pokemon-id">#${entry.id.toString().padStart(4, '0')}</div>
      <div class="pokemon-image-container">
        <img class="pokemon-image" src="${img}" alt="${name}" loading="lazy" decoding="async">
      </div>
      <div class="pokemon-name">${name}</div>
      <div class="pokemon-types">${typeBadges(entry)}</div>
    </div>`;
}

function renderListRow(entry) {
  const img = entryImage(entry);
  const name = escapeHtml(entry.chineseName || entry.name);
  const totalValue = entryTotalStats(entry);
  const total = totalValue > 0 ? totalValue : '—';
  return `
    <div class="pokemon-list-row" data-id="${entry.id}" role="button" tabindex="0">
      <img class="list-thumb" src="${img}" alt="" loading="lazy">
      <span class="list-id">#${entry.id.toString().padStart(4, '0')}</span>
      <span class="list-name">${name}</span>
      <span class="list-types">${typeBadges(entry)}</span>
      <span class="list-total">種族值 ${total}</span>
    </div>`;
}

/** 單張卡片資料載入完成後就地更新，不重繪整個網格（保留捲動位置與已載入圖片）。 */
export function patchPokemonCard(entry) {
  const grid = document.getElementById('pokemonGrid');
  const el = grid?.querySelector(`[data-id="${entry.id}"]`);
  if (!el) return;
  const html = store.viewMode === 'list' ? renderListRow(entry) : renderCard(entry);
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  const next = tpl.content.firstElementChild;
  if (!next) return;
  const hadFocus = document.activeElement === el;
  el.replaceWith(next);
  if (hadFocus) next.focus();
}

export function loadMore() {
  store.displayCount += 50;
}
