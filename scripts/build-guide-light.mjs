#!/usr/bin/env node
/**
 * 產生攻略頁「淺色閱讀模式」的樣式：src/styles/guide-light.css。
 *
 * 攻略樣式有數百處寫死的深色配色。這裡把 main.css 每一條顏色宣告的「明度」反轉（色相與飽和度不變），
 * 輸出成 html.guide-light 開頭的覆蓋規則。圖片、行內指定的屬性色都不受影響，所以寶可夢與屬性標籤維持原色。
 *
 * main.css 改過顏色後重跑本腳本；tests/guide-light.test.js 會檢查兩者是否同步。
 * 用法：node scripts/build-guide-light.mjs        產生檔案
 *       node scripts/build-guide-light.mjs --check 只檢查是否同步
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import postcss from 'postcss';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceFile = path.join(root, 'src', 'styles', 'main.css');
const outFile = path.join(root, 'src', 'styles', 'guide-light.css');

/** 會帶顏色、需要轉換的屬性（陰影與濾鏡不轉：深色陰影在淺色底一樣適用）。 */
const COLOR_PROPS = /^(color|background|background-color|background-image|border|border-(top|right|bottom|left|block|inline)(-(start|end))?(-color)?|border-color|outline|outline-color|fill|stroke|caret-color|text-decoration|text-decoration-color|column-rule|column-rule-color|scrollbar-color|accent-color|--[\w-]+)$/;

/** 維持原樣的元件：本來就以屬性色或版本色為底、白字為主的標籤與橫幅。 */
const KEEP_SELECTORS = /\.type-badge|\.gb-hero|\.gb-ver\b|\.gb-tera\b/;

const COLOR_TOKEN = /#[0-9a-fA-F]{3,8}\b|rgba?\([^()]*\)|hsla?\([^()]*\)|\b(?:white|black)\b(?!-)/g;

function clamp01(x) {
  return Math.min(1, Math.max(0, x));
}

function rgbToHsl(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [r + m, g + m, b + m];
}

function parseColor(token) {
  const lower = token.toLowerCase();
  if (lower === 'white') return [1, 1, 1, 1];
  if (lower === 'black') return [0, 0, 0, 1];
  if (lower.startsWith('#')) {
    let hex = lower.slice(1);
    if (hex.length === 3 || hex.length === 4) hex = [...hex].map((ch) => ch + ch).join('');
    if (hex.length !== 6 && hex.length !== 8) return null;
    const n = (i) => parseInt(hex.slice(i, i + 2), 16) / 255;
    return [n(0), n(2), n(4), hex.length === 8 ? n(6) : 1];
  }
  const parts = lower.slice(lower.indexOf('(') + 1, -1).split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 3 || parts.some((part) => /var|calc/.test(part))) return null;
  const alpha = parts[3] === undefined ? 1 : parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
  if (lower.startsWith('hsl')) {
    const [r, g, b] = hslToRgb(((parseFloat(parts[0]) % 360) + 360) % 360, parseFloat(parts[1]) / 100, parseFloat(parts[2]) / 100);
    return [r, g, b, alpha];
  }
  const channel = (part) => (part.endsWith('%') ? parseFloat(part) / 100 : parseFloat(part) / 255);
  return [channel(parts[0]), channel(parts[1]), channel(parts[2]), alpha];
}

/** 反轉明度：深底變淺底、淺字變深字，色相與飽和度不變。 */
export function invertLightness(token) {
  const parsed = parseColor(token);
  if (!parsed || parsed.some((value) => Number.isNaN(value))) return token;
  const [r, g, b, a] = parsed;
  const [h, s, l] = rgbToHsl(r, g, b);
  // 反轉後偏亮的顏色（原本的深色底）再提亮一些，底色才夠白、和深色文字的對比才夠
  let light = 1 - l;
  if (light > 0.75) light = 1 - (1 - light) * 0.55;
  // 明度中等的強調色（步驟的綠、連結的青）反轉後幾乎不變，當文字在淺色底太淡，壓深一點
  else if (light > 0.4) light *= 0.78;
  const [nr, ng, nb] = hslToRgb(h, s, light).map((value) => Math.round(clamp01(value) * 255));
  if (a >= 1) return `#${[nr, ng, nb].map((value) => value.toString(16).padStart(2, '0')).join('')}`;
  return `rgba(${nr}, ${ng}, ${nb}, ${Number(a.toFixed(3))})`;
}

export function transformValue(value) {
  return value.replace(COLOR_TOKEN, (token) => invertLightness(token));
}

/** 不透明、明度中等的實色底（綠色「首選」、金色「王牌」這類色塊）：本身就適合淺色底，連同上面的文字一起維持原樣。 */
function isAccentFill(value) {
  const tokens = value.match(COLOR_TOKEN) || [];
  if (tokens.length !== 1 || /gradient|var\(/.test(value)) return false;
  const parsed = parseColor(tokens[0]);
  if (!parsed || parsed[3] < 0.6) return false;
  const [, saturation, lightness] = rgbToHsl(parsed[0], parsed[1], parsed[2]);
  return saturation > 0.35 && lightness > 0.35 && lightness < 0.8;
}

/** 這條規則的底色是實色色塊，或是由變數決定的主題色（例如步驟編號的 var(--c)）。 */
function keepsOwnColors(rule) {
  let keep = false;
  rule.each((decl) => {
    if (decl.type !== 'decl' || !/^background(-color)?$/.test(decl.prop)) return;
    const value = decl.value.trim();
    if (isAccentFill(value) || /^var\(--[\w-]+\)$/.test(value)) keep = true;
  });
  return keep;
}

function lightSelector(selector) {
  const trimmed = selector.trim();
  if (/^(:root|html)(?![\w-])/.test(trimmed)) return trimmed.replace(/^(:root|html)/, 'html.guide-light');
  return `html.guide-light ${trimmed}`;
}

/**
 * 手動調整：自動反轉後仍不適合淺色底的少數顏色。
 * 主色（青）與輔色（桃紅）明度約 50%，反轉後不變，當文字或框線在淺色底對比不足，改用較深的同色相。
 */
const MANUAL = `
html.guide-light {
  color-scheme: light;
  --accent-primary: #007a99;
  --accent-secondary: #c2185b;
  --accent-tertiary: #5b21b6;
}
`;

export function buildLightCss(source) {
  const ast = postcss.parse(source);
  const out = postcss.root();

  function convert(container, target) {
    container.each((node) => {
      if (node.type === 'atrule') {
        if (!['media', 'supports'].includes(node.name)) return;
        const clone = postcss.atRule({ name: node.name, params: node.params });
        convert(node, clone);
        if (clone.nodes?.length) target.append(clone);
        return;
      }
      if (node.type !== 'rule') return;
      const selectors = node.selectors.filter((selector) => !KEEP_SELECTORS.test(selector));
      if (!selectors.length) return;
      const decls = [];
      const keepColors = keepsOwnColors(node);
      node.each((decl) => {
        if (decl.type !== 'decl' || !COLOR_PROPS.test(decl.prop)) return;
        if (/shadow/.test(decl.prop)) return;
        if (keepColors && /^(color|background(-color)?)$/.test(decl.prop)) return;
        const value = transformValue(decl.value);
        if (value !== decl.value) decls.push(postcss.decl({ prop: decl.prop, value, important: decl.important }));
      });
      if (!decls.length) return;
      const rule = postcss.rule({ selector: selectors.map(lightSelector).join(',\n') });
      decls.forEach((decl) => rule.append(decl));
      target.append(rule);
    });
  }

  convert(ast, out);
  const header = '/* 由 scripts/build-guide-light.mjs 從 main.css 產生，請勿手動修改；改完 main.css 的顏色後重跑腳本。 */\n';
  return `${header}${out.toString().replace(/\r\n/g, '\n')}\n${MANUAL}`;
}

function main() {
  const css = buildLightCss(readFileSync(sourceFile, 'utf8'));
  if (process.argv.includes('--check')) {
    if (!existsSync(outFile) || readFileSync(outFile, 'utf8') !== css) {
      console.error('guide-light.css 與 main.css 不同步，請執行 node scripts/build-guide-light.mjs');
      process.exit(1);
    }
    console.log('guide-light.css 與 main.css 同步');
    return;
  }
  writeFileSync(outFile, css);
  console.log(`寫入 ${path.relative(root, outFile)}（${Buffer.byteLength(css)} bytes）`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
