import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { blackWhiteGuide } from '../src/data/versionGuides/gen5-black-white.js';
import { black2White2Guide } from '../src/data/versionGuides/gen5-black-2-white-2.js';
import { xyGuide } from '../src/data/versionGuides/gen6-x-y.js';
import { omegaRubyAlphaSapphireGuide } from '../src/data/versionGuides/gen6-omega-ruby-alpha-sapphire.js';
import { battleFrontierExpansion } from '../src/data/versionGuides/gen3-emerald-battle-frontier.js';

// Expectations were parsed independently from the cited trainer tables, not the guides.
const fixture = JSON.parse(readFileSync(new URL('./fixtures/gen5-6-frontier-parties.json', import.meta.url), 'utf8'));
const guides = [blackWhiteGuide, black2White2Guide, xyGuide, omegaRubyAlphaSapphireGuide];
const roster = party => party.map(p => `${p.name}:${p.level}`).sort();

for (const guide of guides) {
  test(`${guide.id}: all 13 gym, Elite Four and champion parties match external trainer tables`, () => {
    const battles = [...guide.gyms, ...guide.eliteFour, guide.champion];
    const expected = fixture.trainerParties.filter(row => row.version === guide.id);
    assert.equal(expected.length, 13);
    assert.equal(battles.length, 13);
    for (const row of expected) {
      const battle = battles.find(b => b.name === row.battle);
      assert.ok(battle, row.battle);
      assert.deepEqual(roster(battle.party), roster(row.expected), row.battle);
    }
  });
}

test('Emerald Frontier fixed parties retain original types and share level-50 mode for both symbols', () => {
  assert.equal(fixture.frontierParties.length, 12);
  for (const row of fixture.frontierParties) {
    const battle = battleFrontierExpansion.gyms.find(b => b.name === row.battle);
    assert.deepEqual(battle.party, row.expected, row.battle);
    assert.match(battle.notes, /等級 50 模式/);
    assert.match(battle.notes, /最低 Lv60/);
  }
});

test('Emerald Factory has random opponents with mode-specific levels, preserving every facility section', () => {
  assert.equal(battleFrontierExpansion.gyms.length, 14);
  assert.equal(battleFrontierExpansion.sections.length, 13);
  const factory = battleFrontierExpansion.gyms.filter(b => b.location === '對戰工廠');
  assert.equal(factory.length, 2);
  for (const battle of factory) {
    assert.equal(battle.party.length, 1);
    assert.deepEqual(battle.party[0].types, []);
    assert.equal(battle.party[0].level, undefined);
    assert.match(battle.notes, /Lv50/);
    assert.match(battle.notes, /Lv100/);
  }
  const sections = JSON.stringify(battleFrontierExpansion.sections);
  assert.match(sections, /16 人錦標賽/);
  assert.match(sections, /合計 14 房/);
  assert.match(sections, /連戰 7 場/);
  assert.match(sections, /Lv50 學彗星拳後再進化/);
});
