import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  matchesName, filterMoves, sortMoves, buildAbilityHolders, filterAbilities, sortAbilities,
  learnersFromMove, readCatalogState, catalogStateToSearch, DEFAULT_CATALOG_STATE,
} from '../src/utils/moveCatalog.js';

const load = (name) => JSON.parse(fs.readFileSync(new URL(`../public/data/${name}`, import.meta.url), 'utf8'));
const moves = load('moves-index.json').entries;
const abilities = load('abilities-index.json').entries;
const species = load('species-index.json').entries;

test('move and ability indexes are complete and Chinese-named', () => {
  assert.ok(moves.length >= 900);
  assert.ok(moves.every((m) => m.zh && m.t && ['physical', 'special', 'status'].includes(m.c) && m.g >= 1));
  assert.ok(!moves.some((m) => m.t === 'shadow'), 'shadow moves are excluded');
  const thunderbolt = moves.find((m) => m.n === 'thunderbolt');
  assert.deepEqual([thunderbolt.zh, thunderbolt.t, thunderbolt.c, thunderbolt.p, thunderbolt.a, thunderbolt.pp, thunderbolt.g],
    ['十萬伏特', 'electric', 'special', 90, 100, 15, 1]);
  const used = new Set(species.flatMap((e) => e.a.map((s) => s.replace(/^\*/, ''))));
  const known = new Set(abilities.map((a) => a.n));
  assert.deepEqual([...used].filter((s) => !known.has(s)), [], 'every species ability has a catalog entry');
});

test('name search matches Chinese, English slug variants and numbers', () => {
  const tb = moves.find((m) => m.n === 'thunderbolt');
  assert.ok(matchesName(tb, '十萬'));
  assert.ok(matchesName(tb, 'Thunder Bolt'));
  assert.ok(matchesName(tb, '#85'));
  assert.ok(!matchesName(tb, '8'), 'numbers match exactly, not as substrings');
});

test('move filters combine type, class and generation', () => {
  const r = filterMoves(moves, { type: 'electric', cls: 'special', gen: '1' }).map((m) => m.n);
  assert.ok(r.includes('thunderbolt') && r.includes('thunder'));
  assert.ok(!r.includes('thunder-punch'), 'physical');
  assert.ok(!r.includes('discharge'), 'gen 4');
});

test('move sorting handles null power and never-miss accuracy', () => {
  const byPower = sortMoves(moves, 'power');
  assert.ok(byPower[0].p >= 250, 'Explosion-class power first');
  assert.equal(byPower[byPower.length - 1].p, null, 'status moves last');
  const byAcc = sortMoves(filterMoves(moves, { q: 'swift' }), 'accuracy');
  assert.equal(byAcc[0].a, null, 'Swift (never misses) sorts above 100%');
  const byName = sortMoves(moves.slice(0, 20), 'name');
  assert.ok(byName.every((m, i) => i === 0 || byName[i - 1].zh.localeCompare(m.zh, 'zh-Hant') <= 0));
});

test('ability holders come from the species index, hidden marked', () => {
  const holders = buildAbilityHolders(species);
  const solar = holders.get('solar-power');
  assert.ok(solar.some((h) => h.id === 6 && h.hidden));
  assert.ok(holders.get('levitate').some((h) => h.id === 92 && !h.hidden));
  const sorted = sortAbilities(abilities, 'count', holders);
  assert.ok(holders.get(sorted[0].n).length >= holders.get(sorted[10].n).length);
  assert.deepEqual(filterAbilities(abilities, { q: '飄浮' }).map((a) => a.n), ['levitate']);
  assert.ok(filterAbilities(abilities, { gen: '9' }).every((a) => a.g === 9));
});

test('learners keep default forms and count other forms', () => {
  const api = 'https://pokeapi.co/api/v2/pokemon';
  assert.deepEqual(learnersFromMove({ learned_by_pokemon: [
    { url: `${api}/26/` }, { url: `${api}/25/` }, { url: `${api}/10100/` }, { url: `${api}/25/` },
  ] }), { ids: [25, 26], forms: 1 });
  assert.deepEqual(learnersFromMove(null), { ids: [], forms: 0 });
});

test('URL state round-trips and drops invalid or move-only params on the abilities tab', () => {
  const state = { tab: 'moves', q: '電', type: 'electric', cls: 'special', gen: '4', sort: 'power', open: 'thunderbolt' };
  assert.deepEqual(readCatalogState(catalogStateToSearch(state)), state);
  assert.equal(catalogStateToSearch(DEFAULT_CATALOG_STATE), '');
  assert.equal(catalogStateToSearch({ ...state, tab: 'abilities', sort: 'count' }), '?tab=abilities&q=%E9%9B%BB&gen=4&sort=count&open=thunderbolt');
  assert.deepEqual(readCatalogState('?tab=x&type=laser&cls=magic&gen=12&sort=count&open=Bad Slug'),
    { ...DEFAULT_CATALOG_STATE });
  assert.equal(readCatalogState('?tab=abilities&sort=count').sort, 'count');
});
