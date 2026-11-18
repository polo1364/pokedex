import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { legendsZaGuide as za } from '../src/data/versionGuides/gen9-legends-za.js';
import { megaDimensionExpansion as dlc } from '../src/data/versionGuides/gen9-legends-za-mega-dimension.js';
const facts = JSON.parse(await readFile(new URL('../output/guide-review/missing-guides/za-sources.json', import.meta.url), 'utf8'));
const battle = (data, name) => data.gyms.find(b => b.name === name);
const roster = b => b.party.map(p => `${p.name}:${p.level}`);

test('Z-A contains all 42 mission routes and every DLC core mission, in the shared renderer schema', () => {
  assert.equal(za.id, 'legends-za');
  assert.equal(za.status, 'complete');
  assert.ok(!za.gymSectionTitle.includes('道館'));
  assert.equal(za.expansions[0], dlc);
  assert.deepEqual(za.sections.filter(s => s.type === 'island').map(s => s.number), Array.from({length:42}, (_, i) => i + 1));
  assert.deepEqual(dlc.sections.filter(s => s.type === 'island' && s.number <= 14).map(s => s.number), Array.from({length:14}, (_, i) => i + 1));
  for (const guide of [za, dlc]) {
    assert.ok(guide.sources.length >= 3);
    assert.ok(guide.gyms.length >= 15);
    assert.equal(new Set(guide.gyms.map(b => b.order)).size, guide.gyms.length);
    for (const s of guide.sections.filter(s => s.type === 'island')) {
      assert.ok(s.flows.length >= 2, s.title);
      assert.ok(s.tips.length, s.title);
    }
    for (const b of guide.gyms) {
      assert.ok(b.party.length >= 1 && b.party.length <= 6, b.name);
      assert.ok(b.notes && b.recommendedTeams.length, b.name);
      for (const p of b.party) assert.ok(p.types.length >= 1 && p.types.length <= 2);
    }
  }
});

test('promotion opponents have full source rosters, not only the Mega ace', () => {
  assert.deepEqual(roster(battle(za, 'Vinnie｜F級升階')), ['黑魯加:30','巨牙鯊:30','捲捲耳:30','超級老翁龍:32']);
  assert.deepEqual(roster(battle(za, 'Canari｜E級升階')), ['光電傘蜥:37','電龍:38','泥巴魚:38','超級麻麻鰻魚王:39']);
  assert.deepEqual(roster(battle(za, 'Jacinthe｜B級升階決賽')), ['小碎鑽:57','大嘴娃:58','冰雪巨龍:58','沙奈朵:58','超級皮可西:59']);
  assert.deepEqual(roster(battle(za, 'Grisham｜A級升階')), ['流氓熊貓:61','烏賊王:61','火炎獅:61','班基拉斯:62','暴飛龍:62','超級噴火龍X:63']);
  assert.deepEqual(battle(za, 'L｜最後的考驗').party.map(p => p.level), [78,78,78,79,79,80]);
  assert.equal(battle(za, 'Canari｜SBC大賽').party[0].level,53);
});

test('rival branches retain both unchosen starters and have six Pokémon', () => {
  const beforeTower = battle(za, 'Urbain／Taunie｜稜鏡塔前');
  const fifteenth = battle(za, 'Urbain／Taunie｜第15場獎勵戰');
  assert.deepEqual(beforeTower.variants.map(v => v.label), ['選暖暖豬','選菊草葉','選小鋸鱷']);
  assert.deepEqual(beforeTower.variants.map(v => v.party.at(-1).name), ['超級大力鱷','超級炎武王','超級大竺葵']);
  for (const v of beforeTower.variants) {
    assert.equal(v.party.length,6);
    assert.deepEqual(v.party.map(p => p.level), [62,62,62,63,63,64]);
  }
  for (const v of fifteenth.variants) {
    assert.equal(v.party.length,6);
    assert.equal(v.party.at(-1).name,'超級花葉蒂');
    assert.equal(v.party.at(-1).level,72);
    assert.ok(!v.party.some(p => p.name === '冰岩怪'));
  }
});

test('new Mega forms use independently checked source types', () => {
  const all = [...za.gyms, ...dlc.gyms].flatMap(b => [...b.party, ...(b.variants || []).flatMap(v => v.party)]);
  for (const [name, types] of Object.entries(facts.verifiedFacts.megaTypes)) {
    const entries = all.filter(p => p.name === name);
    assert.ok(entries.length,name);
    for (const p of entries) assert.deepEqual(p.types,types,name);
  }
  assert.match(battle(za,'暴走超級龜足巨鎧').notes,/草僅兩倍/);
  assert.match(battle(dlc,'暴走超級阿勃梭魯Z').notes,/僅弱妖精/);
});

test('DLC full fixed rosters and boss levels separate temporary vs captured levels', () => {
  assert.deepEqual(roster(battle(dlc,'可爾妮｜繼承者的考驗')), ['怪力:85','摔角鷹人:85','蔥遊兵:85','超級路卡利歐Z:85']);
  for (const name of ['Lebanne＋Gwynn','Jacinthe＋Griselle','Canari＋Ivor']) assert.equal(battle(dlc,name).party.length,6);
  for (const b of dlc.gyms.filter(b => b.role !== 'trainer')) {
    for (const p of b.party) assert.equal(p.level,undefined,'Do not present a caught level as the hyperspace battle level');
  }
  const text=JSON.stringify(dlc);
  assert.match(text,/離開便失去加成/);
  assert.match(text,/異次元內不給經驗值/);
  assert.match(text,/頭目戰的特殊效果/);
  assert.match(battle(dlc,'固拉多→原始固拉多').notes,/水招無效/);
  assert.match(battle(dlc,'烈空坐→超級烈空坐').notes,/不是四倍/);
});

test('main legendary and DLC story locks are explicit', () => {
  assert.equal(battle(za,'哲爾尼亞斯').party[0].level,75);
  assert.equal(battle(za,'伊裴爾塔爾').party[0].level,75);
  assert.equal(battle(za,'基格爾德｜10%→50%→完全體').party[0].level,84);
  assert.match(JSON.stringify(za.sections.find(s => s.number===40)),/第一|首場/);
  const twelve=JSON.stringify(dlc.sections.find(s=>s.number===12));
  assert.match(twelve,/任務13、14/);
  assert.match(twelve,/100,000/);
  assert.match(JSON.stringify(dlc),/999個超級碎片/);
  assert.match(JSON.stringify(dlc),/25,000點/);
});

test('sources cover every mission and retain known uncertainty', () => {
  assert.equal(facts.missionSources.main.length,42);
  assert.equal(facts.missionSources.dlc.length,14);
  assert.ok(facts.knownLimitations.some(x=>x.includes('runtime')));
  for (const m of [...facts.missionSources.main,...facts.missionSources.dlc]) assert.match(m.url,/https:\/\/www\.serebii\.net\/legendsz-a\//);
});
