import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { getGuideMap, getExpansionMap } from '../src/data/versionGuides/guideMaps.js';
import { GUIDE_VERSIONS, getVersionGuide } from '../src/data/versionGuides/index.js';

const root = new URL('../public/atlas/', import.meta.url);
const atlas = JSON.parse(readFileSync(new URL('atlas-data.json', root), 'utf8'));
const place = (map, name) => atlas.maps[map].locations.find(p => p.english === name);

test('every catalog version has a map and all map assets are packaged', () => {
  assert.deepEqual(Object.keys(atlas.versionMaps).sort(), GUIDE_VERSIONS.map(v => v.id).sort());
  assert.ok(atlas.versionMaps.pokemmo);
  for (const [version, maps] of Object.entries(atlas.versionMaps)) {
    assert.equal(getGuideMap(version).atlas, version);
    assert.ok(maps.length);
    for (const id of maps) assert.ok(atlas.maps[id], id);
  }
  for (const map of Object.values(atlas.maps)) {
    if (map.layout === 'connections') {
      assert.ok(!map.terrain);
      assert.ok(map.connections.length);
      for (const pair of map.connections) assert.ok(pair.every(id => map.locations.some(p => p.id === id)));
    } else assert.ok(existsSync(new URL(map.terrain, root)), map.terrain);
    assert.match(map.source, /^https:\/\//);
  }
});

test('anchors are finite, inside their own coordinate system, and uniquely addressable', () => {
  for (const map of Object.values(atlas.maps)) {
    const ids = new Set();
    for (const p of [...map.locations, ...map.routes]) {
      assert.ok(!ids.has(p.id), `${map.id}: duplicate ${p.id}`);
      ids.add(p.id);
      assert.ok(Number.isFinite(p.x) && p.x >= 0 && p.x <= map.width, `${map.id}/${p.id}: x`);
      assert.ok(Number.isFinite(p.y) && p.y >= 0 && p.y <= map.height, `${map.id}/${p.id}: y`);
      for (const [x,y] of p.polygon || []) {
        assert.ok(x >= 0 && x <= map.width && y >= 0 && y <= map.height, `${map.id}/${p.id}: polygon`);
      }
    }
  }
});

test('gym cities remain version scoped, including moved Kanto gym', () => {
  for (const id of ['gold-silver','crystal','heartgold-soulsilver']) {
    assert.equal(atlas.maps[id].locations.filter(p => p.kind === 'gym').length, 8);
    assert.equal(place(`${id}-kanto`, 'Seafoam Islands').leader, '夏伯');
    assert.notEqual(place(`${id}-kanto`, 'Cinnabar Island').kind, 'gym');
  }
  assert.ok(!place('gold-silver', 'Battle Tower'));
  assert.ok(place('crystal', 'Battle Tower'));
  assert.equal(place('emerald','Sootopolis City').leader,'亞當');
  assert.equal(place('omega-ruby-alpha-sapphire','Sootopolis City').leader,'米可利');
});

test('Hoenn regional anchors derive from source section grids and game cursor offsets', () => {
  for (const id of ['ruby-sapphire','emerald']) {
    for (const p of [...atlas.maps[id].locations, ...atlas.maps[id].routes]) {
      const s = p.sourceGrid;
      assert.equal(p.x, (s.x + 1 + s.width / 2) * 8);
      assert.equal(p.y, (s.y + 2 + s.height / 2) * 8);
    }
  }
});

test('source hit-area typos do not move Resort Area or Frost Cavern', () => {
  for (const id of ['diamond-pearl','platinum','brilliant-diamond-shining-pearl']) {
    const resort = place(id,'Resort Area'), twinleaf = place(id,'Twinleaf Town');
    assert.deepEqual([resort.x,resort.y],[174,66]);
    assert.ok(resort.x > twinleaf.x && resort.y < twinleaf.y);
    assert.equal(place(id,'Pastoria City').kind,'gym');
  }
  const frost=place('x-y','Frost Cavern'), town=place('x-y','Dendemille Town');
  assert.deepEqual([frost.x,frost.y],[232,47]);
  assert.ok(frost.y<town.y);
});

test('Unova sequels do not leak gyms and exclusive places into the first games', () => {
  assert.ok(!place('black-white','Aspertia City'));
  assert.ok(!place('black-white','Pokestar Studios'));
  assert.equal(place('black-2-white-2','Aspertia City').kind,'gym');
  assert.notEqual(place('black-2-white-2','Striaton City').kind,'gym');
  assert.ok(place('black-white','Black City / White Forest'));
  assert.ok(!place('black-white','White Forest'));
  assert.deepEqual([place('black-white','Victory Road').x,place('black-white','Victory Road').y],[163,24]);
  assert.notEqual(place('black-white','Victory Road').x,place('black-2-white-2','Victory Road').x);
});

test('Alola trial sites differ between originals and Ultra versions', () => {
  for (const version of ['sun-moon','ultra-sun-ultra-moon']) {
    assert.equal(place(`${version}-ulaula`,'Malie City').leader,'默丹的大考驗');
    for (const id of atlas.versionMaps[version]) assert.ok(!atlas.maps[id].locations.some(p => p.kind === 'gym'));
    assert.equal(atlas.versionMaps[version].flatMap(id => atlas.maps[id].routes).length,17);
    assert.equal(place(`${version}-ulaula`,'Pokemon League').kind,'league');
    assert.notEqual(place(`${version}-ulaula`,'Mount Lanakila').kind,'league');
    assert.equal(place(`${version}-ulaula`,'Hokulani Observatory').gymOrder,7);
  }
  assert.equal(place('sun-moon-poni','Vast Poni Canyon').leader,'哈普烏的大考驗');
  assert.equal(place('ultra-sun-ultra-moon-poni','Exeggutor Island').leader,'哈普烏的大考驗');
  assert.equal(place('ultra-sun-ultra-moon-poni','Seafolk Village').type,'fairy');
});

test('Paldea game-world x/z anchors are not guessed or swapped', () => {
  for (const p of atlas.maps.paldea.locations.filter(p => p.sourceCoords)) {
    assert.equal(p.x,p.sourceCoords[0]);
    assert.equal(p.y,p.sourceCoords[2]);
  }
  assert.equal(place('paldea','Glaseado Gym').type,'ice');
  assert.equal(place('paldea','Team Star Final Battle').leader,'仙后');
});

test('existing expansion pages open the appropriate atlas region', () => {
  assert.deepEqual(getExpansionMap('sevii'), {atlas:'firered-leafgreen',mapId:'sevii'});
  assert.deepEqual(getExpansionMap('battle-frontier'), {atlas:'emerald',mapId:'battle-frontier'});
  assert.equal(atlas.maps['battle-frontier'].locations.length,7);
  assert.equal(atlas.maps['battle-frontier'].routes.length,0);
  assert.equal(getExpansionMap('daybreak').mapId,'hisui-daybreak');
  assert.ok(atlas.maps['hisui-daybreak'].locations.every(p => !p.battleRef));
});

test('every catalog expansion resolves within its parent version', () => {
  for (const version of GUIDE_VERSIONS) {
    for (const expansion of getVersionGuide(version.id).expansions || []) {
      const map = getExpansionMap(expansion.id, version.id);
      if (expansion.mapMode === 'none') {
        assert.equal(map, null, `${version.id}/${expansion.id} is a non-geographic topic`);
        continue;
      }
      assert.ok(map, `${version.id}/${expansion.id}`);
      assert.equal(map.atlas, version.id);
      assert.ok(atlas.versionMaps[version.id].includes(map.mapId));
    }
  }
  assert.equal(getExpansionMap('battle-frontier', 'platinum').mapId, 'platinum-battle-frontier');
  assert.equal(atlas.maps['platinum-battle-frontier'].locations.length, 5);
  assert.equal(getExpansionMap('battle-frontier', 'red-blue'), null);
});

test('focused maps preserve source coordinates and complete source viewports', () => {
  for (const id of ['isle-of-armor', 'crown-tundra', 'battle-zone']) {
    const map = atlas.maps[id], view = map.terrainViewport;
    assert.ok(view.x + map.width <= view.sourceWidth);
    assert.ok(view.y + map.height <= view.sourceHeight);
    for (const p of [...map.locations, ...map.routes]) {
      assert.ok(Math.abs(p.x + view.x - p.parentCoords[0]) < 1e-8);
      assert.ok(Math.abs(p.y + view.y - p.parentCoords[1]) < 1e-8);
    }
  }
  const galar = name => place('galar', name);
  assert.ok(galar('Master Dojo').y > galar('Tower of Darkness').y);
  assert.ok(galar('Crown Shrine').y < galar('Crown Tundra Station').y);
  assert.ok(galar('Crown Tundra Station').x < galar('Freezington').x);
  for (const p of atlas.maps.galar.locations.filter(p => p.transform)) {
    const [x, y] = p.sourceCursor;
    assert.ok(Math.abs(p.x - (p.transform[0][0]*x + p.transform[0][1]*y + p.transform[0][2])) < .01);
    assert.ok(Math.abs(p.y - (p.transform[1][0]*x + p.transform[1][1]*y + p.transform[1][2])) < .01);
  }
});

test('non-geographic worlds and version-exclusive expansion details stay explicit', () => {
  const distortion = atlas.maps['distortion-world'];
  assert.equal(distortion.layout, 'connections');
  assert.ok(!distortion.connections.some(([a, b]) => ['turnback','small','orb'].includes(a) !== ['turnback','small','orb'].includes(b)));
  assert.match(place('ultra-wormhole', 'Ultra Jungle').description, /究極之日限定/);
  assert.match(place('ultra-wormhole', 'Ultra Desert').description, /究極之月限定/);
  const hideout = place('delta-episode', 'Magma / Aqua Hideout');
  assert.equal(hideout.x, place('omega-ruby-alpha-sapphire', 'Aqua Hideout').x);
  assert.ok(!atlas.maps['delta-episode'].locations.some(p => p.gymOrder));
  for (const point of atlas.maps['delta-episode'].locations.filter(p => p.battleRef)) {
    assert.match(point.battleRef, /^expansion:delta-episode:/);
    assert.equal(point.guidePart, 'delta-episode');
  }
});
