import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { isleOfArmorExpansion as armor } from '../src/data/versionGuides/gen8-sword-shield-isle-of-armor.js';
import { crownTundraExpansion as crown } from '../src/data/versionGuides/gen8-sword-shield-crown-tundra.js';
import { tealMaskExpansion as teal } from '../src/data/versionGuides/gen9-scarlet-violet-teal-mask.js';
import { indigoDiskExpansion as indigo } from '../src/data/versionGuides/gen9-scarlet-violet-indigo-disk.js';
import { scarletVioletStory as story } from '../src/data/versionGuides/gen9-scarlet-violet-story.js';

const types = new Set('normal fire water electric grass ice fighting poison ground flying psychic bug rock ghost dragon dark steel fairy'.split(' '));
const battleNamed = (data, pattern) => (data.gyms || data.battles).find(b => b.name.includes(pattern));
const levels = party => party.map(p => p.level);

test('modern guides have addressable substantial chapters and valid separate battle data', () => {
  for (const data of [armor, crown, teal, indigo, story]) {
    assert.ok(data.sections.length >= 4);
    assert.equal(new Set(data.sections.map(s => s.number)).size, data.sections.length);
    for (const s of data.sections) {
      assert.equal(s.type, 'island');
      assert.ok(s.title && s.intro && s.flows.length >= 1);
    }
    const battles = data.gyms || data.battles;
    assert.equal(new Set(battles.map(b => b.order)).size, battles.length);
    for (const b of battles) {
      assert.ok(b.notes && b.location && b.strategy.summary);
      assert.ok(b.recommendedTeams.length >= 1 && b.recommendedTeams.length <= 2);
      for (const team of [b.party, ...(b.variants || []).map(v => v.party)]) {
        assert.ok(team.length >= 1 && team.length <= 6);
        for (const p of team) {
          assert.ok(p.name && p.level >= 1 && p.level <= 100);
          assert.ok(p.types.length >= 1 && p.types.every(t => types.has(t)));
          if (p.teraType) assert.ok(types.has(p.teraType) || p.teraType === 'stellar');
        }
      }
      for (const r of b.recommendedTeams) {
        assert.ok(r.reason);
        assert.ok(r.pokemon.every(p => p.obtain && p.moveNote && p.types.every(t => types.has(t))));
      }
    }
    assert.ok(data.sources.length >= 2);
    assert.ok(data.sources.every(s => /^https:\/\//.test(s.url) && s.title));
  }
});

test('Isle of Armor preserves both version and Champion progress branches', () => {
  const first = battleNamed(armor, '抵達鎧島');
  assert.equal(first.variants.length, 4);
  assert.deepEqual(first.variants.map(v => levels(v.party)), [[10, 12], [58, 60], [10, 12], [58, 60]]);
  const finale = battleNamed(armor, '武館決賽');
  assert.deepEqual(finale.variants.map(v => levels(v.party)), [[23,24,24,25],[65,66,66,67],[23,24,24,25],[65,66,66,67]]);
  assert.deepEqual(battleNamed(armor, '雙拳塔頂').variants.map(v => levels(v.party)), [[30],[70]]);
  const mustard = battleNamed(armor, '全力最終戰');
  assert.match(mustard.notes, /王族事件.*微寐森林赫普最後戰/);
  assert.match(JSON.stringify(armor.prerequisites), /王族事件.*微寐森林赫普最後戰/);
  assert.match(JSON.stringify(armor.sections), /王族事件.*微寐森林赫普最後戰/);
  assert.deepEqual(levels(mustard.party), [73,73,75,74,75,75]);
  assert.deepEqual(mustard.variants.map(v => v.party.at(-1).types), [['fighting','water'],['fighting','dark']]);
  assert.match(JSON.stringify(battleNamed(armor, '雙拳塔頂')), /Lv12.*燕返/);
  assert.doesNotMatch(JSON.stringify(armor), /TM40燕返/);
});

test('Crown Tundra capture encounters keep fixed levels and independent choices', () => {
  assert.deepEqual(levels(crown.gyms[0].party), [70,70]);
  const calyrex = battleNamed(crown, '蕾冠王');
  assert.deepEqual(calyrex.variants.map(v => v.party[0].types), [['psychic','ice'],['psychic','ghost']]);
  assert.ok(calyrex.variants.every(v => v.party[0].level === 80));
  assert.equal(battleNamed(crown, '凱路迪歐').party[0].level, 65);
  const text = JSON.stringify(crown.sections);
  for (const term of ['100%','幾何雪花','不變之石','極巨大冒險','奈克洛茲瑪','咖哩']) assert.ok(text.includes(term));
});

test('SV parallel story covers five titans, five bases and every finale without gym records', () => {
  assert.equal(story.battles.length, 16);
  assert.equal(story.battles.filter(b => b.name.startsWith('天星隊 ')).length, 5);
  assert.deepEqual(levels(battleNamed(story, '偽龍寶主').party), [56,57]);
  const desert = battleNamed(story, '土震寶主');
  assert.deepEqual(desert.variants.map(v => v.party[0].name), ['雄偉牙','鐵轍跡']);
  assert.equal(battleNamed(story, '克拉韋爾').variants.length, 3);
  assert.equal(battleNamed(story, '妮莫').variants.length, 3);
  const ai = battleNamed(story, 'AI博士');
  assert.deepEqual(ai.variants.map(v => v.party.at(-1).name), ['轟鳴月','鐵武者']);
  assert.ok(ai.variants.every(v => v.party.length === 6));
  assert.deepEqual(battleNamed(story, '防衛程序').variants.map(v => v.party[0].name), ['故勒頓','密勒頓']);
});

test('Teal Mask separates low-level story, postgame story and fixed Bloodmoon levels', () => {
  assert.deepEqual(battleNamed(teal, '抵達翠綠鎮').variants.map(v => levels(v.party)), [[12,12,13],[60,60,60]]);
  for (const name of ['夠讚狗','願增猿','吉雉雞']) {
    assert.deepEqual(battleNamed(teal, name).variants.map(v => levels(v.party)), [[35],[85]]);
  }
  const ogerpon = battleNamed(teal, '四面具連戰');
  assert.deepEqual(ogerpon.variants.map(v => levels(v.party)), [[20,20,20,20],[70,70,70,70]]);
  assert.deepEqual(ogerpon.party.map(p => p.teraType), ['fire','water','rock','grass']);
  assert.ok(ogerpon.variants.every(v => v.party.map(p => p.teraType).join(',') === 'fire,water,rock,grass'));
  assert.match(battleNamed(teal, '旅程最後切磋').notes, /厄鬼椪放在隊伍/);
  assert.equal(battleNamed(teal, '赫月熊').party[0].level, 70);
  assert.deepEqual(levels(battleNamed(teal, '厄鬼椪的選擇').variants[1].party), [71,72,72,71,72,76]);
});

test('Blueberry teams, Stellar phases and epilogue retain source-specific branches', () => {
  assert.equal(indigo.gyms.filter(b => b.name.startsWith('BB四天王')).length, 4);
  for (const b of indigo.gyms.filter(b => b.name.startsWith('BB四天王'))) {
    assert.equal(b.party.length, 6);
    assert.equal(b.party.filter(p => p.teraType).length, 1);
  }
  assert.deepEqual(levels(battleNamed(indigo, '藍莓冠軍').party), [80,80,81,81,81,82]);
  assert.equal(battleNamed(indigo, '藍莓冠軍').party.at(-1).teraType, 'fighting');
  assert.equal(battleNamed(indigo, '星晶失控戰').party[0].level, 85);
  assert.equal(battleNamed(indigo, '桃歹郎').party[0].level, 88);
  const nemona = battleNamed(indigo, '番外：妮莫');
  assert.deepEqual(nemona.variants.map(v => v.party.at(-1).teraType), ['dark','ghost','fighting']);
  assert.deepEqual(nemona.variants.map(v => v.party[3].name), ['美納斯','黑夜魔靈','蝶結萌虻']);
  for (const term of ['幻之桃桃果','神秘禮物','Nintendo Account','不需付費','校園最強大賽']) assert.ok(JSON.stringify(indigo.sections).includes(term));
});

test('source report retains successful retrievals and content hashes', () => {
  const manifest = JSON.parse(fs.readFileSync(new URL('../output/guide-review/missing-guides/modern-sources.json', import.meta.url), 'utf8'));
  assert.ok(manifest.length >= 25);
  assert.ok(manifest.every(s => s.status === 200 && /^[a-f0-9]{64}$/.test(s.sha256)));
  assert.ok(manifest.some(s => s.url.includes('nintendo.com') && s.url.includes('epilogue')));
});
