import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildLightCss, invertLightness, transformValue } from '../scripts/build-guide-light.mjs';
import { stepLabel } from '../src/ui/guideBoard.js';

const read = (rel) => fs.readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');

test('guide-light.css is in sync with main.css', () => {
  assert.equal(read('src/styles/guide-light.css'), buildLightCss(read('src/styles/main.css')),
    'run node scripts/build-guide-light.mjs after changing colours in main.css');
});

test('light theme flips lightness but keeps hue, alpha and non-colour text', () => {
  assert.equal(invertLightness('#000'), '#ffffff');
  assert.equal(invertLightness('white'), '#000000');
  assert.equal(invertLightness('rgba(255, 255, 255, 0.08)'), 'rgba(0, 0, 0, 0.08)');
  assert.equal(invertLightness('#0f0f23'), '#ececf7', 'the dark page background becomes a near-white with the same blue tint');
  const [r, g, b] = invertLightness('#7ee8ff').match(/[0-9a-f]{2}/g).map((x) => parseInt(x, 16));
  assert.ok(b > g && g > r && b < 140, 'a light cyan link becomes a dark cyan');
  assert.equal(invertLightness('rgb(var(--x))'), 'rgb(var(--x))', 'values that are not literal colours are left alone');
  assert.equal(transformValue('1px solid rgba(0, 0, 0, 0.5)'), '1px solid rgba(255, 255, 255, 0.5)');
  assert.equal(transformValue('color-mix(in srgb, var(--gb-c) 72%, #fff)'), 'color-mix(in srgb, var(--gb-c) 72%, #000000)');
  assert.equal(transformValue('white-space'), 'white-space');
});

test('light theme leaves type-coloured components and accent pills as they are', () => {
  const css = buildLightCss(`
    :root { --bg: #000; --shadow: 0 0 4px #000; }
    .type-badge { color: #fff; }
    .gb-hero .name { color: #fff; }
    .pill { background: #2bd17e; color: #062615; border-color: #062615; }
    .step::before { background: var(--c); color: #06121f; }
    .card { background: rgba(26, 26, 46, 0.9); box-shadow: 0 2px 8px #000; width: 10px; }
    @media (max-width: 600px) { .card { color: #eee; } }
    @keyframes glow { from { color: #fff; } }
  `);
  assert.match(css, /html\.guide-light \{\s*--bg: #ffffff\s*\}/);
  assert.doesNotMatch(css, /--shadow|box-shadow|width: 10px|keyframes/);
  assert.doesNotMatch(css, /type-badge|gb-hero/);
  assert.match(css, /html\.guide-light \.pill \{\s*border-color: [^;}]+\s*\}/, 'pill keeps its own fill and text colour');
  assert.doesNotMatch(css, /\.step::before/);
  assert.match(css, /html\.guide-light \.card \{\s*background: rgba\(\d+, \d+, \d+, 0\.9\)\s*\}/);
  assert.match(css, /@media \(max-width: 600px\) \{\s*html\.guide-light \.card/);
});

test('strategy steps are labelled by what they say', () => {
  assert.equal(stepLabel('用電或草招打海星星與寶石海星', 0, 2), '主打');
  assert.equal(stepLabel('先把主力補滿血再迎戰寶石海星。', 1, 2), '接著');
  assert.equal(stepLabel('草招對龍頭地鼠只是一般效果。', 1, 2), '留意');
  assert.equal(stepLabel('貓頭夜鷹不眠，不要用催眠浪費回合。', 1, 2), '留意');
  assert.equal(stepLabel('分別用水招與草招處理。', 1, 2), '接著', '「分別」不是提醒');
  assert.equal(stepLabel('以飛行或火招打草系，並準備解麻與解毒道具。', 0, 1), '打法');
});
