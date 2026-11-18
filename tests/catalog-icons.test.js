import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getItemIcon, getMachineIcon, renderCatalogIcon } from '../src/utils/catalogIcons.js';
import { buildMachineEntry } from '../src/utils/machines.js';
import { parseGenerationNumber, getItemGenerations } from '../src/utils/items.js';

test('all Roman generation indices, including IV through VIII, can place image-only item records', () => {
  ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'].forEach((roman, index) => {
    assert.equal(parseGenerationNumber(`generation-${roman}`), index + 1);
    assert.deepEqual(getItemGenerations({ game_indices: [{ generation: { name: `generation-${roman}` } }] }), [index + 1]);
  });
});

test('early standard items retain the correct item image, while distinct historical berries do not borrow successor images', () => {
  assert.match(getItemIcon({ slug: 'master-ball', currentGen: 1 }), /\/master-ball\.png$/);
  assert.match(getItemIcon({ slug: 'sitrus-berry', currentGen: 3 }), /\/sitrus-berry\.png$/);
  assert.equal(getItemIcon({ slug: 'sitrus-berry', currentGen: 2, historicalName: 'GOLD BERRY' }), '');
  assert.equal(getItemIcon({ slug: 'unverified-image' }), '');
});

test('new item images use verified generation folders or a verified supplemental image', () => {
  assert.match(getItemIcon({ slug: 'ability-shield' }), /\/gen9\/ability-shield\.png$/);
  assert.equal(getItemIcon({ slug: 'ability-patch' }), './catalog-icons/items/ability-patch.png');
  assert.equal(getItemIcon({ slug: 'auspicious-armor' }), './catalog-icons/items/auspicious-armor.png');
});

test('TM01 icon follows each version move type, ignoring the single static icon on the item API', () => {
  const item = { sprites: { default: 'https://example.com/tm-normal.png' } };
  const normal = buildMachineEntry(item, 'tm01', 9, { version_group: { name: 'scarlet-violet' } }, { name: 'take-down', type: { name: 'normal' } });
  const fighting = buildMachineEntry(item, 'tm01', 8, { version_group: { name: 'brilliant-diamond-shining-pearl' } }, { name: 'focus-punch', type: { name: 'fighting' } });
  assert.equal(getMachineIcon(normal), './catalog-icons/machines/tm-normal.png');
  assert.equal(getMachineIcon(fighting), './catalog-icons/machines/tm-fighting.png');
  assert.notEqual(getMachineIcon(normal), getMachineIcon(fighting));
});

test('TR has its own numbered source image; unsupported kinds and types never guess an image', () => {
  assert.equal(getMachineIcon({ kind: 'TR', number: 0 }), './catalog-icons/machines/tr00.png');
  assert.equal(getMachineIcon({ kind: 'TR', number: 99 }), './catalog-icons/machines/tr99.png');
  assert.equal(getMachineIcon({ kind: 'TR', number: 100 }), '');
  assert.equal(getMachineIcon({ kind: 'TM', type: 'unknown' }), '');
  assert.equal(getMachineIcon({ kind: 'HM', type: 'flying' }), './catalog-icons/machines/hm-flying.png');
});

test('missing image states are explicit and accessible, and names are escaped', () => {
  assert.match(renderCatalogIcon('', 'GOLD BERRY', { historical: true }), /舊版缺圖/);
  assert.match(renderCatalogIcon('', 'unknown'), /暫無圖示/);
  const html = renderCatalogIcon('/item.png', '<bad>');
  assert.ok(html.includes('&lt;bad&gt;圖示'));
  assert.ok(!html.includes('<bad>'));
});

test('every supplemental item and all 100 TRs are valid source-tracked local PNGs', () => {
  const root = new URL('../public/catalog-icons/', import.meta.url);
  const sources = JSON.parse(readFileSync(new URL('SOURCES.json', root)));
  assert.equal(sources.files.length, 392);
  for (const entry of sources.files) {
    assert.ok(entry.page?.startsWith('https://'));
    const raw = readFileSync(new URL(entry.path, root));
    assert.equal(raw.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', entry.path);
    assert.equal(createHash('sha256').update(raw).digest('hex'), entry.sha256, entry.path);
  }
  for (let number = 0; number < 100; number++) {
    assert.ok(existsSync(new URL(`machines/tr${String(number).padStart(2, '0')}.png`, root)));
  }
});
