import { store, getFavorites } from '../state/store.js';
import { getGenerationFromSpecies } from '../utils/i18n.js';
import { ensurePokemonLoaded } from '../data/pokemon.js';
import {
  enrichFilterMetaForEntries,
  matchesItemFilter,
  matchesMachineMoveFilter,
} from '../utils/filterMeta.js';

let lastFilterKey = '';

function filterKey() {
  const { gen, type, search, favorites, item, tm } = store.currentFilters;
  return `${gen}|${type}|${search}|${favorites}|${item}|${tm}`;
}

export function applyFilters(resetDisplay = true) {
  const favs = getFavorites();
  const key = filterKey();
  const { item, tm } = store.currentFilters;

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
      entry.id.toString().includes(q);
    const matchItem = !item || matchesItemFilter(entry, item);
    const matchTm = !tm || matchesMachineMoveFilter(entry, tm);
    return matchGen && (store.currentFilters.type === 'all' || matchType) && matchFav && matchSearch && matchItem && matchTm;
  });

  sortFiltered();

  store.displayCount = store.filteredPokemon.length;
  lastFilterKey = key;
}

function getStat(entry, statName) {
  if (!entry.pokemon?.stats) return -1;
  return entry.pokemon.stats.find((s) => s.stat.name === statName)?.base_stat ?? -1;
}

function getTotalStats(entry) {
  if (!entry.pokemon?.stats) return -1;
  return entry.pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
}

function sortDesc(a, b, getValue) {
  return getValue(b) - getValue(a);
}

function sortAsc(a, b, getValue) {
  return getValue(a) - getValue(b);
}

export function sortFiltered() {
  const { sortBy } = store;
  const sorters = {
    id: (a, b) => a.id - b.id,
    name: (a, b) => (a.chineseName || '').localeCompare(b.chineseName || '', 'zh-Hant'),
    generation: (a, b) => {
      const ga = getGenerationFromSpecies(a.speciesData, store.generationMap) ?? 99;
      const gb = getGenerationFromSpecies(b.speciesData, store.generationMap) ?? 99;
      return ga !== gb ? ga - gb : a.id - b.id;
    },
    total: (a, b) => sortDesc(a, b, getTotalStats),
    hp: (a, b) => sortDesc(a, b, (e) => getStat(e, 'hp')),
    attack: (a, b) => sortDesc(a, b, (e) => getStat(e, 'attack')),
    defense: (a, b) => sortDesc(a, b, (e) => getStat(e, 'defense')),
    'special-attack': (a, b) => sortDesc(a, b, (e) => getStat(e, 'special-attack')),
    'special-defense': (a, b) => sortDesc(a, b, (e) => getStat(e, 'special-defense')),
    speed: (a, b) => sortDesc(a, b, (e) => getStat(e, 'speed')),
    height: (a, b) => sortDesc(a, b, (e) => e.pokemon?.height ?? -1),
    weight: (a, b) => sortDesc(a, b, (e) => e.pokemon?.weight ?? -1),
    capture_rate: (a, b) => sortAsc(a, b, (e) => e.speciesData?.capture_rate ?? 999),
  };

  store.filteredPokemon.sort(sorters[sortBy] || sorters.id);
}

export async function preloadVisiblePokemon() {
  const visible = store.filteredPokemon.slice(0, store.displayCount);
  await Promise.all(
    visible.map((entry) => {
      if (!entry.loaded) return ensurePokemonLoaded(entry).catch(() => null);
      return null;
    })
  );

  const { item, tm } = store.currentFilters;
  if (item || tm) {
    const toEnrich = store.filteredPokemon.filter((e) => e.loaded && !e.filterMeta?.namesLoaded);
    await enrichFilterMetaForEntries(toEnrich.slice(0, 80));
    applyFilters(false);
  }
}
