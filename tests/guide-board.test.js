import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { typeEra, eraTypes, eraMultiplier, weaknessesFor } from '../src/utils/typeEra.js';
import { createMonResolver, monImageUrl, splitVersionPrefix } from '../src/utils/guideMons.js';
import { GUIDE_VERSIONS, getVersionGuide } from '../src/data/versionGuides/index.js';

const index = JSON.parse(fs.readFileSync(new URL('../public/data/species-index.json', import.meta.url), 'utf8'));
const resolve = createMonResolver(index);

test('type eras follow the generation of the guide', () => {
  assert.equal(typeEra(1), 'gen1');
  assert.equal(typeEra(2), 'gen2');
  assert.equal(typeEra(5), 'gen2');
  assert.equal(typeEra(6), 'modern');
  assert.equal(typeEra(9), 'modern');
  assert.ok(!eraTypes('gen1').includes('dark') && !eraTypes('gen1').includes('steel') && !eraTypes('gen1').includes('fairy'));
  assert.ok(eraTypes('gen2').includes('steel') && !eraTypes('gen2').includes('fairy'));
  assert.equal(eraTypes('modern').length, 18);
});

test('generation 1 quirks: ghost cannot hit psychic, bug and poison hit each other, ice is neutral on fire', () => {
  assert.equal(eraMultiplier('ghost', 'psychic', 'gen1'), 0);
  assert.equal(eraMultiplier('ghost', 'psychic', 'modern'), 2);
  assert.equal(eraMultiplier('bug', 'poison', 'gen1'), 2);
  assert.equal(eraMultiplier('poison', 'bug', 'gen1'), 2);
  assert.equal(eraMultiplier('ice', 'fire', 'gen1'), 1);
  assert.equal(eraMultiplier('ice', 'fire', 'gen2'), 0.5);
});

test('weaknesses are era-accurate', () => {
  // 寶石海星（水／超能力）：第 1 世代只怕電、草、蟲；現行還怕幽靈、惡
  assert.deepEqual(weaknessesFor(['water', 'psychic'], 1), { quad: [], double: ['electric', 'grass', 'bug'] });
  assert.deepEqual(weaknessesFor(['water', 'psychic'], 9).double.sort(), ['bug', 'dark', 'electric', 'ghost', 'grass'].sort());
  // 鋼屬性在第 2–5 世代抵抗幽靈與惡，第 6 世代起不抵抗
  assert.ok(!weaknessesFor(['steel', 'psychic'], 4).double.includes('ghost'));
  assert.ok(weaknessesFor(['steel', 'psychic'], 6).double.includes('ghost'));
  // 龍在第 5 世代以前不怕妖精
  assert.ok(!weaknessesFor(['dragon'], 5).double.includes('fairy'));
  assert.ok(weaknessesFor(['dragon'], 6).double.includes('fairy'));
  // 四倍弱點獨立列出；PokeMMO（世代為 null）沒有妖精屬性
  assert.deepEqual(weaknessesFor(['fire', 'flying'], 3).quad, ['rock']);
  assert.ok(!weaknessesFor(['dragon'], null).double.includes('fairy'));
  assert.deepEqual(weaknessesFor([], 9), { quad: [], double: [] });
});

test('guide Pokémon names resolve to artwork ids', () => {
  assert.deepEqual(resolve('寶石海星'), { id: 121, speciesId: 121 });
  assert.equal(resolve('鯉魚王 → 暴鯉龍').id, 130, 'evolution chains use the final stage');
  assert.equal(resolve('超級噴火龍X').id, 10034);
  assert.equal(resolve('原始蓋歐卡').id, 10077);
  assert.equal(resolve('九尾（阿羅拉）').id, index.forms.find((f) => f.n === 'ninetales-alola').id);
  assert.equal(resolve('阿羅拉臭臭泥').id, index.forms.find((f) => f.n === 'muk-alola').id);
  assert.equal(resolve('鬃岩狼人（黑夜）').speciesId, 745, 'other bracket notes fall back to the species');
  assert.equal(resolve('比雕').id, 18, 'non-official spellings used in guide data are aliased');
  assert.equal(resolve('天星隊車（火）').id, 966);
  assert.equal(resolve('究極奈克洛茲瑪').id, 10157);
  assert.equal(resolve('你的御三家'), null);
  assert.equal(resolve(undefined), null);
  assert.match(monImageUrl(resolve('皮卡丘')), /official-artwork\/25\.png$/);
  assert.equal(monImageUrl(null), '');
});

test('most Pokémon named in the guides get an image', () => {
  const names = new Set();
  const walk = (o) => {
    if (Array.isArray(o)) o.forEach(walk);
    else if (o && typeof o === 'object') {
      if (Array.isArray(o.party)) o.party.forEach((p) => typeof p.name === 'string' && names.add(p.name));
      if (Array.isArray(o.pokemon)) o.pokemon.forEach((p) => typeof p.name === 'string' && names.add(p.name));
      Object.values(o).forEach(walk);
    }
  };
  for (const v of GUIDE_VERSIONS) walk(getVersionGuide(v.id));
  const resolved = [...names].filter((n) => resolve(n));
  assert.ok(resolved.length / names.size >= 0.98, `${resolved.length}/${names.size} resolved`);
});

test('version-exclusive obtain notes split into a tag', () => {
  assert.deepEqual(splitVersionPrefix('紅版：24／25 號道路。'), { tag: '紅版', key: 'red', rest: '24／25 號道路。' });
  assert.deepEqual(splitVersionPrefix('藍版：24／25 號道路。'), { tag: '藍版', key: 'blue', rest: '24／25 號道路。' });
  assert.equal(splitVersionPrefix('常青森林低機率出現。'), null);
  assert.equal(splitVersionPrefix('取得：常青森林'), null);
});
