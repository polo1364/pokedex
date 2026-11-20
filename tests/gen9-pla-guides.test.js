import test from 'node:test';
import assert from 'node:assert/strict';
import { scarletVioletGuide as sv } from '../src/data/versionGuides/gen9-scarlet-violet.js';
import { legendsArceusGuide as pla } from '../src/data/versionGuides/gen8-legends-arceus.js';

const roster = battle => battle.party.map(p => `${p.name}:${p.level}`);
const daybreak = pla.expansions.find(e => e.id === 'daybreak');
const requests = pla.expansions.flatMap(e => e.sections || []).filter(s => s.type === 'request');
const fields = number => Object.fromEntries(requests.find(r => r.number === number).rows.map(r => [r.label, r.value]));
function strings(value) {
  if (typeof value === 'string') return [value];
  if (!value || typeof value !== 'object') return [];
  return Object.values(value).flatMap(strings);
}

test('Paldea gym aces preserve original types separately from their Tera types', () => {
  assert.deepEqual(sv.gyms.map(g => g.party.length), [3, 3, 4, 3, 3, 4, 4, 4]);
  assert.deepEqual(sv.gyms.map(g => [g.party.at(-1).name, g.party.at(-1).level, g.party.at(-1).teraType]), [
    ['熊寶寶', 15, 'bug'], ['樹才怪', 17, 'grass'], ['夢妖魔', 24, 'electric'],
    ['好勝毛蟹', 30, 'water'], ['姆克鷹', 36, 'normal'], ['顫弦蠑螈', 42, 'ghost'],
    ['花潔夫人', 45, 'psychic'], ['七夕青鳥', 48, 'ice'],
  ]);
  assert.deepEqual(sv.gyms[2].party.at(-1).types, ['ghost']);
  assert.deepEqual(sv.gyms[7].party.at(-1).types, ['dragon', 'flying']);
  assert.match(sv.gyms[7].notes, /電招不會效果絕佳/);
});

test('Levitate and Water Absorb remain explicit exceptions to type-only advice', () => {
  assert.match(sv.gyms[2].strategy.summary, /飄浮.*地面招無效/);
  const rika = sv.eliteFour[0];
  assert.deepEqual(roster(rika), ['鯰魚王:57', '噴火駝:57', '頓甲:57', '三地鼠:57', '土王:58']);
  assert.equal(rika.party.at(-1).teraType, 'ground');
  assert.match(rika.notes, /儲水.*水招.*無效/);
  assert.match(sv.eliteFour[1].notes, /青銅鐘飄浮.*免疫.*地面招/);
  assert.deepEqual(sv.gyms[3].party.find(p => p.name === '三海地鼠').types, ['water']);
});

test('Paldea final battles retain their actual parties and defensive Tera changes', () => {
  assert.deepEqual(roster(sv.eliteFour[3]), ['音波龍:60', '雙斧戰龍:60', '毒藻龍:60', '蘋裹龍:60', '戟脊龍:61']);
  assert.equal(sv.eliteFour[3].party.at(-1).teraType, 'dragon');
  assert.match(sv.eliteFour[3].notes, /格鬥鋼等倍/);
  assert.match(sv.eliteFour[3].notes, /熱交換.*燒傷/);
  assert.equal(sv.champion.specialty, 'mixed');
  assert.deepEqual(roster(sv.champion), ['超能豔鴕:61', '坐騎山羊:61', '輕身鱈:61', '冰岩怪:61', '仆斬將軍:61', '晶光花:62']);
  assert.deepEqual(sv.champion.party.find(p => p.name === '冰岩怪').types, ['ice']);
  assert.equal(sv.champion.party.at(-1).teraType, 'rock');
});

test('Hisui nobles and the Volo sequence use original levels and form order', () => {
  assert.deepEqual(pla.nobles.map(n => n.party[0].level), [18, 30, 36, 46, 56]);
  assert.deepEqual(roster(pla.eliteFour[0]), ['花岩怪:68', '羅絲雷朵:68', '波克基斯:68', '風速狗:68', '路卡利歐:68', '烈咬陸鯊:68']);
  assert.match(pla.eliteFour[0].notes, /沒有自由休整/);
  assert.match(pla.eliteFour[1].name, /別種/);
  assert.match(pla.eliteFour[2].name, /起源/);
  assert.deepEqual(pla.eliteFour.slice(1).map(b => b.party[0].level), [70, 70]);
});

test('Arceus encounter is a balm challenge and excludes optional Mythicals from prerequisites', () => {
  assert.equal(pla.champion.party[0].level, 75);
  for (const name of ['霏歐納', '瑪納霏', '謝米', '達克萊伊']) assert.ok(pla.champion.notes.includes(name));
  assert.match(pla.champion.notes, /不列入先決清單/);
  assert.match(pla.champion.notes, /鎮寶.*獲贈/);
  assert.match(pla.champion.recommendedTeams[0].reason, /不是削血後丟球捕捉/);
});

test('all 122 requests remain present and Sea Legend requires Buizel rather than Floatzel', () => {
  assert.deepEqual(requests.map(r => r.number), Array.from({ length: 122 }, (_, i) => i + 1));
  assert.equal(fields(66)['必備寶可夢'], '泳圈鼬、小球飛魚、萬針魚');
  assert.match(fields(66)['解法'], /傍晚.*拱門/);
  assert.match(fields(66)['詳細流程1'], /泳圈鼬不能換成浮潛鼬/);
});

test('Daybreak 106 and 107 restrict the player to an Origin legendary, with Eeveelution opponents', () => {
  for (const [number, name, item, enemies] of [
    [106, '帝牙盧卡', '大金剛寶玉', ['葉伊布:65', '月亮伊布:34', '水伊布:34']],
    [107, '帕路奇亞', '大白寶玉', ['冰伊布:65', '太陽伊布:34', '火伊布:34']],
  ]) {
    const request = fields(number);
    assert.equal(request['條件'], '完成102');
    assert.equal(request['己方限制'], `只帶起源形態${name}一隻`);
    assert.ok(request['解法'].includes(item));
    const battle = daybreak.gyms[number - 105];
    assert.deepEqual(roster(battle), enemies);
    assert.deepEqual(battle.recommendedTeams[0].pokemon.map(p => p.name), [`${name}（起源形態）`]);
  }
});

test('guide text does not expose correction instructions or internal data field names', () => {
  for (const text of [...strings(sv), ...strings(pla)]) {
    assert.doesNotMatch(text, /specialty|\bparty\b|\btypes\b|fixture|onlyOrigin|刪拖拖蚓|欄位/, text);
  }
});
