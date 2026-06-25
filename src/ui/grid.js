import { store } from '../state/store.js';
import { typeColors, typeNamesCN } from '../config.js';
import { getPokemonImage } from '../utils/sprites.js';

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
  const { gen, type, favorites } = store.currentFilters;
  const labels = [];
  if (gen !== 'all') labels.push({ kind: 'gen', text: `第 ${gen} 世代` });
  if (type !== 'all') labels.push({ kind: 'type', text: typeNamesCN[type] || type, typeKey: type });
  const searchText = document.getElementById('searchBox')?.value?.trim();
  if (searchText) labels.push({ kind: 'search', text: `搜尋：${searchText}` });
  if (favorites) labels.push({ kind: 'favorites', text: '我的收藏' });
  return labels;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
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
    return `<span class="stat-tag stat-tag--${item.kind}">${escapeHtml(item.text)}</span>`;
  }).join('');
  countEl.textContent = `${shown} / ${total}`;
  labelEl.hidden = true;
}

function typeBadges(pokemon) {
  if (!pokemon?.types) return '<span class="type-badge" style="opacity:0.5">載入中</span>';
  return pokemon.types
    .map((t) => `<span class="type-badge" style="background:${typeColors[t.type.name] || '#666'}">${typeNamesCN[t.type.name] || t.type.name}</span>`)
    .join('');
}

function renderCard(entry) {
  const p = entry.pokemon;
  const img = p ? getPokemonImage(p) : getPokemonImage(null);
  const name = entry.chineseName || entry.name;
  return `
    <div class="pokemon-card" data-id="${entry.id}" role="button" tabindex="0">
      <div class="pokemon-id">#${entry.id.toString().padStart(4, '0')}</div>
      <div class="pokemon-image-container">
        <img class="pokemon-image" src="${img}" alt="${name}" loading="lazy">
      </div>
      <div class="pokemon-name">${name}</div>
      <div class="pokemon-types">${typeBadges(p)}</div>
    </div>`;
}

function renderListRow(entry) {
  const p = entry.pokemon;
  const img = p ? getPokemonImage(p) : getPokemonImage(null);
  const name = entry.chineseName || entry.name;
  const total = p?.stats?.reduce((s, x) => s + x.base_stat, 0) || '—';
  return `
    <div class="pokemon-list-row" data-id="${entry.id}" role="button" tabindex="0">
      <img class="list-thumb" src="${img}" alt="" loading="lazy">
      <span class="list-id">#${entry.id.toString().padStart(4, '0')}</span>
      <span class="list-name">${name}</span>
      <span class="list-types">${typeBadges(p)}</span>
      <span class="list-total">種族值 ${total}</span>
    </div>`;
}

export function loadMore() {
  store.displayCount += 50;
}
