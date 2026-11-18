import test from 'node:test';
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { fetchJson, runPool } from '../src/api/client.js';

test('simultaneous requests for the same resource share one fetch', async (t) => {
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async () => {
    calls++;
    await delay(5);
    return Response.json({ id: 25 });
  });
  const results = await Promise.all(Array.from({ length: 20 }, () => fetchJson('/pokemon/25')));
  assert.equal(calls, 1);
  assert.ok(results.every((result) => result.id === 25));
});

test('failed shared requests can be retried', async (t) => {
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async () => {
    const attempt = ++calls;
    await delay(5);
    return attempt === 1 ? new Response(null, { status: 503 }) : Response.json({ id: 1 });
  });
  const results = await Promise.allSettled([fetchJson('/retry'), fetchJson('/retry')]);
  assert.ok(results.every((result) => result.status === 'rejected'));
  assert.deepEqual(await fetchJson('/retry'), { id: 1 });
  assert.equal(calls, 2);
});

test('different URLs do not share a pending request', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => Response.json({ url }));
  const results = await Promise.all([fetchJson('/one'), fetchJson('/two')]);
  assert.deepEqual(results, [{ url: '/one' }, { url: '/two' }]);
});

test('pool bounds concurrency, preserves order and continues after failure', async () => {
  let active = 0;
  let peak = 0;
  const result = await runPool([0, 1, 2, 3, 4], async (value) => {
    peak = Math.max(peak, ++active);
    await delay(5);
    active--;
    if (value === 2) throw new Error('temporary failure');
    return value;
  }, 2);
  assert.equal(peak, 2);
  assert.equal(result[2].error.message, 'temporary failure');
  assert.deepEqual(result.filter((value) => typeof value === 'number'), [0, 1, 3, 4]);
});
