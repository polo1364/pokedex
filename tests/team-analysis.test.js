import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TEAM_SIZE, parseTeamIds, addTeamId, defensiveMatrix, sharedWeaknesses,
  offensiveCoverage, uncoveredTypes, suggestDefensiveTypes, suggestOffensiveTypes,
} from '../src/utils/teamAnalysis.js';

const CHARIZARD = ['fire', 'flying'];
const BLASTOISE = ['water'];
const VENUSAUR = ['grass', 'poison'];
const GYARADOS = ['water', 'flying'];
const GENGAR = ['ghost', 'poison'];

test('team ids from the URL are positive, unique and capped at six', () => {
  assert.equal(TEAM_SIZE, 6);
  assert.deepEqual(parseTeamIds('6,9,3,6,x,-2,25,143,149,150'), [6, 9, 3, 25, 143, 149]);
  assert.deepEqual(parseTeamIds(''), []);
});

test('adding refuses duplicates and full teams', () => {
  assert.deepEqual(addTeamId([6], 9), { ids: [6, 9], added: true, full: false, duplicate: false });
  assert.equal(addTeamId([6], 6).duplicate, true);
  assert.equal(addTeamId([1, 2, 3, 4, 5, 6], 7).full, true);
});

test('defensive matrix counts weak, resist and immune members per attacking type', () => {
  const byType = Object.fromEntries(defensiveMatrix([CHARIZARD, BLASTOISE, VENUSAUR]).map((r) => [r.attack, r]));
  assert.deepEqual(byType.rock.multipliers, [4, 1, 1]);
  assert.deepEqual(byType.electric.multipliers, [2, 2, 0.5]);
  assert.equal(byType.electric.weak, 2);
  assert.equal(byType.electric.resist, 1);
  assert.equal(byType.ground.immune, 1);
  assert.equal(byType.ground.resist, 1, 'immunity counts as a resist; Venusaur (grass/poison) takes 1x from ground');
  assert.deepEqual(byType.ground.multipliers, [0, 1, 1]);
});

test('shared weaknesses need more weak than resisting members, or an unanswered 4x weakness', () => {
  const weak = sharedWeaknesses([CHARIZARD, GYARADOS, BLASTOISE]).map((r) => r.attack);
  assert.equal(weak[0], 'electric', 'electric hits all three, Gyarados 4x');
  assert.ok(weak.includes('rock'));
  assert.ok(!weak.includes('fire'), 'fire is resisted by the water types');
  assert.deepEqual(sharedWeaknesses([]), []);
});

test('STAB coverage finds the hitters and the gaps', () => {
  const team = [CHARIZARD, BLASTOISE, VENUSAUR];
  const byType = Object.fromEntries(offensiveCoverage(team).map((r) => [r.defense, r]));
  assert.deepEqual(byType.ground.hitters, [1, 2]);
  assert.equal(byType.ground.best, 2);
  const gaps = uncoveredTypes(team);
  assert.ok(gaps.includes('dragon') && gaps.includes('normal'));
  assert.ok(!gaps.includes('fairy'), 'Venusaur poison STAB hits fairy');
  assert.deepEqual(uncoveredTypes([GENGAR]).includes('ghost'), false);
});

test('suggestions pick types that cover the most problems', () => {
  const defensive = suggestDefensiveTypes(['electric', 'rock', 'ice']);
  assert.equal(defensive[0].type, 'steel', 'steel resists rock and ice without adding a weakness among them');
  assert.deepEqual(defensive[0].covers, ['rock', 'ice']);
  const ground = defensive.find((s) => s.type === 'ground');
  assert.ok(ground && ground.covers.includes('electric'), 'ground (immune to electric) is still suggested');
  assert.deepEqual(suggestDefensiveTypes([]), []);

  const offensive = suggestOffensiveTypes(['dragon', 'normal', 'steel']);
  assert.ok(['fighting', 'ice', 'fairy', 'fire', 'ground'].includes(offensive[0].type));
  assert.ok(offensive.every((s) => s.covers.length >= 1));
});
