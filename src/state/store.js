import { PAGE_SIZE } from '../config.js';

export const store = {
  allPokemon: [],
  speciesIndex: [],
  filteredPokemon: [],
  displayCount: PAGE_SIZE,
  currentFilters: { gen: 'all', type: 'all', search: '', favorites: false, item: '', itemLabel: '', tm: '' },
  sortBy: localStorage.getItem('pokedex_sort_by') || 'id',
  viewMode: localStorage.getItem('pokedex_view_mode') || 'grid',
  generationMap: {},
};

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('pokedex_favorites') || '[]');
  } catch {
    return [];
  }
}

export function setFavorites(ids) {
  localStorage.setItem('pokedex_favorites', JSON.stringify(ids));
}

export function toggleFavorite(id) {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(id);
  setFavorites(favs);
  return favs;
}
