import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getVersionGuide, getLeagueOpponents, resolveBattle } from '../src/data/versionGuides/index.js';
import { resolveMoveType } from '../src/data/moveTypes.js';

// Extracted from archived source tables independently of application party literals.
const fixture = JSON.parse(readFileSync(new URL('./fixtures/generations-2-4-parties.json', import.meta.url), 'utf8'));
for (const [version, expected] of Object.entries(fixture)) {
  const guide = getVersionGuide(version);
  test(`${version}: all 13 first-challenge parties match independent source tables`, () => {
    assert.deepEqual(guide.gyms.map(g => g.party), expected.gyms);
    assert.deepEqual([...guide.eliteFour, guide.champion].map(g => g.party), expected.league);
    assert.deepEqual(guide.gyms.map(g => g.order), [1, 2, 3, 4, 5, 6, 7, 8]);
  });
  test(`${version}: recommendations retain acquisition, moves and all league sections`, () => {
    for (const gym of guide.gyms) {
      assert.ok(gym.strategy.summary && gym.strategy.tips.length);
      assert.match(gym.strategy.level, /^\d+～\d+$/);
      const candidates = gym.recommendedTeams.flatMap(t => t.pokemon);
      assert.ok(candidates.length >= 1 && candidates.length <= 3);
      candidates.forEach(p => assert.ok(p.obtain && p.moveNote, p.name));
    }
    for (const key of ['coverage', 'recommendedTeams', 'battleOrder', 'starterLineups', 'moveSets', 'items', 'pitfalls']) {
      assert.ok(guide.league[key]?.length, key);
    }
    assert.equal(guide.league.recommendedTeams[0].pokemon.length, 6);
    for (const { battle, battleRef } of getLeagueOpponents(guide)) {
      assert.equal(resolveBattle(battleRef, guide), battle);
      assert.deepEqual(guide.league.battles[battleRef].matchups.map(m => m.opponent), battle.party.map(p => p.name));
    }
    for (const set of guide.league.moveSets) {
      assert.ok(set.moves.length <= 4, set.pokemon);
      for (const move of set.moves) assert.ok(resolveMoveType(move), `${version}/${set.pokemon}/${move.name}`);
    }
  });
}

test('Crystal availability and generation-two learnsets stay distinct from HGSS', () => {
  const crystal = getVersionGuide('crystal');
  assert.equal(crystal.league.recommendedTeams[0].pokemon[1].name, '三合一磁怪');
  assert.match(crystal.gyms[2].recommendedTeams[0].pokemon[0].obtain, /凱西/);
  assert.match(getVersionGuide('gold-silver').gyms[2].recommendedTeams[0].pokemon[0].obtain, /催眠貘/);
  assert.equal(crystal.league.moveSets[0].moves[0].name, '打雷');
  assert.match(crystal.league.moveSets[0].moves[0].sourceDetail, /TM25/);
  assert.equal(crystal.league.moveSets.find(s => s.pokemon === '大嘴雀').moves[0].name, '啄鑽');
  assert.match(crystal.league.moveSets.find(s => s.pokemon === '拉普拉斯').moves[0].use, /Lv\.36/);
});

test('Platinum progression and both Hoenn first finales remain version-specific', () => {
  assert.deepEqual(getVersionGuide('platinum').gyms.map(g => g.name), ['瓢太', '菜種', '梅麗莎', '阿李', '吉憲', '東瓜', '小菘', '電次']);
  assert.equal(getVersionGuide('ruby-sapphire').gyms[7].name, '米可利');
  assert.equal(getVersionGuide('ruby-sapphire').champion.name, '大吾');
  assert.equal(getVersionGuide('emerald').gyms[7].name, '亞當');
  assert.equal(getVersionGuide('emerald').champion.name, '米可利');
  const ponyta = id => getVersionGuide(id).gyms[1].recommendedTeams[0].pokemon.find(p => p.name === '小火馬');
  assert.match(ponyta('diamond-pearl').obtain, /211.*西段/);
  assert.match(ponyta('platinum').obtain, /207/);
  for (const id of ['diamond-pearl', 'platinum']) {
    const wall = getVersionGuide(id).league.moveSets.find(s => s.pokemon === '青銅鐘').moves.find(m => m.name === '光牆');
    assert.equal(wall.source, 'tm');
    assert.match(wall.sourceDetail, /TM16/);
  }
});
