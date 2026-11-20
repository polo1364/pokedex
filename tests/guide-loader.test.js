import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { GUIDE_VERSIONS, GUIDE_VERSION_IDS_WITH_DATA, getVersionGuide } from '../src/data/versionGuides/index.js';
import { loadVersionGuide, LOADABLE_GUIDE_IDS } from '../src/data/versionGuides/guideLoader.js';

test('the lazy loader covers exactly the versions that have guide data', () => {
  assert.deepEqual([...LOADABLE_GUIDE_IDS].sort(), [...GUIDE_VERSION_IDS_WITH_DATA].sort());
});

test('lazily loaded guides are identical to the synchronous registry', async () => {
  for (const { id } of GUIDE_VERSIONS) {
    const lazy = await loadVersionGuide(id);
    assert.deepEqual(lazy, getVersionGuide(id), id);
    assert.equal(await loadVersionGuide(id), lazy, `${id} is cached after the first load`);
  }
  assert.equal(await loadVersionGuide('no-such-version'), null);
});

test('pages that only need the version list do not pull in guide data', () => {
  const read = (file) => readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8');
  for (const file of ['ui/versionDrawer.js', 'ui/guideChat.js', 'ui/versionGuide.js', 'data/versionGuides/guideCore.js', 'main.js']) {
    assert.ok(!/versionGuides\/index\.js|from '\.\/index\.js'/.test(read(file)), `${file} must not import the full guide registry`);
  }
  const core = read('data/versionGuides/guideCore.js');
  assert.deepEqual(core.match(/^import .*$/gm), [
    "import { GUIDE_VERSIONS } from './guideVersions.js';",
    "import { VERSION_DLC_PLACEHOLDERS } from './versionDlc.js';",
  ]);
});
