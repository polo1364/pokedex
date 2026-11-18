import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  GUIDE_VERSIONS, getVersionGuide, getGuidePartTabs, hasMainGuideContent,
  hasExpansionContent, resolveBattle,
} from '../src/data/versionGuides/index.js';
import { getExpansionMap } from '../src/data/versionGuides/guideMaps.js';

const newParts = [
  ['gold-silver','kanto'], ['crystal','kanto'],
  ['diamond-pearl','battle-zone'], ['platinum','distortion-world'], ['platinum','battle-frontier'],
  ['heartgold-soulsilver','kanto'], ['brilliant-diamond-shining-pearl','battle-zone'],
  ['omega-ruby-alpha-sapphire','delta-episode'], ['ultra-sun-ultra-moon','ultra-wormhole'],
  ['sword-shield','isle-of-armor'], ['sword-shield','crown-tundra'],
  ['scarlet-violet','teal-mask'], ['scarlet-violet','indigo-disk'], ['legends-za','mega-dimension'],
];
const supported = new Set(['island','summary','checklist','teams','faq','conclusion','request']);

test('every catalog version and expansion has actual guide content, not only a complete flag', () => {
  for (const version of GUIDE_VERSIONS) {
    assert.equal(version.status, 'complete', version.id);
    const guide = getVersionGuide(version.id);
    assert.ok(hasMainGuideContent(guide), version.id);
    for (const expansion of guide.expansions || []) {
      assert.ok(hasExpansionContent(expansion), `${version.id}/${expansion.id}`);
    }
    for (const tab of getGuidePartTabs(guide) || []) assert.ok(!tab.isPlaceholder, `${version.id}/${tab.id}`);
  }
});

for (const [version, part] of newParts) {
  test(`${version}/${part}: contains a sourced, navigable walkthrough and valid battle references`, () => {
    const guide = getVersionGuide(version);
    const expansion = guide.expansions?.find(e => e.id === part);
    assert.ok(expansion, part);
    assert.ok(expansion.prerequisites?.length, 'entry requirements');
    assert.ok(expansion.sections?.length >= 3, 'substantive walkthrough');
    assert.ok(expansion.sections.every(s => supported.has(s.type)), 'all section types render');
    const chapters = expansion.sections.filter(s => s.type === 'island');
    assert.equal(new Set(chapters.map(s => s.number)).size, chapters.length, 'unique chapter links');
    assert.ok(expansion.sources?.length && expansion.sources.every(s => /^https:\/\//.test(s.url)), 'traceable sources');
    assert.ok(getExpansionMap(part, version), 'version-scoped map');
    const orders = new Set();
    for (const battle of expansion.gyms || []) {
      assert.ok(!orders.has(battle.order), 'unique battle references');
      orders.add(battle.order);
      assert.equal(resolveBattle(`expansion:${part}:${battle.order}`, guide), battle);
      assert.ok(battle.recommendedTeams?.length, battle.name);
      const parties = battle.variants?.length ? battle.variants.map(v => v.party) : [battle.party];
      for (const party of parties) {
        assert.ok(Array.isArray(party) && party.length <= 6, battle.name);
        for (const pokemon of party) {
          assert.ok(pokemon.name, battle.name);
          // Factory/Hall opponents are drawn at runtime, so no fixed species/type is claimed.
          if (/^隨機寶可夢/.test(pokemon.name)) assert.match(battle.notes, /隨機/);
          else assert.ok(pokemon.types?.length, battle.name);
        }
      }
    }
  });
}

test('Z-A and Mega Dimension cover their entire numbered main mission sequences', () => {
  const za = getVersionGuide('legends-za');
  const base = za.sections.filter(s => s.type === 'island').map(s => s.number);
  for (let i=1; i<=42; i++) assert.ok(base.includes(i), `main mission ${i}`);
  const dlc = za.expansions.find(e => e.id === 'mega-dimension');
  const missions = dlc.sections.filter(s => s.type === 'island').map(s => s.number);
  for (let i=1; i<=14; i++) assert.ok(missions.includes(i), `hyperspace mission ${i}`);
});

test('Paldea parallel paths and final battles do not become extra gym badges or Elite Four members', () => {
  const guide = getVersionGuide('scarlet-violet');
  assert.equal(guide.gyms.length, 8);
  assert.equal(guide.eliteFour.length, 4);
  assert.ok(guide.adventureBattles?.length >= 15);
  assert.ok(guide.sections?.length >= 3);
  for (const battle of guide.adventureBattles) assert.equal(resolveBattle(`adventure:${battle.order}`, guide), battle);
});

test('authored map links resolve to real chapters and battles in their version', () => {
  const atlas = JSON.parse(readFileSync(new URL('../public/atlas/atlas-data.json', import.meta.url), 'utf8'));
  for (const [version, maps] of Object.entries(atlas.versionMaps)) {
    const guide = getVersionGuide(version);
    for (const mapId of maps) {
      for (const point of atlas.maps[mapId].locations) {
        const context = `${version}/${mapId}/${point.id}`;
        if (point.battleRef) assert.ok(resolveBattle(point.battleRef, guide), context);
        if (point.guideSection && (point.guidePart || point.guideSectionPrefix)) {
          const part = point.guidePart ? guide.expansions.find(e => e.id === point.guidePart) : guide;
          assert.ok(part?.sections?.some(s => s.type === 'island' && s.number === point.guideSection), context);
        }
      }
    }
  }
});
