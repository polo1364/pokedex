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

  document.getElementById('totalCount').textContent = store.speciesIndex.length;
  document.getElementById('displayCount').textContent = displayed.length;
  document.getElementById('loadMoreContainer').style.display =
    store.displayCount < store.filteredPokemon.length ? 'flex' : 'none';
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
