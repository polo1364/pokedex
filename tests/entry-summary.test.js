import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  entryFromForm, formDisplayName,
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

test('forms in the index become their own entries with species-level generation', () => {
  assert.equal(index.version, 3);
  assert.ok(index.forms.length >= 300);
  const species = new Map(index.entries.map((e) => [e.id, e]));
  assert.ok(index.forms.every((f) => species.has(f.sp) && f.t.length && f.s.length === 6 && ['mega', 'regional', 'gmax', 'other'].includes(f.k)));

  const megaX = index.forms.find((f) => f.n === 'charizard-mega-x');
  const entry = entryFromForm(megaX, species.get(6), 'https://pokeapi.co/api/v2');
  assert.equal(entry.chineseName, '超級噴火龍Ｘ');
  assert.equal(entry.dexNumber, 6);
  assert.equal(entry.id, 10034);
  assert.equal(entry.pokemonUrl, 'https://pokeapi.co/api/v2/pokemon/10034/');
  assert.deepEqual(entryTypes(entry), ['fire', 'dragon']);
  assert.equal(entryGeneration(entry), 1, 'generation follows the species');
  assert.equal(entryTotalStats(entry), 634);

  const alolan = index.forms.find((f) => f.n === 'vulpix-alola');
  assert.equal(alolan.k, 'regional');
  assert.deepEqual(alolan.t, ['ice']);
  assert.equal(index.forms.find((f) => f.n === 'charizard-gmax').k, 'gmax');
});

test('form names fall back to species name plus a label', () => {
  assert.equal(formDisplayName('噴火龍', '超級噴火龍Ｘ', ''), '超級噴火龍Ｘ');
  assert.equal(formDisplayName('六尾', '阿羅拉的樣子', ''), '六尾（阿羅拉的樣子）');
  assert.equal(formDisplayName('噴火龍', null, '超極巨化'), '噴火龍（超極巨化）');
  assert.equal(formDisplayName('噴火龍', null, ''), '噴火龍');
});
