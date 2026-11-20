import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getItemGenerations, getItemVersionDetails, getHistoricalItemName, formatItemPrice, VERSION_GROUP_TO_GEN } from '../src/utils/items.js';
import { getVersionedFlavor } from '../src/utils/catalogText.js';
import { getMoveTypeForVersion, buildMachineEntry, KIND_TIPS_CN } from '../src/utils/machines.js';
import { versionGroupScore } from '../src/utils/versions.js';
import { buildEntriesForItem, loadMachinesCatalog } from '../src/data/machines.js';
import { loadItemsCatalog } from '../src/data/items.js';
import { canLearnMachineMove, findMoveLearners } from '../src/data/moveLearners.js';
import { BDSP_TM_MOVES, BDSP_VERSION } from '../src/data/bdspMachines.js';

const fixture = (name) => JSON.parse(readFileSync(new URL(`./fixtures/catalogs/${name}.json`, import.meta.url)));
const ref = (name, url = `/test/${name}`) => ({ name, url });
const flavor = (version, text, language = 'zh-hant') => ({ version_group: ref(version), language: ref(language), text });

test('item IDs, berry suffixes and third-generation indices never imply earlier generations', () => {
  for (const [id, name] of [[1, 'new-item'], [135, 'new-berry'], [400, 'new-item'], [2000, 'unknown']]) {
    assert.deepEqual(getItemGenerations({ id, name }), []);
    assert.deepEqual(getItemGenerations({ id, name, game_indices: [{ generation: ref('generation-iii') }] }), [3]);
  }
});

test('item generation records include every explicit index/flavor/price, including unindexed versions', () => {
  assert.deepEqual(getItemGenerations({ game_indices: [{ generation: ref('generation-ii') }],
    flavor_text_entries: [flavor('colosseum', 'x'), flavor('scarlet-violet', 'x')],
    prices: [{ version_group: ref('legends-arceus') }] }), [2, 3, 8, 9]);
});

test('version ordering places Colosseum/XD in gen 3, before gen 4', () => {
  for (const version of ['colosseum', 'xd']) {
    assert.equal(VERSION_GROUP_TO_GEN[version], 3);
    assert.ok(versionGroupScore(version) < versionGroupScore('diamond-pearl'));
  }
});

test('exact-game flavor prefers valid Traditional Chinese, then English; never borrows another game', () => {
  const entries = [flavor('sword-shield', '最新效果'), flavor('ruby-sapphire', 'Old effect', 'en'),
    flavor('ruby-sapphire', '???'), flavor('emerald', '[VAR 0100]')];
  assert.equal(getVersionedFlavor(entries, 'ruby-sapphire').text, 'Old effect');
  assert.equal(getVersionedFlavor(entries, 'ruby-sapphire').language, 'en');
  assert.equal(getVersionedFlavor(entries, 'emerald').language, '');
  assert.equal(getVersionedFlavor(entries, 'red-blue').text, '此版本尚無效果說明');
  assert.equal(getItemVersionDetails({ flavor_text_entries: entries }, 3).length, 2);
});

test('items keep their own text and add a labelled Chinese reference when the game only has English', () => {
  const entries = [flavor('sword-shield', '最新效果'), flavor('x-y', '第六世代效果'), flavor('diamond-pearl', '第四世代效果'),
    flavor('black-white', 'Gen 5 effect', 'en'), flavor('ruby-sapphire', 'Old effect', 'en'), flavor('emerald', '[VAR 0100]')];
  const options = { chineseReference: true };
  assert.deepEqual(getVersionedFlavor(entries, 'black-white', 'text', options), {
    text: 'Gen 5 effect', language: 'en', versionGroup: 'black-white',
    reference: { text: '第六世代效果', versionGroup: 'x-y' },
  }, 'the game keeps its own text; the nearest newer game supplies the reference');
  assert.equal(getVersionedFlavor(entries, 'ruby-sapphire', 'text', options).reference.versionGroup, 'diamond-pearl');
  assert.equal(getVersionedFlavor(entries, 'x-y', 'text', options).reference, undefined, 'own Chinese text needs no reference');
  assert.equal(getVersionedFlavor(entries, 'emerald', 'text', options).reference, undefined, 'no text for the game: nothing is added');
  assert.equal(getVersionedFlavor([flavor('scarlet-violet', 'New', 'en'), flavor('x-y', '舊效果')], 'scarlet-violet', 'text', options).reference.versionGroup, 'x-y',
    'falls back to an older game when nothing newer has Chinese');
  assert.equal(getVersionedFlavor([flavor('x-y', 'Only English', 'en')], 'x-y', 'text', options).reference, undefined);
  assert.equal(getVersionedFlavor(entries, 'black-white').reference, undefined, 'machines and other callers are unchanged');
  const detail = getItemVersionDetails({ flavor_text_entries: entries }, 3).find((d) => d.versionGroup === 'ruby-sapphire');
  assert.equal(detail.text, 'Old effect');
  assert.equal(detail.reference.versionGroup, 'diamond-pearl');
});

test('real historical Sitrus Berry text is not replaced by its latest effect', () => {
  const versions = getItemVersionDetails(fixture('item--sitrus-berry'), 3);
  assert.ok(versions.some((entry) => /30/.test(entry.text)));
  assert.ok(versions.every((entry) => VERSION_GROUP_TO_GEN[entry.versionGroup] === 3));
  assert.deepEqual(getItemVersionDetails(fixture('item--sitrus-berry'), 1), []);
  assert.equal(getHistoricalItemName(fixture('item--sitrus-berry'), 2), 'GOLD BERRY');
  assert.equal(getHistoricalItemName(fixture('item--sitrus-berry'), 3), '');
  assert.equal(getHistoricalItemName({ name: 'unknown-berry' }, 2), '');
});

test('price distinguishes purchase/sale, null, zero, missing and currency without legacy cost', () => {
  assert.equal(formatItemPrice({ purchase_price: 300, sell_price: 150, currency: ref('poke-dollar') }), '買價：300 寶可元 · 賣價：150 寶可元');
  assert.equal(formatItemPrice({ purchase_price: null, sell_price: 0, currency: ref('poke-dollar') }), '買價：不可購買 · 賣價：0 寶可元');
  assert.match(formatItemPrice({ cost: 300 }), /買價：未提供 · 賣價：未提供/);
  assert.match(formatItemPrice({ purchase_price: 5, sell_price: null, currency: ref('battle-point') }), /5 BP/);
  const master = getItemVersionDetails(fixture('item--master-ball'), 1);
  assert.ok(master.some((entry) => entry.prices.some((price) => price.purchase_price === null)));
});

test('historical types apply up to the change boundary, without changing current type', () => {
  const charm = fixture('move--charm');
  assert.equal(getMoveTypeForVersion(charm, 'gold-silver'), 'normal');
  assert.equal(getMoveTypeForVersion(charm, 'x-y'), 'fairy');
  const chop = fixture('move--karate-chop');
  assert.equal(getMoveTypeForVersion(chop, 'red-blue'), 'normal');
  assert.equal(getMoveTypeForVersion(chop, 'gold-silver'), 'fighting');
  assert.equal(getMoveTypeForVersion(chop, 'unknown'), '');
});

test('machine card effect is scoped to its exact version and TM usage is not universally single-use', () => {
  const entry = buildMachineEntry({}, 'tm01', 2, { version_group: ref('gold-silver') }, fixture('move--charm'));
  assert.equal(entry.type, 'normal');
  assert.equal(entry.versionGroup, 'gold-silver');
  assert.ok(!/單次使用/.test(KIND_TIPS_CN.TM));
});

test('all 24 live TM01 relations survive, plus corrected BDSP: same-gen moves stay distinct', async (t) => {
  t.mock.method(console, 'warn', () => {});
  const relations = fixture('tm01-live');
  t.mock.method(globalThis, 'fetch', async (url) => {
    const record = relations.find((entry) => entry.url === url);
    if (record) return Response.json({ version_group: ref(record.version), move: ref(record.move) });
    return Response.json({ name: String(url).split('/').filter(Boolean).pop(), type: ref('normal') });
  });
  const entries = await buildEntriesForItem(fixture('item--tm01'), 'tm01', new Map());
  assert.equal(entries.length, 25);
  for (const relation of relations) {
    assert.equal(entries.find((entry) => entry.versionGroup === relation.version).moveSlug, relation.move);
  }
  assert.equal(entries.find((entry) => entry.versionGroup === BDSP_VERSION).moveSlug, 'focus-punch');
});

test('BDSP has TM01–100 and no carried-over HMs; number 93 starts the converted HMs', async (t) => {
  t.mock.method(console, 'warn', () => {});
  t.mock.method(globalThis, 'fetch', async (url) => Response.json({ name: String(url).split('/').filter(Boolean).pop() }));
  assert.equal(BDSP_TM_MOVES.length, 100);
  assert.equal(new Set(BDSP_TM_MOVES).size, 100);
  assert.deepEqual(BDSP_TM_MOVES.slice(92), ['cut', 'fly', 'surf', 'strength', 'defog', 'rock-smash', 'waterfall', 'rock-climb']);
  const hm = await buildEntriesForItem({ machines: [{ version_group: ref(BDSP_VERSION), machine: ref('bad') }] }, 'hm01', new Map());
  assert.deepEqual(hm, []);
  const tm100 = await buildEntriesForItem({}, 'tm100', new Map());
  assert.equal(tm100[0].moveSlug, 'rock-climb');
  assert.deepEqual(await buildEntriesForItem({}, 'tm101', new Map()), []);
});

test('wrong machine response version causes a failure instead of silently showing another game', async (t) => {
  t.mock.method(console, 'warn', () => {});
  t.mock.method(globalThis, 'fetch', async () => Response.json({ version_group: ref('yellow'), move: ref('pound') }));
  await assert.rejects(buildEntriesForItem({ machines: [{ version_group: ref('red-blue'), machine: ref('wrong') }] }, 'hm01', new Map()), /版本資料不符/);
});

test('full 2,372-row upstream snapshot retains every version relation except the explicit BDSP correction', async (t) => {
  t.mock.method(console, 'warn', () => {});
  const rows = fixture('machine-relations');
  const items = new Map();
  const machines = new Map();
  rows.forEach(([slug, version, moveId], index) => {
    const url = `/audit/machine/${index}`;
    machines.set(url, { version_group: ref(version), move: ref(`move-${moveId}`) });
    if (!items.has(slug)) items.set(slug, []);
    items.get(slug).push({ version_group: ref(version), machine: { url } });
  });
  t.mock.method(globalThis, 'fetch', async (url) => Response.json(machines.get(url)
    || { name: String(url).split('/').filter(Boolean).pop(), type: ref('normal') }));
  const entries = [];
  for (const [slug, refs] of items) entries.push(...await buildEntriesForItem({ machines: refs }, slug, new Map()));
  const actual = new Map(entries.map((entry) => [`${entry.itemSlug}:${entry.versionGroup}`, entry]));
  assert.equal(actual.size, entries.length, 'no duplicate item/version cards');
  for (const [slug, version, moveId] of rows) {
    if (version !== BDSP_VERSION) assert.equal(actual.get(`${slug}:${version}`)?.moveSlug, `move-${moveId}`);
  }
  const bdsp = entries.filter((entry) => entry.versionGroup === BDSP_VERSION);
  assert.equal(bdsp.length, 100);
  assert.equal(entries.length, 2455);
});

test('learners require exact game and machine method, including alternative forms', () => {
  const pokemon = { moves: [{ move: ref('charm'), version_group_details: [
    { version_group: ref('sword-shield'), move_learn_method: ref('machine') },
    { version_group: ref('scarlet-violet'), move_learn_method: ref('level-up') },
  ] }] };
  assert.equal(canLearnMachineMove(pokemon, 'charm', 'sword-shield'), true);
  assert.equal(canLearnMachineMove(pokemon, 'charm', 'scarlet-violet'), false);
  assert.equal(canLearnMachineMove(pokemon, 'charm', ''), false);
});

test('learners reject missing game, failed candidate and aborted requests; retry succeeds without partial results', async (t) => {
  t.mock.method(console, 'warn', () => {});
  await assert.rejects(findMoveLearners({ moveSlug: 'charm' }), /指定/);
  let fail = true;
  t.mock.method(globalThis, 'fetch', async (url) => {
    if (String(url).includes('/move/')) return Response.json({ learned_by_pokemon: [ref('form')] });
    if (url === '/test/form') {
      if (fail) return new Response(null, { status: 503 });
      return Response.json({ id: 10025, name: 'form', species: ref('species'), moves: [{ move: ref('charm'),
        version_group_details: [{ version_group: ref('sword-shield'), move_learn_method: ref('machine') }] }] });
    }
    return Response.json({ names: [{ name: '測試寶可夢', language: ref('zh-hant') }], varieties: [{ is_default: false, pokemon: ref('form') }] });
  });
  await assert.rejects(findMoveLearners({ moveSlug: 'charm', versionGroup: 'sword-shield' }), /未載入/);
  fail = false;
  const result = await findMoveLearners({ moveSlug: 'charm', versionGroup: 'sword-shield' });
  assert.equal(result.count, 1);
  assert.match(result.learners[0].chineseName, /form/);
  const controller = new AbortController(); controller.abort();
  await assert.rejects(findMoveLearners({ moveSlug: 'charm', versionGroup: 'sword-shield' }, { signal: controller.signal }), { name: 'AbortError' });
});

for (const [name, loader, slug] of [['items', loadItemsCatalog, 'potion'], ['machines', loadMachinesCatalog, 'tm101']]) {
  test(`${name} catalog rejects partial downloads and successfully retries`, async (t) => {
    t.mock.method(console, 'warn', () => {});
    let fail = true;
    t.mock.method(globalThis, 'fetch', async (url) => {
      if (String(url).includes('?limit=')) return Response.json({ count: 1, results: [ref(slug)] });
      if (fail) return new Response(null, { status: 503 });
      return Response.json({ name: slug, category: { name: 'unknown' }, machines: [], prices: [], game_indices: [], flavor_text_entries: [] });
    });
    await assert.rejects(loader(), /未完整載入/);
    fail = false;
    const catalog = await loader();
    assert.ok(catalog.byGen);
  });
}
