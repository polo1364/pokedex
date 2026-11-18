import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  entryFromSummary, entryGeneration, entryTypes, entryStat, entryTotalStats,
  entryHeight, entryWeight, entryCaptureRate, entryVarietyIds,
} from '../src/utils/entrySummary.js';

const index = JSON.parse(fs.readFileSync(new URL('../public/data/species-index.json', import.meta.url), 'utf8'));

test('prebuilt species index covers every species with the fields the grid needs', () => {
  assert.equal(index.entries.length, index.count);
  assert.ok(index.count >= 1025);
  index.entries.forEach((e, i) => {
    assert.equal(e.id, i + 1);
    assert.ok(e.n && e.zh && e.g >= 1 && e.t.length >= 1 && e.s.length === 6, `entry ${e.id}`);
  });
});

test('summary entries answer filters and sorts before full data loads', () => {
  const charizard = entryFromSummary(index.entries[5], 'https://pokeapi.co/api/v2');
  assert.equal(charizard.chineseName, '噴火龍');
  assert.equal(charizard.loaded, false);
  assert.equal(charizard.pokemonUrl, 'https://pokeapi.co/api/v2/pokemon/6/');
  assert.equal(entryGeneration(charizard), 1);
  assert.deepEqual(entryTypes(charizard), ['fire', 'flying']);
  assert.equal(entryStat(charizard, 'special-attack'), 109);
  assert.equal(entryTotalStats(charizard), 534);
  assert.equal(entryHeight(charizard), 17);
  assert.equal(entryWeight(charizard), 905);
  assert.equal(entryCaptureRate(charizard), 45);
  assert.ok(entryVarietyIds(charizard).includes(10034));
});

test('full PokéAPI data takes precedence over the summary once loaded', () => {
  const entry = entryFromSummary(index.entries[24], 'https://pokeapi.co/api/v2');
  entry.pokemon = { types: [{ type: { name: 'electric' } }], stats: [{ stat: { name: 'speed' }, base_stat: 999 }], height: 1, weight: 2 };
  entry.speciesData = { generation: { url: 'https://pokeapi.co/api/v2/generation/7/' }, capture_rate: 3, varieties: [] };
  assert.equal(entryStat(entry, 'speed'), 999);
  assert.equal(entryGeneration(entry), 7);
  assert.equal(entryCaptureRate(entry), 3);
  assert.equal(entryHeight(entry), 1);
});
