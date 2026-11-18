import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readUrlState, buildUrlWithState, urlChangeKind, DEFAULT_URL_STATE,
} from '../src/utils/urlState.js';

const BASE = 'https://example.test/pokedex/index.html';

test('reads valid filter params and ignores invalid ones', () => {
  assert.deepEqual(
    readUrlState('?gen=3&type=Water&q=%20Pika%20&fav=1&sort=speed&view=list'),
    { gen: '3', type: 'water', q: 'Pika', fav: true, sort: 'speed', view: 'list' },
  );
  assert.deepEqual(readUrlState('?gen=12&type=laser&sort=drop&view=table'), {});
  assert.deepEqual(readUrlState(''), {});
  assert.equal(readUrlState('?fav=0').fav, false);
});

test('writes only non-default values and keeps unrelated params', () => {
  const href = buildUrlWithState(`${BASE}?id=25&tm=thunderbolt#top`, {
    ...DEFAULT_URL_STATE, gen: '1', type: 'fire', q: '噴火', fav: true,
  });
  const url = new URL(href);
  assert.equal(url.searchParams.get('id'), '25');
  assert.equal(url.searchParams.get('tm'), 'thunderbolt');
  assert.equal(url.searchParams.get('gen'), '1');
  assert.equal(url.searchParams.get('type'), 'fire');
  assert.equal(url.searchParams.get('q'), '噴火');
  assert.equal(url.searchParams.get('fav'), '1');
  assert.equal(url.searchParams.has('sort'), false);
  assert.equal(url.searchParams.has('view'), false);
  assert.equal(url.hash, '#top');

  const reset = buildUrlWithState(href, DEFAULT_URL_STATE);
  assert.equal(reset, `${BASE}?id=25&tm=thunderbolt#top`);
});

test('round-trips state through the URL', () => {
  const state = { gen: '9', type: 'dragon', q: 'mr mime', fav: false, sort: 'capture_rate', view: 'list' };
  const href = buildUrlWithState(BASE, state);
  assert.deepEqual({ ...DEFAULT_URL_STATE, ...readUrlState(new URL(href).search) }, state);
});

test('editing a search replaces history; starting, clearing and other changes push', () => {
  assert.equal(urlChangeKind(BASE, BASE), null);
  assert.equal(urlChangeKind(BASE, `${BASE}?q=p`), 'push');
  assert.equal(urlChangeKind(`${BASE}?q=p`, BASE), 'push');
  assert.equal(urlChangeKind(`${BASE}?q=pi`, `${BASE}?q=pika`), 'replace');
  assert.equal(urlChangeKind(`${BASE}?q=pi`, `${BASE}?q=pi&gen=1`), 'push');
  assert.equal(urlChangeKind(`${BASE}?sort=hp`, BASE), 'push');
});
