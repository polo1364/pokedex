const fs = require('fs');
const { PNG } = require('pngjs');

const W = 1672;
const H = 941;
const png = PNG.sync.read(fs.readFileSync('public/images/guides/battle-frontier.png'));
const d = png.data;

function px(x, y) {
  const i = (y * W + x) * 4;
  return [d[i], d[i + 1], d[i + 2], d[i + 3]];
}

// sample grid around suspected label centers
const points = [
  ['tower', 720, 300],
  ['pike', 450, 350],
  ['arena', 1020, 360],
  ['palace', 1300, 530],
  ['tutor', 130, 400],
  ['artisan', 710, 730],
  ['sudowoodo', 1430, 590],
  ['dome', 280, 175],
];

for (const [name, cx, cy] of points) {
  console.log('\n', name, 'center', px(cx, cy));
  for (let dy = -15; dy <= 15; dy += 5) {
    let row = `${dy}`.padStart(3);
    for (let dx = -40; dx <= 40; dx += 10) {
      const [r, g, b, a] = px(cx + dx, cy + dy);
      row += ` [${r},${g},${b}]`;
    }
    console.log(row);
  }
}
