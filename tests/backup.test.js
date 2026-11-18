import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBackup, parseBackup, applyBackup, describeData, backupFileName, cleanFavorites, countProgress,
} from '../src/utils/backup.js';

const progress = { 'red-blue': { main: ['b:gym:1', 'b:gym:2'] }, emerald: { 'battle-frontier': ['c:x'] } };

test('export cleans data and round-trips through parse', () => {
  const backup = buildBackup({
    favorites: [25, '6', 25, -1, 10034, 'x'],
    team: [6, 9, 3, 6, 25, 143, 149, 150],
    guideProgress: { ...progress, broken: 'yes' },
  }, new Date('2026-11-18T10:00:00Z'));
  assert.equal(backup.app, 'pokedex');
  assert.equal(backup.version, 1);
  assert.equal(backup.exportedAt, '2026-11-18T10:00:00.000Z');
  assert.deepEqual(backup.favorites, [25, 6, 10034]);
  assert.deepEqual(backup.team, [6, 9, 3, 25, 143, 149]);
  assert.deepEqual(backup.guideProgress, progress);

  const parsed = parseBackup(JSON.stringify(backup));
  assert.equal(parsed.ok, true);
  assert.deepEqual(parsed.data.favorites, backup.favorites);
  assert.deepEqual(parsed.data.team, backup.team);
  assert.deepEqual(parsed.data.guideProgress, progress);
  assert.equal(describeData(parsed.data), '收藏 3 隻、隊伍 6 隻、攻略進度 3 項');
});

test('import rejects files that are not our backups with a clear reason', () => {
  assert.match(parseBackup('').error, /空/);
  assert.match(parseBackup('{oops').error, /JSON/);
  assert.match(parseBackup('[1,2]').error, /不是本站/);
  assert.match(parseBackup(JSON.stringify({ app: 'other', version: 1 })).error, /不是本站/);
  assert.match(parseBackup(JSON.stringify({ app: 'pokedex', version: 99 })).error, /較新/);
  assert.match(parseBackup('x'.repeat(1024 * 1024 + 1)).error, /太大/);
  const partial = parseBackup(JSON.stringify({ app: 'pokedex', version: 1, favorites: 'nope', team: [6, 'x'] }));
  assert.equal(partial.ok, true);
  assert.deepEqual(partial.data.favorites, []);
  assert.deepEqual(partial.data.team, [6]);
  assert.deepEqual(partial.data.guideProgress, {});
});

test('merge unions data and keeps the team within six', () => {
  const current = { favorites: [1, 4], team: [1, 4, 7, 25], guideProgress: { 'red-blue': { main: ['b:gym:1'] } } };
  const incoming = { favorites: [4, 6], team: [6, 9, 3, 25], guideProgress: progress };
  const merged = applyBackup(current, incoming, 'merge');
  assert.deepEqual(merged.favorites, [1, 4, 6]);
  assert.deepEqual(merged.team, [1, 4, 7, 25, 6, 9]);
  assert.deepEqual(merged.guideProgress['red-blue'].main, ['b:gym:1', 'b:gym:2']);
  assert.deepEqual(merged.guideProgress.emerald, progress.emerald);
  assert.deepEqual(current.favorites, [1, 4], 'current data is not mutated');
});

test('replace takes the backup as is', () => {
  const current = { favorites: [1, 4], team: [1], guideProgress: { x: { main: ['a'] } } };
  const incoming = { favorites: [6], team: [], guideProgress: {} };
  assert.deepEqual(applyBackup(current, incoming, 'replace'), { favorites: [6], team: [], guideProgress: {} });
});

test('helpers', () => {
  assert.equal(backupFileName(new Date(2026, 0, 5)), 'pokedex-backup-20260105.json');
  assert.deepEqual(cleanFavorites(null), []);
  assert.equal(countProgress(progress), 3);
});
