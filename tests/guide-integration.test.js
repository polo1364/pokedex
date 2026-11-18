import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getVersionGuide, getLeagueOpponents, resolveBattle } from '../src/data/versionGuides/index.js';

test('Black/White finale separates first Elite Four, castle battles and postgame Alder', () => {
  const guide = getVersionGuide('black-white');
  const entries = getLeagueOpponents(guide);
  assert.deepEqual(entries.map(e => e.battleRef), ['eliteFour:1','eliteFour:2','eliteFour:3','eliteFour:4','story:1','story:2','champion']);
  const n = resolveBattle('story:1', guide);
  assert.deepEqual(n.variants.map(v => v.party[0].name), ['捷克羅姆', '萊希拉姆']);
  assert.ok(n.variants.every(v => v.party.length === 6 && v.party[0].level === 52));
  assert.equal(resolveBattle('story:2', guide).party.find(p => p.name === '三首惡龍').level, 54);
  assert.match(guide.champion.roleLabel, /通關後/);
  assert.equal(guide.champion.party.at(-1).level, 77);
  assert.equal(resolveBattle('story:999', guide), null);
});

test('Unova sequels and Hoenn remakes retain their own first gyms and Elite Four', () => {
  const bw2 = getVersionGuide('black-2-white-2');
  assert.equal(bw2.gyms[0].name, '黑連');
  assert.deepEqual(bw2.gyms[0].party.map(p => p.level), [11, 13]);
  const oras = getVersionGuide('omega-ruby-alpha-sapphire');
  assert.equal(oras.gyms[7].name, '米可利');
  assert.equal(oras.gyms[6].party.length, 2);
  assert.ok(oras.eliteFour.every(b => b.party.length === 5));
});

test('Platinum and Mina map links point to the corrected battle rather than an old slot', () => {
  const atlas = JSON.parse(readFileSync(new URL('../public/atlas/atlas-data.json', import.meta.url), 'utf8'));
  const guide = getVersionGuide('platinum');
  for (const location of atlas.maps.platinum.locations.filter(p => p.gymOrder)) {
    assert.equal(resolveBattle(`gym:${location.gymOrder}`, guide)?.name, location.leader, location.id);
  }
  const mina = atlas.maps['ultra-sun-ultra-moon-poni'].locations.find(p => p.id === 'seafolk-village');
  assert.match(resolveBattle(`gym:${mina.gymOrder}`, getVersionGuide('ultra-sun-ultra-moon')).name, /茉莉/);
});
