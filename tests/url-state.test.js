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
  const state = { gen: '9', type: 'dragon', q: 'mr mime', fav: false, sort: 'capture_rate', view: 'list', adv: DEFAULT_URL_STATE.adv };
  const href = buildUrlWithState(BASE, state);
  assert.deepEqual({ ...DEFAULT_URL_STATE, ...readUrlState(new URL(href).search) }, state);
});

test('advanced filters round-trip and only write meaningful params', () => {
  const adv = { type2: 'flying', stat: 'speed', min: 100, max: 130, ability: 'solar-power', egg: 'dragon' };
  const href = buildUrlWithState(BASE, { ...DEFAULT_URL_STATE, adv });
  const url = new URL(href);
  assert.equal(url.search, '?type2=flying&stat=speed&min=100&max=130&ability=solar-power&egg=dragon');
  assert.deepEqual(readUrlState(url.search).adv, adv);

  const statOnly = buildUrlWithState(BASE, { ...DEFAULT_URL_STATE, adv: { ...DEFAULT_URL_STATE.adv, stat: 'speed' } });
  assert.equal(new URL(statOnly).search, '', 'a stat without a range is not written');
  const totalMin = buildUrlWithState(BASE, { ...DEFAULT_URL_STATE, adv: { ...DEFAULT_URL_STATE.adv, min: 600 } });
  assert.equal(new URL(totalMin).search, '?min=600', 'total is the default stat');
  assert.deepEqual(readUrlState('?min=abc&egg=pizza').adv, DEFAULT_URL_STATE.adv);
  assert.equal(urlChangeKind(BASE, `${BASE}?egg=dragon`), 'push');
});

test('editing a search replaces history; starting, clearing and other changes push', () => {
  assert.equal(urlChangeKind(BASE, BASE), null);
  assert.equal(urlChangeKind(BASE, `${BASE}?q=p`), 'push');
  assert.equal(urlChangeKind(`${BASE}?q=p`, BASE), 'push');
  assert.equal(urlChangeKind(`${BASE}?q=pi`, `${BASE}?q=pika`), 'replace');
  assert.equal(urlChangeKind(`${BASE}?q=pi`, `${BASE}?q=pi&gen=1`), 'push');
  assert.equal(urlChangeKind(`${BASE}?sort=hp`, BASE), 'push');
});
