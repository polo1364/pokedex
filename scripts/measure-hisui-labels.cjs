/**
 * 量測 hisui.png pill 標籤 bbox → 百分比座標
 * node scripts/measure-hisui-labels.cjs
 */
const fs = require('fs');
const { PNG } = require('pngjs');

const W = 1672;
const H = 941;
const png = PNG.sync.read(fs.readFileSync('public/images/guides/hisui.png'));
const d = png.data;
const pct = (n, b) => `${((n / b) * 100).toFixed(2)}%`;

const isWhiteText = (r, g, b, a) => a > 200 && r > 238 && g > 238 && b > 238;

const isPillBg = (r, g, b, a) => {
  if (a < 200) return false;
  if (isWhiteText(r, g, b, a)) return false;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum > 210) return false;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  return lum < 145 || (sat > 18 && lum < 195);
};

const isDarkPill = (r, g, b, a) => {
  if (a < 200) return false;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum < 95 && Math.max(r, g, b) - Math.min(r, g, b) < 80;
};

function get(x, y) {
  const i = (y * W + x) * 4;
  return [d[i], d[i + 1], d[i + 2], d[i + 3]];
}

function findBlobs(test, opts = {}) {
  const { yMin = 0, yMax = H, minW = 80, maxW = 320, minH = 22, maxH = 50 } = opts;
  const mask = new Uint8Array(W * H);
  for (let y = yMin; y < yMax; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (test(d[i], d[i + 1], d[i + 2], d[i + 3])) mask[y * W + x] = 1;
    }
  }
  const seen = new Uint8Array(W * H);
  const blobs = [];
  for (let y = yMin; y < yMax; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      if (!mask[idx] || seen[idx]) continue;
      let minX = x, maxX = x, minY = y, maxY = y;
      const q = [[x, y]];
      seen[idx] = 1;
      while (q.length) {
        const [cx, cy] = q.pop();
        minX = Math.min(minX, cx);
        maxX = Math.max(maxX, cx);
        minY = Math.min(minY, cy);
        maxY = Math.max(maxY, cy);
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = cx + dx, ny = cy + dy;
          if (nx < 0 || ny < yMin || ny >= yMax || nx >= W) continue;
          const ni = ny * W + nx;
          if (!mask[ni] || seen[ni]) continue;
          seen[ni] = 1;
          q.push([nx, ny]);
        }
      }
      const bw = maxX - minX + 1;
      const bh = maxY - minY + 1;
      if (bw >= minW && bw <= maxW && bh >= minH && bh <= maxH) {
        blobs.push({
          left: minX,
          top: minY,
          width: bw,
          height: bh,
          cx: (minX + maxX) / 2,
          cy: (minY + maxY) / 2,
        });
      }
    }
  }
  return blobs;
}

function pick(blobs, px, py, maxD = 100) {
  let best = null;
  let bd = Infinity;
  for (const b of blobs) {
    const dist = Math.hypot(b.cx - px, b.cy - py);
    if (dist < bd && dist <= maxD) {
      bd = dist;
      best = b;
    }
  }
  return best;
}

function nearestWhiteBlob(px, py, rad = 55) {
  const x0 = Math.max(0, px - rad);
  const y0 = Math.max(0, py - rad);
  const x1 = Math.min(W - 1, px + rad);
  const y1 = Math.min(H - 1, py + rad);
  const seen = new Uint8Array(W * H);
  const blobs = [];

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const idx = y * W + x;
      if (seen[idx]) continue;
      const c = get(x, y);
      if (!isWhiteText(c[0], c[1], c[2], c[3])) continue;
      let minX = x, maxX = x, minY = y, maxY = y, count = 0;
      const q = [[x, y]];
      seen[idx] = 1;
      while (q.length) {
        const [cx, cy] = q.pop();
        count++;
        minX = Math.min(minX, cx);
        maxX = Math.max(maxX, cx);
        minY = Math.min(minY, cy);
        maxY = Math.max(maxY, cy);
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = cx + dx, ny = cy + dy;
          if (nx < x0 || nx > x1 || ny < y0 || ny > y1) continue;
          const ni = ny * W + nx;
          if (seen[ni]) continue;
          const nc = get(nx, ny);
          if (!isWhiteText(nc[0], nc[1], nc[2], nc[3])) continue;
          seen[ni] = 1;
          q.push([nx, ny]);
        }
      }
      const bw = maxX - minX + 1;
      const bh = maxY - minY + 1;
      if (count < 6 || count > 350 || bw > 120 || bh > 28 || bh < 4) continue;
      blobs.push({ left: minX, top: minY, width: bw, height: bh, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 });
    }
  }

  blobs.sort((a, b) => Math.hypot(a.cx - px, a.cy - py) - Math.hypot(b.cx - px, b.cy - py));
  return blobs[0] ?? null;
}

function expandToPill(textBox, hPad = 90) {
  const midY = Math.round(textBox.top + textBox.height / 2);
  const bandTop = Math.max(0, midY - 14);
  const bandBot = Math.min(H - 1, midY + 14);
  let left = textBox.left;
  let right = textBox.left + textBox.width - 1;
  let top = textBox.top;
  let bot = textBox.top + textBox.height - 1;

  for (let y = bandTop; y <= bandBot; y++) {
    for (let x = textBox.left - hPad; x <= textBox.left + textBox.width + hPad; x++) {
      if (x < 0 || x >= W) continue;
      const c = get(x, y);
      if (!isPillBg(c[0], c[1], c[2], c[3]) && !isWhiteText(c[0], c[1], c[2], c[3])) continue;
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bot = Math.max(bot, y);
    }
  }

  const bw = right - left + 1;
  const bh = bot - top + 1;
  if (bw < 40 || bh < 14 || bw > 300 || bh > 45) return null;
  return { left, top, width: bw, height: bh };
}

function measureFromText(px, py, hPad = 90) {
  const text = nearestWhiteBlob(px, py);
  if (!text) return null;
  return expandToPill(text, hPad);
}

function boxPct(box) {
  return {
    left: pct(box.left, W),
    top: pct(box.top, H),
    width: pct(box.width, W),
    height: pct(box.height, H),
  };
}

const darkBlobs = findBlobs(isDarkPill, { minW: 80, maxW: 320, minH: 22, maxH: 50 });

const LABELS = [
  { id: 'region-5', label: '純白凍土', px: 636, py: 70 },
  { id: 'region-4', label: '天冠山麓', px: 636, py: 265 },
  { id: 'region-6', label: '神奧神殿', px: 376, py: 250 },
  { id: 'region-3', label: '群青海岸', px: 330, py: 386, mode: 'dark' },
  { id: 'region-1', label: '黑曜原野', px: 1150, py: 399 },
  { id: 'region-2', label: '紅蓮濕地', px: 400, py: 655 },
  { id: 'hub-jubilife', label: '祝慶村', px: 750, py: 499 },
  { id: 'noble-avalugg', label: '雪原王戰場', px: 720, py: 165, hPad: 75 },
  { id: 'noble-electrode', label: '迎月戰場', px: 712, py: 327 },
  { id: 'noble-kleavor', label: '森林王戰場', px: 1120, py: 746 },
  { id: 'noble-lilligant', label: '峭壁女王戰場', px: 570, py: 817 },
  { id: 'noble-arcanine', label: '熔岩戰場', px: 70, py: 595 },
  { id: 'story-hollow', label: '秘密小洞', px: 982, py: 94 },
  { id: 'story-heights', label: '高崗營地', px: 1306, py: 284 },
  { id: 'story-ginkgo', label: '銀杏沙灘', px: 206, py: 250 },
  { id: 'story-rose', label: '玫瑰島', px: 66, py: 308 },
  { id: 'story-diamond', label: '金剛聚落', px: 483, py: 552 },
];

const out = PNG.sync.read(fs.readFileSync('public/images/guides/hisui.png'));
const calibrated = {};

console.log('=== measured boxes ===\n');
for (const item of LABELS) {
  let box;
  if (item.mode === 'dark') {
    box = pick(darkBlobs, item.px, item.py, 120);
  } else {
    box = measureFromText(item.px, item.py, item.hPad ?? 90);
  }
  if (!box) {
    console.log(item.id, 'MISSING');
    continue;
  }
  calibrated[item.id] = boxPct(box);
  console.log(`${item.id} ${item.label}`);
  console.log(`  left: '${calibrated[item.id].left}', top: '${calibrated[item.id].top}', width: '${calibrated[item.id].width}', height: '${calibrated[item.id].height}'`);
  const l = box.left, t = box.top, w = box.width, h = box.height;
  for (let y = t; y < t + h; y++) {
    for (let x = l; x < l + w; x++) {
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const edge = x === l || x === l + w - 1 || y === t || y === t + h - 1;
      const i = (y * W + x) * 4;
      if (edge) {
        out.data[i] = 255;
        out.data[i + 1] = 60;
        out.data[i + 2] = 60;
        out.data[i + 3] = 220;
      }
    }
  }
}

fs.writeFileSync('hisui-labels-debug.png', PNG.sync.write(out));
console.log('\n=== CALIBRATED (for guideMaps.js) ===');
console.log(JSON.stringify(calibrated, null, 2));
