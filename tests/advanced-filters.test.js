import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { entryFromSummary } from '../src/utils/entrySummary.js';
import {
  EMPTY_ADVANCED, normalizeAdvanced, hasAdvancedFilter, matchesAdvanced, resolveAbility, parseStatBound,
} from '../src/utils/advancedFilters.js';

const index = JSON.parse(fs.readFileSync(new URL('../public/data/species-index.json', import.meta.url), 'utf8'));
const entries = index.entries.map((s) => entryFromSummary(s, 'https://pokeapi.co/api/v2'));
const byId = (id) => entries.find((e) => e.id === id);
const run = (adv) => entries.filter((e) => matchesAdvanced(e, normalizeAdvanced(adv))).map((e) => e.id);

test('index carries abilities (hidden marked) and egg groups with Chinese ability names', () => {
  assert.deepEqual(index.entries[5].a, ['blaze', '*solar-power']);
  assert.deepEqual(index.entries[5].eg, ['monster', 'dragon']);
  assert.equal(index.abilityNames.levitate, '飄浮');
  assert.ok(index.entries.every((e) => Array.isArray(e.a) && e.a.length && Array.isArray(e.eg)));
});

test('normalising clamps, swaps and rejects invalid values', () => {
  assert.deepEqual(normalizeAdvanced({}), { ...EMPTY_ADVANCED });
  assert.deepEqual(normalizeAdvanced({ type2: 'laser', stat: 'luck', min: '700', max: '600', ability: 'Bad Slug', egg: 'pizza' }),
    { type2: 'all', stat: 'total', min: 600, max: 700, ability: '', egg: '' });
  assert.equal(parseStatBound('-5'), 0);
  assert.equal(parseStatBound('1500'), 999);
  assert.equal(parseStatBound(''), null);
  assert.equal(hasAdvancedFilter(normalizeAdvanced({})), false);
  assert.equal(hasAdvancedFilter(normalizeAdvanced({ egg: 'dragon' })), true);
});

test('second type finds dual-type combinations', () => {
  const fireFlying = run({ type2: 'flying' }).filter((id) => byId(id).summary.t.includes('fire'));
  assert.ok(fireFlying.includes(6), 'Charizard is fire/flying');
  assert.ok(!fireFlying.includes(4), 'Charmander is pure fire');
});

test('stat ranges use the chosen stat and are inclusive', () => {
  const fast = run({ stat: 'speed', min: 150 });
  assert.ok(fast.includes(291), 'Ninjask (160 speed)');
  assert.ok(!fast.includes(6));
  const legends = run({ min: 720 });
  assert.ok(legends.includes(493), 'Arceus has exactly 720');
  assert.ok(legends.every((id) => byId(id).summary.s.reduce((a, b) => a + b, 0) >= 720));
  assert.deepEqual(run({ stat: 'hp', min: 255, max: 255 }), [242], 'Blissey has the max HP');
});

test('ability (including hidden) and egg group filters', () => {
  const levitate = run({ ability: 'levitate' });
  assert.ok(levitate.includes(94) === false, 'Gengar no longer has Levitate in Gen 7+ data');
  assert.ok(levitate.includes(92), 'Gastly');
  const solarPower = run({ ability: 'solar-power' });
  assert.ok(solarPower.includes(6), 'hidden ability counts');
  const dragons = run({ egg: 'dragon' });
  assert.ok(dragons.includes(6) && dragons.includes(130));
  const undiscovered = run({ egg: 'undiscovered' });
  assert.ok(undiscovered.includes(150) && undiscovered.includes(172), 'Mewtwo and baby Pichu');
});

test('filters combine', () => {
  assert.deepEqual(run({ type2: 'flying', egg: 'dragon', stat: 'speed', min: 100, max: 100 }), [6, 373], 'Charizard and Salamence');
});

test('ability text resolves from Chinese, slug or English words', () => {
  const names = index.abilityNames;
  assert.equal(resolveAbility('飄浮', names), 'levitate');
  assert.equal(resolveAbility('Solar Power', names), 'solar-power');
  assert.equal(resolveAbility('solar_power', names), 'solar-power');
  assert.equal(resolveAbility('不存在的特性', names), '');
  assert.equal(resolveAbility('made-up', names), '');
  assert.equal(resolveAbility('made-up', {}), 'made-up', 'without a name map any slug is accepted');
});
