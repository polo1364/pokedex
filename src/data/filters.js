import { store, getFavorites } from '../state/store.js';
import { getGenerationFromSpecies } from '../utils/i18n.js';
import { ensurePokemonLoaded } from '../data/pokemon.js';
import { PAGE_SIZE } from '../config.js';

let lastFilterKey = '';

function filterKey() {
  const { gen, type, search, favorites } = store.currentFilters;
  return `${gen}|${type}|${search}|${favorites}`;
}

export function applyFilters(resetDisplay = true) {
  const favs = getFavorites();
  const key = filterKey();

  store.filteredPokemon = store.speciesIndex.filter((entry) => {
    const gen = store.currentFilters.gen;
    const matchGen = gen === 'all' || (() => {
      const g = getGenerationFromSpecies(entry.speciesData, store.generationMap);
      return g === parseInt(gen, 10);
    })();
    const matchType = store.currentFilters.type === 'all' || (
      entry.pokemon?.types?.some((t) => t.type.name === store.currentFilters.type) ?? !entry.loaded
    );
    const matchFav = !store.currentFilters.favorites || favs.includes(entry.id) || favs.includes(entry.speciesId);
    const q = store.currentFilters.search;
    const matchSearch = !q ||
      entry.chineseName?.toLowerCase().includes(q) ||
      entry.name?.toLowerCase().includes(q) ||
      entry.id.toString().includes(q);
    return matchGen && (store.currentFilters.type === 'all' || matchType) && matchFav && matchSearch;
  });

  sortFiltered();

  if (resetDisplay && key !== lastFilterKey) {
    store.displayCount = PAGE_SIZE;
  }
  lastFilterKey = key;
}

export function sortFiltered() {
  const { sortBy } = store;
  store.filteredPokemon.sort((a, b) => {
    if (sortBy === 'name') return (a.chineseName || '').localeCompare(b.chineseName || '', 'zh-Hant');
    if (sortBy === 'total') {
      const ta = a.pokemon?.stats?.reduce((s, x) => s + x.base_stat, 0) || 0;
      const tb = b.pokemon?.stats?.reduce((s, x) => s + x.base_stat, 0) || 0;
      return tb - ta;
    }
    if (sortBy === 'speed') {
      const sa = a.pokemon?.stats?.find((s) => s.stat.name === 'speed')?.base_stat || 0;
      const sb = b.pokemon?.stats?.find((s) => s.stat.name === 'speed')?.base_stat || 0;
      return sb - sa;
    }
    return a.id - b.id;
  });
}

export async function preloadVisiblePokemon() {
  const visible = store.filteredPokemon.slice(0, store.displayCount);
  await Promise.all(
    visible.map((entry) => {
      if (!entry.loaded) return ensurePokemonLoaded(entry).catch(() => null);
      return null;
    })
  );
}
