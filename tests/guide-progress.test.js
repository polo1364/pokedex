import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseProgress, getDoneKeys, setDone, resetPart, summarize, uniquifyKeys,
} from '../src/utils/guideProgress.js';

test('parsing keeps valid data and drops anything malformed', () => {
  assert.deepEqual(parseProgress('not json'), {});
  assert.deepEqual(parseProgress('[1,2]'), {});
  assert.deepEqual(parseProgress(null), {});
  assert.deepEqual(parseProgress(JSON.stringify({
    'red-blue': { main: ['b:gym:1', 'b:gym:1', 3, '', 'b:gym:2'], league: 'oops' },
    emerald: [],
    'x-y': { main: [] },
  })), { 'red-blue': { main: ['b:gym:1', 'b:gym:2'] } });
});

test('marking done is per version and part, and immutable', () => {
  const start = {};
  const a = setDone(start, 'red-blue', 'main', 'b:gym:1', true);
  assert.deepEqual(start, {}, 'original not mutated');
  const b = setDone(a, 'red-blue', 'main', 'b:gym:2', true);
  const c = setDone(b, 'emerald', 'battle-frontier', 'c:expansion-section-battle-frontier-1', true);
  assert.deepEqual([...getDoneKeys(c, 'red-blue', 'main')], ['b:gym:1', 'b:gym:2']);
  assert.equal(getDoneKeys(c, 'red-blue', 'league').size, 0);
  const d = setDone(c, 'red-blue', 'main', 'b:gym:1', false);
  assert.deepEqual([...getDoneKeys(d, 'red-blue', 'main')], ['b:gym:2']);
  const e = setDone(d, 'red-blue', 'main', 'b:gym:2', false);
  assert.equal(e['red-blue'], undefined, 'empty versions are pruned');
  assert.equal(setDone(e, 'x', 'y', '', true), e, 'invalid keys are ignored');
});

test('reset clears only the chosen part', () => {
  let p = setDone({}, 'legends-arceus', 'requests', 'r:1', true);
  p = setDone(p, 'legends-arceus', 'main', 'c:expansion-section-legends-arceus-1', true);
  const r = resetPart(p, 'legends-arceus', 'requests');
  assert.equal(getDoneKeys(r, 'legends-arceus', 'requests').size, 0);
  assert.equal(getDoneKeys(r, 'legends-arceus', 'main').size, 1);
  assert.equal(resetPart(r, 'nope', 'main'), r);
});

test('summary only counts keys present on the page', () => {
  let p = setDone({}, 'red-blue', 'main', 'b:gym:1', true);
  p = setDone(p, 'red-blue', 'main', 'b:removed-from-guide', true);
  assert.deepEqual(summarize(p, 'red-blue', 'main', ['b:gym:1', 'b:gym:2', 'b:gym:3', 'b:gym:4']),
    { total: 4, completed: 1, percent: 25 });
  assert.deepEqual(summarize(p, 'red-blue', 'main', []), { total: 0, completed: 0, percent: 0 });
});

test('duplicate base keys get stable suffixes', () => {
  assert.deepEqual(uniquifyKeys(['b:champion', 'b:gym:1', 'b:champion', 'b:champion']),
    ['b:champion', 'b:gym:1', 'b:champion~2', 'b:champion~3']);
});
