import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getVersionGuide } from '../src/data/versionGuides/index.js';
import { resolveMoveType } from '../src/data/moveTypes.js';

// Independent roster snapshots extracted from pret trainer data, with source hashes.
const fixture = JSON.parse(readFileSync(new URL('fixtures/kanto-parties.json', import.meta.url), 'utf8'));
const versions = Object.keys(fixture.versions);

for (const version of versions) {
  const guide = getVersionGuide(version);
  test(`${version}: all first-challenge gym and Elite Four parties match source order and levels`, () => {
    assert.equal(guide.gyms.length, 8);
    assert.equal(guide.eliteFour.length, 4);
    for (const battle of [...guide.gyms, ...guide.eliteFour]) {
      assert.deepEqual(battle.party, fixture.versions[version].battles[battle.name], battle.name);
    }
  });

  test(`${version}: all champion branches have their own six-member roster and matching tactics`, () => {
    const variants = guide.league.battles.champion.variants;
    assert.equal(variants.length, 3);
    for (const variant of variants) {
      assert.deepEqual(variant.party, fixture.versions[version].champion[variant.id], variant.id);
      assert.deepEqual(variant.matchups.map(row => row.opponent), variant.party.map(p => p.name), variant.id);
    }
    assert.deepEqual(guide.champion.party, variants[0].party);
  });

  test(`${version}: gym alternatives include acquisition and usable moves, preserving atlas IDs`, () => {
    assert.deepEqual(guide.gyms.map(g => g.order), [1, 2, 3, 4, 5, 6, 7, 8]);
    for (const gym of guide.gyms) {
      assert.match(gym.strategy.level, /^\d+～\d+$/);
      assert.ok(gym.strategy.summary && gym.strategy.tips.length);
      const candidates = gym.recommendedTeams.flatMap(team => team.pokemon);
      assert.ok(candidates.length >= 1 && candidates.length <= 3, gym.name);
      for (const candidate of candidates) {
        assert.ok(candidate.obtain && candidate.moveNote, `${gym.name}/${candidate.name}`);
      }
    }
    assert.equal(guide.league.recommendedTeams[0].pokemon.length, 6);
    for (const set of guide.league.moveSets) {
      assert.ok(set.moves.length <= 4, set.pokemon);
      assert.equal(new Set(set.moves.map(m => m.name)).size, set.moves.length);
      for (const move of set.moves) assert.ok(resolveMoveType(move), `${version}/${set.pokemon}/${move.name}`);
    }
  });
}

test('early-game recommendations respect original, Yellow and remake acquisition differences', () => {
  const candidates = (id, name) => getVersionGuide(id).gyms.find(g => g.name === name).recommendedTeams.flatMap(t => t.pokemon);
  assert.deepEqual(candidates('red-blue', '小剛').map(p => p.name), ['妙蛙種子', '傑尼龜', '巴大蝶']);
  assert.match(candidates('yellow', '小剛').find(p => p.name === '猴怪').obtain, /22/);
  assert.match(candidates('firered-leafgreen', '小剛').find(p => p.name === '猴怪').moveNote, /Lv\.6/);
  assert.deepEqual(candidates('red-blue', '小剛').find(p => p.name === '巴大蝶').types, ['bug', 'flying']);
  assert.match(candidates('yellow', '阿桔').find(p => p.name === '勇基拉').obtain, /5／6/);
  assert.match(candidates('red-blue', '阿桔').find(p => p.name === '勇基拉').obtain, /24／25/);
  for (const id of versions) assert.deepEqual(candidates(id, '馬志士').map(p => p.name), ['地鼠']);
});

test('Yellow Giovanni and FRLG Giovanni use their actual final species', () => {
  assert.equal(getVersionGuide('yellow').gyms.at(-1).party.at(-1).name, '鑽角犀獸');
  assert.equal(getVersionGuide('firered-leafgreen').gyms.at(-1).party.at(-1).name, '獨角犀牛');
  for (const variant of getVersionGuide('yellow').league.battles.champion.variants) {
    for (const p of variant.party.filter(p => p.name === '三合一磁怪')) assert.deepEqual(p.types, ['electric']);
  }
});

test('league moves and strategies do not leak generation-one mechanics into FRLG', () => {
  const original = getVersionGuide('red-blue').league;
  const yellow = getVersionGuide('yellow').league;
  const remake = getVersionGuide('firered-leafgreen').league;
  const moves = (league, name) => league.moveSets.find(set => set.pokemon === name).moves;
  assert.match(moves(original, '雷伊布').find(m => m.name === '十萬伏特').use, /馬志士/);
  assert.match(moves(remake, '雷伊布').find(m => m.name === '十萬伏特').use, /遊戲城/);
  assert.equal(moves(yellow, '皮卡丘').find(m => m.name === '十萬伏特').source, 'level');
  assert.ok(!yellow.moveSets.some(set => set.pokemon === '雷伊布'));
  assert.ok(!yellow.battleOrder.some(row => JSON.stringify(row).includes('雷伊布')));
  for (const league of [original, yellow, remake]) {
    assert.ok(!moves(league, '引夢貘人').some(m => m.name === '自己再生'));
    assert.ok(!league.items.some(item => item.name.includes('復活草')));
  }
  assert.equal(moves(original, '三地鼠').find(m => m.name === '岩崩').sourceDetail, 'TM48');
  assert.equal(moves(remake, '三地鼠').find(m => m.name === '岩崩').source, 'tutor');
  assert.ok(moves(remake, '卡比獸').some(m => m.name === '暗影球' && m.sourceDetail === 'TM30'));
  for (const row of remake.battles['eliteFour:3'].matchups.filter(row => /耿鬼|鬼斯通/.test(row.opponent))) {
    assert.doesNotMatch(row.counters, /三地鼠|地震|挖洞/);
  }
});

test('Earthquake TM acquisition follows each game script, not shared league prose', () => {
  // pokered / pokeyellow: data/maps/objects/SilphCo10F.asm; ViridianGym awards Fissure.
  for (const id of ['red-blue', 'yellow']) {
    const snorlax = getVersionGuide(id).league.moveSets.find(set => set.pokemon === '卡比獸');
    const earthquake = snorlax.moves.find(move => move.name === '地震');
    assert.equal(earthquake.sourceDetail, 'TM26');
    assert.match(earthquake.use, /西爾佛公司 10F/);
    assert.doesNotMatch(earthquake.use, /坂木贈送/);
    assert.match(snorlax.note, /TM27 地裂/);
  }
  // pokefirered: data/maps/ViridianCity_Gym/scripts.inc.
  const remake = getVersionGuide('firered-leafgreen').league.moveSets.find(set => set.pokemon === '卡比獸');
  assert.match(remake.moves.find(move => move.name === '地震').use, /坂木贈送/);
});

test('Lapras gift level stays version-specific in both gym and inherited league recommendations', () => {
  // SilphCo7F.asm gives Lv.15; pokefirered SilphCo_7F/scripts.inc gives Lv.25.
  for (const [id, level] of [['red-blue', 15], ['yellow', 15], ['firered-leafgreen', 25]]) {
    const guide = getVersionGuide(id);
    const candidates = [
      ...guide.gyms.flatMap(gym => gym.recommendedTeams.flatMap(team => team.pokemon)),
      ...guide.league.recommendedTeams.flatMap(team => team.pokemon),
    ].filter(pokemon => pokemon.name === '拉普拉斯');
    assert.equal(candidates.length, 3);
    for (const pokemon of candidates) assert.match(pokemon.obtain, new RegExp(`Lv\\.${level}(?!\\d)`), id);
  }
  assert.match(getVersionGuide('firered-leafgreen').league.moveSets.find(set => set.pokemon === '拉普拉斯').note, /Lv\.25/);
});

test('gym threat descriptions use actual trainer moves rather than species learnsets', () => {
  // pret data/trainers/special_moves.asm overrides the usual level-up moves.
  const gym = (version, name) => getVersionGuide(version).gyms.find(gym => gym.name === name);
  assert.match(gym('red-blue', '馬志士').strategy.tips.join(' '), /霹靂電球的音爆.*20/);
  assert.match(gym('yellow', '馬志士').strategy.tips.join(' '), /百萬噸重拳.*百萬噸重踢/);
  assert.match(gym('yellow', '阿桔').strategy.tips.join(' '), /影子分身、劇毒與精神強念/);
  assert.doesNotMatch(gym('yellow', '阿桔').strategy.tips.join(' '), /留意催眠/);
  assert.match(gym('yellow', '坂木').strategy.tips.join(' '), /尼多王與尼多后都帶打雷/);
  assert.match(getVersionGuide('yellow').league.battles['eliteFour:4'].tips.join(' '), /哈克龍帶十萬伏特.*快龍帶打雷/);
  assert.doesNotMatch(getVersionGuide('red-blue').league.battles['eliteFour:4'].tips.join(' '), /快龍帶打雷/);
});

test('Yellow champion conditions distinguish the lab result from the optional Route 22 battle', () => {
  // pokeyellow/scripts/OaksLab.asm initializes Vaporeon/Flareon;
  // scripts/Route22.asm only upgrades Flareon to Jolteon on a win.
  const variants = getVersionGuide('yellow').league.battles.champion.variants;
  assert.match(variants.find(v => v.id === 'jolteon').tips[0], /研究所首戰獲勝.*22 號道路.*也獲勝/);
  assert.match(variants.find(v => v.id === 'flareon').tips[0], /研究所首戰獲勝.*落敗或跳過/);
  assert.match(variants.find(v => v.id === 'vaporeon').tips[0], /研究所首戰落敗.*不論.*勝敗/);
});
