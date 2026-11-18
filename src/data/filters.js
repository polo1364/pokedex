import { store, getFavorites } from '../state/store.js';
import {
  entryGeneration, entryTypes, entryStat, entryTotalStats,
  entryHeight, entryWeight, entryCaptureRate,
} from '../utils/entrySummary.js';
import { ensurePokemonLoaded } from '../data/pokemon.js';
import { runPool } from '../api/client.js';
import { matchesSearch } from '../utils/search.js';
import { matchesAdvanced, EMPTY_ADVANCED } from '../utils/advancedFilters.js';
import {
  enrichFilterMetaForEntries,
  matchesItemFilter,
  matchesMachineMoveFilter,
} from '../utils/filterMeta.js';

let lastFilterKey = '';

function filterKey() {
  const { gen, type, search, favorites, item, tm, adv, forms } = store.currentFilters;
  return `${gen}|${type}|${search}|${favorites}|${item}|${tm}|${JSON.stringify(adv)}|${forms}`;
}

/** 篩選的母體：物種一般形態，加上依「顯示形態」選項納入的其他形態。 */
function filterPool() {
  const mode = store.currentFilters.forms || 'none';
  const forms = store.formEntries || [];
  if (mode === 'none' || !forms.length) return store.speciesIndex;
  const extra = mode === 'all' ? forms : forms.filter((f) => f.formKind === mode);
  return [...store.speciesIndex, ...extra];
}

export function applyFilters(resetDisplay = true) {
  const favs = getFavorites();
  const key = filterKey();
  const adv = store.currentFilters.adv || EMPTY_ADVANCED;
  const { item, tm } = store.currentFilters;

  const pool = filterPool();
  store.poolSize = pool.length;
  store.filteredPokemon = pool.filter((entry) => {
    const gen = store.currentFilters.gen;
    const matchGen = gen === 'all' || entryGeneration(entry) === parseInt(gen, 10);
    const types = entryTypes(entry);
    const matchType = store.currentFilters.type === 'all' || (
      types ? types.includes(store.currentFilters.type) : !entry.loaded
    );
    const matchFav = !store.currentFilters.favorites || favs.includes(entry.id) || favs.includes(entry.speciesId);
    const matchSearch = matchesSearch(entry, store.currentFilters.search);
    const matchItem = !item || matchesItemFilter(entry, item);
    const matchTm = !tm || matchesMachineMoveFilter(entry, tm);
    const matchAdv = matchesAdvanced(entry, adv);
    return matchGen && (store.currentFilters.type === 'all' || matchType) && matchFav && matchSearch
      && matchItem && matchTm && matchAdv;
  });

  sortFiltered();

  store.displayCount = store.filteredPokemon.length;
  lastFilterKey = key;
}

const getStat = entryStat;
const getTotalStats = entryTotalStats;

function sortDesc(a, b, getValue) {
  return getValue(b) - getValue(a);
}

function sortAsc(a, b, getValue) {
  return getValue(a) - getValue(b);
}

export function sortFiltered() {
  const { sortBy } = store;
  const sorters = {
    // 形態排在所屬物種之後（以圖鑑編號排序，同編號再依 pokemon id）
    id: (a, b) => (a.dexNumber ?? a.id) - (b.dexNumber ?? b.id) || a.id - b.id,
    name: (a, b) => (a.chineseName || '').localeCompare(b.chineseName || '', 'zh-Hant'),
    generation: (a, b) => {
      const ga = entryGeneration(a) ?? 99;
      const gb = entryGeneration(b) ?? 99;
      return ga !== gb ? ga - gb : a.id - b.id;
    },
    total: (a, b) => sortDesc(a, b, getTotalStats),
    hp: (a, b) => sortDesc(a, b, (e) => getStat(e, 'hp')),
    attack: (a, b) => sortDesc(a, b, (e) => getStat(e, 'attack')),
    defense: (a, b) => sortDesc(a, b, (e) => getStat(e, 'defense')),
    'special-attack': (a, b) => sortDesc(a, b, (e) => getStat(e, 'special-attack')),
    'special-defense': (a, b) => sortDesc(a, b, (e) => getStat(e, 'special-defense')),
    speed: (a, b) => sortDesc(a, b, (e) => getStat(e, 'speed')),
    height: (a, b) => sortDesc(a, b, entryHeight),
    weight: (a, b) => sortDesc(a, b, entryWeight),
    capture_rate: (a, b) => sortAsc(a, b, (e) => entryCaptureRate(e) ?? 999),
  };

  store.filteredPokemon.sort(sorters[sortBy] || sorters.id);
}

export async function preloadVisiblePokemon(onLoaded) {
  const visible = store.filteredPokemon.slice(0, store.displayCount);
  const { item: itemFilter, tm: tmFilter } = store.currentFilters;
  // 有精簡索引的條目已足夠顯示與排序；只有道具／招式機篩選需要完整資料（持有物、招式表）。
  const needsFull = (entry) => !entry.loaded && (!entry.summary || itemFilter || tmFilter);
  await runPool(visible.filter(needsFull), async (entry) => {
    const pokemon = await ensurePokemonLoaded(entry);
    onLoaded?.(entry);
    return pokemon;
  });

  const { item, tm } = store.currentFilters;
  if (item || tm) {
    const toEnrich = store.filteredPokemon.filter((e) => e.loaded && !e.filterMeta?.namesLoaded);
    await enrichFilterMetaForEntries(toEnrich.slice(0, 80));
  }
  // Types and stat values may have been unknown when filtering first ran.
  // Use the current selection in case it changed while requests were pending.
  applyFilters(false);
}
