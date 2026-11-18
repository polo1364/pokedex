import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { CONCURRENCY_LIMIT } from '../src/config.js';

// Storage is the browser boundary; all filtering/loading code below is real.
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: { getItem: () => null },
});
const { store } = await import('../src/state/store.js');
const { applyFilters, preloadVisiblePokemon } = await import('../src/data/filters.js');

function entry(id) {
  return {
    id, speciesId: id, name: `pokemon-${id}`, chineseName: `寶可夢${id}`,
    loaded: false, pokemonUrl: `https://example.test/pokemon/${id}`,
    speciesData: { names: [], generation: { url: 'https://example.test/generation/1/' } },
  };
}

beforeEach((t) => {
  store.speciesIndex = Array.from({ length: 30 }, (_, i) => entry(i + 1));
  store.allPokemon = [];
  store.currentFilters = { gen: 'all', type: 'all', search: '', favorites: false, item: '', tm: '' };
  store.sortBy = 'id';
  t.mock.method(console, 'warn', () => {}); // IndexedDB is unavailable in Node.
});

function stubPokemonFetch(t, onStart = () => {}, onEnd = () => {}) {
  t.mock.method(globalThis, 'fetch', async (url) => {
    const id = Number(url.split('/').at(-1));
    onStart(id);
    await delay(5);
    onEnd(id);
    return Response.json({
      id, types: [{ type: { name: id % 2 ? 'fire' : 'water' } }],
      stats: [{ stat: { name: 'hp' }, base_stat: id }], held_items: [], moves: [],
    });
  });
}

test('visible detail loading uses the configured concurrency limit', async (t) => {
  let active = 0;
  let peak = 0;
  stubPokemonFetch(t, () => { peak = Math.max(peak, ++active); }, () => { active--; });
  applyFilters();
  await preloadVisiblePokemon();
  assert.ok(peak <= CONCURRENCY_LIMIT, `peak ${peak} exceeds ${CONCURRENCY_LIMIT}`);
  assert.equal(store.allPokemon.length, 30);
});

test('type filtering is reapplied after unknown types finish loading', async (t) => {
  stubPokemonFetch(t);
  store.currentFilters.type = 'fire';
  applyFilters();
  await preloadVisiblePokemon();
  assert.deepEqual(store.filteredPokemon.map((item) => item.id),
    Array.from({ length: 15 }, (_, i) => i * 2 + 1));
});

test('stat sorting uses the newly loaded values', async (t) => {
  stubPokemonFetch(t);
  store.sortBy = 'hp';
  applyFilters();
  await preloadVisiblePokemon();
  assert.deepEqual(store.filteredPokemon.map((item) => item.id),
    Array.from({ length: 30 }, (_, i) => 30 - i));
});

test('a filter change during loading wins over the original selection', async (t) => {
  stubPokemonFetch(t, () => { store.currentFilters.type = 'water'; });
  store.currentFilters.type = 'fire';
  applyFilters();
  await preloadVisiblePokemon();
  assert.deepEqual(store.filteredPokemon.map((item) => item.id),
    Array.from({ length: 15 }, (_, i) => (i + 1) * 2));
});
