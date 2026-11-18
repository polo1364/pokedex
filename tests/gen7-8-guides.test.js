import test from 'node:test';
import assert from 'node:assert/strict';
import { sunMoonGuide as sm } from '../src/data/versionGuides/gen7-sun-moon.js';
import { ultraSunUltraMoonGuide as usum } from '../src/data/versionGuides/gen7-ultra-sun-ultra-moon.js';
import { swordShieldGuide as swsh } from '../src/data/versionGuides/gen8-sword-shield.js';
import { brilliantDiamondShiningPearlGuide as bdsp } from '../src/data/versionGuides/gen8-brilliant-diamond-shining-pearl.js';

const gym = (guide, order) => guide.gyms.find(b => b.order === order);
const roster = battle => battle.party.map(p => `${p.name}:${p.level}`);

test('Alola first leagues use the correct version-specific final opponent and Elite Four', () => {
  assert.equal(sm.champion.name, '庫庫伊博士');
  assert.equal(usum.champion.name, '哈烏');
  assert.equal(sm.eliteFour[0].name, '哈拉');
  assert.equal(usum.eliteFour[0].name, '馬睿因');
  assert.deepEqual(roster(usum.eliteFour[0]), ['鑰圈兒:56', '劈斬司令:56', '自爆磁怪:56', '巨金怪:56', '三地鼠（阿羅拉）:57']);
});

test('Alola trials show Totem species, not invented captain trainer parties', () => {
  assert.deepEqual(roster(gym(sm, 3)), ['弱丁魚:20']);
  assert.deepEqual(roster(gym(usum, 3)), ['滴蛛霸:20']);
  assert.deepEqual(roster(gym(sm, 4)), ['焰后蜥:22']);
  assert.deepEqual(roster(gym(usum, 4)), ['嘎啦嘎啦（阿羅拉）:22']);
  assert.deepEqual(roster(gym(sm, 7)), ['鍬農炮蟲:29']);
  assert.deepEqual(roster(gym(usum, 7)), ['托戈德瑪爾:33']);
  assert.deepEqual(gym(sm, 1).variants.map(v => v.party[0].name), ['貓鼬探長', '拉達（阿羅拉）']);
});

test('new Alola trial nodes preserve established map references and actual story ordering', () => {
  assert.deepEqual(sm.gyms.slice(-2).map(b => b.order), [10, 11]);
  assert.deepEqual(usum.gyms.slice(-3).map(b => b.order), [10, 12, 11]);
  assert.deepEqual(roster(gym(sm, 11)), ['杖尾鱗甲龍:45']);
  assert.deepEqual(roster(gym(usum, 10)), ['杖尾鱗甲龍:49']);
  assert.deepEqual(roster(gym(usum, 12)), ['蝶結萌虻:55']);
});

test('Galar version-exclusive gyms and ace levels remain distinct', () => {
  assert.deepEqual(roster(gym(swsh, 1)), ['幼棉棉:19', '白蓬蓬:20']);
  assert.deepEqual(roster(gym(swsh, 2)), ['角金魚:22', '刺梭魚:23', '暴噬龜:24']);
  assert.equal(gym(swsh, 4).variants[0].label, '劍：彩豆');
  assert.equal(gym(swsh, 4).variants[1].label, '盾：歐尼奧');
  assert.equal(gym(swsh, 6).variants[0].party.at(-1).name, '巨炭山');
  assert.equal(gym(swsh, 6).variants[1].party.at(-1).name, '拉普拉斯');
  assert.deepEqual(roster(gym(swsh, 8)), ['龐岩怪:46', '沙漠蜻蜓:47', '沙螺蟒:46', '鋁鋼龍:48']);
});

test('Champion Cup retains the correct sequence while preserving old battle references', () => {
  assert.deepEqual(swsh.eliteFour.map(b => b.order), [2, 1, 4, 5, 6, 3]);
  assert.match(swsh.eliteFour[0].name, /瑪俐/);
  assert.match(swsh.eliteFour[1].name, /赫普/);
  assert.equal(swsh.eliteFour[1].variants.length, 3);
  assert.equal(swsh.eliteFour[4].variants.length, 2);
});

test('Leon and Alola champion branch parties are complete and match starter choices', () => {
  const branches = swsh.league.battles.champion.variants;
  assert.deepEqual(branches.map(b => b.party[4].name), ['閃焰王牌', '千面避役', '轟擂金剛猩']);
  assert.deepEqual(branches.map(b => b.party[3].name), ['蟾蜍王', '踏冰人偶', '超甲狂犀']);
  for (const guide of [sm, usum, swsh]) {
    const variants = guide.league.battles.champion.variants;
    assert.equal(variants.length, 3);
    assert.ok(variants.every(b => b.party.length === 6));
    assert.deepEqual(guide.champion.party, variants[0].party);
  }
});

test('BDSP main story rosters cannot silently become Platinum or rematch rosters', () => {
  assert.deepEqual(roster(gym(bdsp, 1)), ['小拳石:12', '大岩蛇:12', '頭蓋龍:14']);
  assert.deepEqual(roster(gym(bdsp, 3)), ['瑪沙那:27', '豪力:27', '路卡利歐:30']);
  assert.deepEqual(roster(gym(bdsp, 8)), ['雷丘:46', '雙尾怪手:47', '章魚桶:47', '倫琴貓:49']);
  assert.deepEqual(roster(bdsp.eliteFour[2]), ['烈焰馬:58', '大鋼蛇:57', '隨風球:58', '長耳兔:57', '烈焰猴:61']);
  assert.equal(bdsp.champion.party.at(-1).level, 66);
  assert.match(bdsp.league.battles.champion.intro, /抗冰果/);
  assert.match(bdsp.league.battles.champion.intro, /花岩怪弱妖精/);
});

test('guide candidates are concise and only assume the chosen starter', () => {
  for (const guide of [sm, usum, swsh, bdsp]) {
    const references = new Set();
    for (const battle of guide.gyms) {
      assert.ok(!references.has(battle.order));
      references.add(battle.order);
      const candidates = battle.recommendedTeams.flatMap(t => t.pokemon);
      assert.ok(candidates.length >= 2 && candidates.length <= 3);
      assert.ok(candidates.every(p => p.obtain && p.moveNote));
    }
    assert.ok(guide.league.moveSets.every(set => set.moves.length === 4));
  }
  assert.deepEqual(gym(sm, 2).party.at(-1).types, ['fighting']);
  assert.equal(bdsp.league.moveSets.find(s => s.pokemon === '海兔獸').moves[0].sourceDetail, 'TM95；神和鎮劇情');
});
