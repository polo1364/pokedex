import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getVersionGuide, getGuidePartTabs, resolveBattle, GUIDE_VERSIONS } from '../src/data/versionGuides/index.js';
import { getGuideMap, getExpansionMap } from '../src/data/versionGuides/guideMaps.js';
import { getGuideContext, getGuideScope } from '../server/guides.js';
import { buildSystemPrompt } from '../server/prompt.js';

const guide = getVersionGuide('pokemmo');
const parts = ['main', 'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'training-economy', 'pvp-endgame'];
const regions = parts.slice(1, 6);
const atlas = JSON.parse(readFileSync(new URL('../public/atlas/atlas-data.json', import.meta.url), 'utf8'));

test('PokeMMO is an independent online game with eight substantive parts', () => {
  assert.equal(GUIDE_VERSIONS.find(v => v.id === 'pokemmo').displayGeneration, null);
  assert.deepEqual(getGuidePartTabs(guide).map(p => p.id), parts);
  assert.ok(getGuidePartTabs(guide).every(p => !p.isPlaceholder));
  for (const part of [guide, ...guide.expansions]) {
    assert.ok(part.sections.length >= 6, part.id);
    assert.equal(new Set(part.sections.map(s => s.number)).size, part.sections.length);
    assert.ok(part.sections.every(s => s.type === 'island' && s.flows.length >= 4 && s.intro));
    assert.ok(part.sources.length >= 3);
    assert.ok(part.sources.every(s => s.url.startsWith('https://') && /^\d{4}-\d{2}-\d{2}$/.test(s.checkedOn)));
  }
});

for (const region of regions) {
  test(`${region}: eight gyms, a first league, and independently scoped story fights`, () => {
    const part = guide.expansions.find(p => p.id === region);
    assert.deepEqual(part.gyms.filter(b => b.role === 'gym').map(b => b.order), [1,2,3,4,5,6,7,8]);
    assert.ok(part.gyms.length >= 15);
    assert.equal(new Set(part.gyms.map(b => b.order)).size, part.gyms.length);
    for (const battle of part.gyms) {
      assert.equal(resolveBattle(`expansion:${region}:${battle.order}`, guide), battle);
      assert.ok(battle.strategy.summary && battle.strategy.tips.length);
      assert.deepEqual(battle.party, [], 'do not invent an unverified cartridge roster');
      assert.match(battle.partyNote, /未核實/);
      assert.ok(battle.recommendedTeams.every(t => t.pokemon.length && t.pokemon.every(p => p.obtain && p.moveNote)));
    }
  });
  test(`${region}: map preserves base geometry and all links resolve into PokeMMO`, () => {
    const map = atlas.maps[getExpansionMap(region, 'pokemmo').mapId];
    const base = atlas.maps[map.sourceMap];
    assert.equal(map.terrain, base.terrain);
    assert.deepEqual([map.width, map.height], [base.width, base.height]);
    const geometry = points => points.map(({ id, x, y, points, polygon, sourceCoords, sourceGrid }) => ({ id, x, y, points, polygon, sourceCoords, sourceGrid }));
    assert.deepEqual(geometry(map.locations), geometry(base.locations));
    assert.deepEqual(geometry(map.routes), geometry(base.routes));
    const part = guide.expansions.find(p => p.id === region);
    const chapterNumbers = new Set();
    const gyms = new Set();
    for (const point of [...map.locations, ...map.routes]) {
      assert.equal(point.gymOrder, undefined);
      for (const link of [point, ...(point.guideLinks || [])]) {
        if (!link.guidePart) continue;
        assert.equal(link.guidePart, region);
        if (link.battleRef) {
          assert.ok(link.battleRef.startsWith(`expansion:${region}:`));
          const battle = resolveBattle(link.battleRef, guide);
          assert.ok(battle, link.battleRef);
          if (battle.role === 'gym') gyms.add(battle.order);
        }
        if (link.guideSection) {
          assert.ok(part.sections.some(s => s.number === link.guideSection));
          chapterNumbers.add(link.guideSection);
        }
      }
    }
    assert.equal(gyms.size, 8);
    assert.equal(chapterNumbers.size, part.sections.length, 'every chapter is reachable from an existing map anchor');
  });
}

test('PokeMMO plot gates include HM acquisition and the correct first-story endings', () => {
  const text = id => JSON.stringify(guide.expansions.find(p => p.id === id));
  assert.match(text('johto'), /42號道路.*領怪力/);
  assert.match(text('johto'), /頑皮雷彈.*取得潮旋/);
  assert.match(text('johto'), /桔梗商店.*領取蛋/);
  assert.match(text('hoenn'), /卡綠隧道.*領怪力/);
  assert.match(text('sinnoh'), /鋼鐵島.*取得怪力/);
  assert.match(text('sinnoh'), /黑金閘口.*取得碎岩/);
  assert.match(text('unova'), /首次.*不打阿戴克|首次流程.*不是阿戴克/);
  assert.match(text('hoenn'), /米可利冠軍流程/);
  assert.match(text('johto'), /鳳王/);
  assert.match(text('sinnoh'), /騎拉帝納/);
});

test('non-geographic topic tabs omit maps while main offers all five regions', () => {
  assert.deepEqual(getGuideMap('pokemmo'), { atlas: 'pokemmo', alt: '分版地區地圖' });
  assert.deepEqual(atlas.versionMaps.pokemmo, regions.map(r => `pokemmo-${r}`));
  for (const id of parts.slice(6)) {
    assert.equal(guide.expansions.find(p => p.id === id).mapMode, 'none');
    assert.equal(getExpansionMap(id, 'pokemmo'), null);
  }
});

test('PokeMMO chat contains full selected flows, acquisition notes, sources and game rules', () => {
  for (const id of parts) {
    const part = id === 'main' ? guide : guide.expansions.find(p => p.id === id);
    const context = getGuideContext('pokemmo', null, id);
    for (const chapter of part.sections) for (const flow of chapter.flows) assert.ok(context.includes(flow));
    for (const battle of part.gyms) for (const team of battle.recommendedTeams) {
      for (const pokemon of team.pokemon) assert.ok(context.includes(pokemon.obtain));
    }
    assert.ok(context.includes(part.sources[0].url));
    const prompt = buildSystemPrompt(context, getGuideScope('pokemmo', id));
    assert.match(prompt, /PokeMMO 攻略助手/);
    assert.doesNotMatch(prompt, /單機版攻略助手|此 DLC/);
  }
  assert.doesNotMatch(getGuideContext('pokemmo', null, 'kanto'), /阿速|小菊兒|騎拉帝納/);
  assert.equal(getGuideContext('pokemmo', 'expansion:johto:1', 'kanto'), null);
  assert.equal(getGuideContext('pokemmo', 'champion', 'kanto'), null);
  assert.equal(getGuideContext('pokemmo', 'expansion:kanto:999', 'kanto'), null);
  assert.equal(getGuideContext('pokemmo', null, 'missing'), null);
  const battleContext = getGuideContext('pokemmo', 'expansion:kanto:1', 'kanto');
  assert.match(battleContext, /小剛/);
  assert.match(battleContext, /未核實/);
  assert.match(buildSystemPrompt('original context', getGuideScope('red-blue')), /單機版攻略助手/);
});

test('official rematch requirements and breeding loss remain explicit', () => {
  const context = getGuideContext('pokemmo', null, 'training-economy');
  assert.match(context, /6小時、道館18小時/);
  assert.match(context, /5名其他有再戰冷卻/);
  assert.match(context, /消耗兩隻親本/);
  assert.match(context, /第四枚徽章/);
});
