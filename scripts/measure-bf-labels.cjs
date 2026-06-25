const fs = require('fs');
const { PNG } = require('pngjs');

const W = 1672;
const H = 941;
const png = PNG.sync.read(fs.readFileSync('public/images/guides/battle-frontier.png'));
const d = png.data;
const pct = (n, b) => `${((n / b) * 100).toFixed(2)}%`;
const yMax = Math.floor(H * 0.82);

const isCyan = (r, g, b, a) => a > 180 && g > 160 && b > 160 && r < 110;
const isPurple = (r, g, b, a) => a > 180 && r > 120 && b > 160 && g < 145;
const isWhite = (r, g, b, a) => a > 230 && r > 230 && g > 230 && b > 230;

function findBlobs(test) {
  const mask = new Uint8Array(W * yMax);
  for (let y = 80; y < yMax; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (test(d[i], d[i + 1], d[i + 2], d[i + 3])) mask[y * W + x] = 1;
    }
  }
  const seen = new Uint8Array(W * yMax);
  const blobs = [];
  for (let y = 80; y < yMax; y++) {
    for (let x = 0; x < W; x++) {
      if (!mask[y * W + x] || seen[y * W + x]) continue;
      let minX = x, maxX = x, minY = y, maxY = y;
      const q = [[x, y]];
      seen[y * W + x] = 1;
      while (q.length) {
        const [cx, cy] = q.pop();
        minX = Math.min(minX, cx);
        maxX = Math.max(maxX, cx);
        minY = Math.min(minY, cy);
        maxY = Math.max(maxY, cy);
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = cx + dx, ny = cy + dy;
          if (nx < 0 || ny < 80 || ny >= yMax || nx >= W || !mask[ny * W + nx] || seen[ny * W + nx]) continue;
          seen[ny * W + nx] = 1;
          q.push([nx, ny]);
        }
      }
      const bw = maxX - minX + 1, bh = maxY - minY + 1;
      if (bw >= 40 && bw <= 280 && bh >= 12 && bh <= 60) {
        blobs.push({ left: minX, top: minY, width: bw, height: bh, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 });
      }
    }
  }
  return blobs;
}

function expandWithWhite(cyanBox) {
  if (!cyanBox) return null;
  const bandTop = cyanBox.top - 4;
  const bandBot = cyanBox.top + cyanBox.height + 4;
  let minX = cyanBox.left, maxX = cyanBox.left + cyanBox.width - 1;
  for (let y = bandTop; y <= bandBot; y++) {
    for (let x = cyanBox.left; x <= Math.min(W - 1, cyanBox.left + cyanBox.width + 120); x++) {
      const i = (y * W + x) * 4;
      if (!isWhite(d[i], d[i + 1], d[i + 2], d[i + 3])) continue;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }
  }
  return { left: minX, top: cyanBox.top, width: maxX - minX + 1, height: cyanBox.height };
}

function pick(blobs, px, py, maxD = 100) {
  let best = null, bd = Infinity;
  for (const b of blobs) {
    const dist = Math.hypot(b.cx - px, b.cy - py);
    if (dist < bd && dist <= maxD) { bd = dist; best = b; }
  }
  return best;
}

const cyan = findBlobs(isCyan);
const purple = findBlobs(isPurple);
const white = findBlobs(isWhite);

const LABELS = [
  { id: 'facility-1', label: '對戰塔', px: 810, py: 200, mode: 'white' },
  { id: 'facility-2', label: '對戰工廠', px: 190, py: 480, mode: 'purple' },
  { id: 'facility-3', label: '對戰巨蛋', px: 245, py: 172, mode: 'white' },
  { id: 'facility-4', label: '對戰競技場', px: 1001, py: 404, mode: 'white' },
  { id: 'facility-5', label: '對戰水管', px: 438, py: 393, mode: 'cyan' },
  { id: 'facility-6', label: '對戰宮殿', px: 1244, py: 473, mode: 'cyan' },
  { id: 'facility-7', label: '對戰金字塔', px: 1211, py: 131, mode: 'cyan' },
  { id: 'story-route111', label: '111 號道路入口', px: 670, py: 115, mode: 'purple' },
  { id: 'story-scott', label: '亞希達的家', px: 540, py: 250, mode: 'purple' },
  { id: 'story-move-tutor', label: '招式教學屋', px: 210, py: 410, mode: 'purple' },
  { id: 'story-ranking', label: '排名殿堂', px: 1000, py: 250, mode: 'purple' },
  { id: 'story-exchange', label: '開拓區兌換處', px: 780, py: 475, mode: 'white' },
  { id: 'story-pokecenter', label: '寶可夢中心', px: 730, py: 585, mode: 'purple' },
  { id: 'story-pier', label: '破浪號碼頭', px: 220, py: 660, mode: 'cyan' },
  { id: 'story-artisan', label: '藝術家之洞', px: 720, py: 690, mode: 'cyan' },
  { id: 'story-sudowoodo', label: '樹才怪', px: 1530, py: 635, mode: 'purple' },
];

console.log('=== final boxes ===\n');
const out = PNG.sync.read(fs.readFileSync('public/images/guides/battle-frontier.png'));

for (const item of LABELS) {
  let box;
  if (item.mode === 'purple') box = pick(purple, item.px, item.py);
  else if (item.mode === 'cyan') {
    const c = pick(cyan, item.px, item.py);
    box = expandWithWhite(c) || c;
  } else {
    const w = pick(white, item.px, item.py);
    if (w) box = { left: Math.max(0, w.left - 28), top: Math.max(80, w.top - 8), width: w.width + 40, height: w.height + 16 };
  }
  if (!box) { console.log(item.id, 'MISSING'); continue; }
  console.log(`${item.id} ${item.label}`);
  console.log(`  left: '${pct(box.left, W)}', top: '${pct(box.top, H)}', width: '${pct(box.width, W)}', height: '${pct(box.height, H)}'`);
  const l = box.left, t = box.top, w = box.width, h = box.height;
  for (let y = t; y < t + h; y++) for (let x = l; x < l + w; x++) {
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const edge = x === l || x === l + w - 1 || y === t || y === t + h - 1;
    const i = (y * W + x) * 4;
    if (edge) { out.data[i]=255; out.data[i+1]=60; out.data[i+2]=60; out.data[i+3]=220; }
  }
}
fs.writeFileSync('battle-frontier-labels-debug.png', PNG.sync.write(out));
