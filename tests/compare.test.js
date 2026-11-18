import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_COMPARE, parseCompareIds, toggleCompareId, buildStatRows, defensiveProfile,
} from '../src/utils/compare.js';

const stats = (values) => ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']
  .map((name, i) => ({ stat: { name }, base_stat: values[i] }));

test('compare ids from the URL are positive, unique and capped', () => {
  assert.deepEqual(parseCompareIds('6, 9,abc,6,-1,3,150'), [6, 9, 3]);
  assert.deepEqual(parseCompareIds(''), []);
  assert.deepEqual(parseCompareIds(null), []);
  assert.equal(MAX_COMPARE, 3);
});

test('toggling adds, removes and refuses when full', () => {
  assert.deepEqual(toggleCompareId([], 6), { ids: [6], added: true, full: false });
  assert.deepEqual(toggleCompareId([6, 9], 6), { ids: [9], added: false, full: false });
  assert.deepEqual(toggleCompareId([1, 2, 3], 4), { ids: [1, 2, 3], added: false, full: true });
});

test('stat rows include totals and mark only strictly-highest values', () => {
  const charizard = { stats: stats([78, 84, 78, 109, 85, 100]) };
  const blastoise = { stats: stats([79, 83, 100, 85, 105, 78]) };
  const rows = buildStatRows([charizard, blastoise]);
  const byKey = Object.fromEntries(rows.map((r) => [r.key, r]));
  assert.deepEqual(byKey['special-attack'].values, [109, 85]);
  assert.deepEqual(byKey['special-attack'].best, [true, false]);
  assert.deepEqual(byKey.total.values, [534, 530]);
  assert.deepEqual(byKey.total.best, [true, false]);

  const tie = buildStatRows([charizard, charizard]);
  assert.ok(tie.every((r) => r.best.every((b) => b === false)), 'ties are not highlighted');
  assert.ok(buildStatRows([charizard]).every((r) => r.best[0] === false), 'single Pokémon has no winner');
});

test('defensive profile groups multipliers for dual types', () => {
  const charizard = defensiveProfile(['fire', 'flying']);
  assert.deepEqual(charizard.quad, ['rock']);
  assert.deepEqual(charizard.double.sort(), ['electric', 'water'].sort());
  assert.deepEqual(charizard.immune, ['ground']);
  assert.ok(charizard.quarter.includes('grass') && charizard.quarter.includes('bug'));
  assert.deepEqual(defensiveProfile(['normal', 'ghost']).immune.sort(), ['fighting', 'ghost', 'normal'].sort());
});
