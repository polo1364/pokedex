import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesSearch } from '../src/utils/search.js';

const pikachu = { id: 25, name: 'pikachu', chineseName: '皮卡丘' };
const mrMime = { id: 122, name: 'mr-mime', chineseName: '魔牆人偶' };

test('search matches Chinese name, English name and number variants', () => {
  assert.ok(matchesSearch(pikachu, ''));
  assert.ok(matchesSearch(pikachu, '皮卡'));
  assert.ok(matchesSearch(pikachu, 'PIKA'));
  assert.ok(matchesSearch(pikachu, '  25 '));
  assert.ok(matchesSearch(pikachu, '#025'));
  assert.ok(matchesSearch(mrMime, 'mr mime'));
  assert.ok(!matchesSearch(pikachu, 'mime'));
  assert.ok(!matchesSearch(pikachu, '#26'));
});
