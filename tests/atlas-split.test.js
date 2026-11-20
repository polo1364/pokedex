import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { buildSplitFiles } from '../scripts/split-atlas-data.mjs';

const root = new URL('../public/atlas/', import.meta.url);
const atlas = JSON.parse(readFileSync(new URL('atlas-data.json', root), 'utf8'));

test('split atlas files are in sync with atlas-data.json', () => {
  const files = buildSplitFiles(atlas);
  for (const [rel, text] of files) {
    const url = new URL(`data/${rel}`, root);
    assert.ok(existsSync(url), `${rel} missing — run node scripts/split-atlas-data.mjs`);
    assert.equal(readFileSync(url, 'utf8'), text, `${rel} is stale — run node scripts/split-atlas-data.mjs`);
  }
  const onDisk = readdirSync(new URL('data/maps/', root));
  assert.equal(onDisk.length, Object.keys(atlas.maps).length, 'no leftover map files');
});

test('the atlas index is small and lists every version and map', () => {
  const index = JSON.parse(readFileSync(new URL('data/index.json', root), 'utf8'));
  assert.ok(JSON.stringify(index).length < 10_000, 'index stays lightweight');
  assert.match(index.dataVersion, /^[0-9a-f]{12}$/);
  assert.deepEqual(index.versionMaps, atlas.versionMaps);
  assert.deepEqual(Object.keys(index.mapTitles).sort(), Object.keys(atlas.maps).sort());
  assert.ok(index.versions.every((v) => v.id && v.title && !('gyms' in v)), 'version entries carry only what the selector needs');
  for (const ids of Object.values(index.versionMaps)) {
    for (const id of ids) assert.ok(index.mapTitles[id], id);
  }
});

test('map terrain images referenced by the atlas exist', () => {
  for (const [id, map] of Object.entries(atlas.maps)) {
    if (map.terrain) assert.ok(existsSync(new URL(map.terrain, root)), `${id}: ${map.terrain}`);
  }
});
