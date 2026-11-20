#!/usr/bin/env node
/**
 * 產生攻略頁「淺色閱讀模式」的樣式：
 *   src/styles/main.css      → src/styles/guide-light.css    （html.guide-light）
 *   public/atlas/atlas.css   → public/atlas/atlas-light.css  （html.atlas-light，嵌在攻略裡的地圖）
 *
 * 攻略樣式有數百處寫死的深色配色。這裡把 main.css 每一條顏色宣告的「明度」反轉（色相與飽和度不變），
 * 輸出成 html.guide-light 開頭的覆蓋規則。圖片、行內指定的屬性色都不受影響，所以寶可夢與屬性標籤維持原色。
 *
 * main.css 或 atlas.css 改過顏色後重跑本腳本；tests/guide-light.test.js 會檢查是否同步。
 * 用法：node scripts/build-guide-light.mjs        產生檔案
 *       node scripts/build-guide-light.mjs --check 只檢查是否同步
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import postcss from 'postcss';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** 會帶顏色、需要轉換的屬性（陰影與濾鏡不轉：深色陰影在淺色底一樣適用）。 */
const COLOR_PROPS = /^(color|background|background-color|background-image|border|border-(top|right|bottom|left|block|inline)(-(start|end))?(-color)?|border-color|outline|outline-color|fill|stroke|caret-color|text-decoration|text-decoration-color|column-rule|column-rule-color|scrollbar-color|accent-color|--[\w-]+)$/;

/** 維持原樣的元件：本來就以屬性色或版本色為底、白字為主的標籤與橫幅。 */
const GUIDE_KEEP = /\.type-badge|\.gb-hero|\.gb-ver\b|\.gb-tera\b/;
/** 地圖：地圖畫面本身，以及疊在地圖上的控制鈕、地點卡片、圖例色點維持原樣。 */
const ATLAS_KEEP = /#map|#canvas|\.viewport|\.map-stage|\.map-controls|\.zoom-level|\.place-card|\.location|\.legend (i|span)|^\.(gym|land|water|poi)$/;

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

function luminance([r, g, b]) {
  const linear = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/** WCAG 對比值。 */
export function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** 淺色模式裡文字最常出現的底色（卡片與色塊疊起來後偏深的那一端），拿來檢查文字對比。 */
const LIGHT_SURFACE = [0xd8 / 255, 0xd8 / 255, 0xea / 255];
const MIN_TEXT_CONTRAST = 5.6;

/**
 * 文字顏色：反轉明度後若在淺色底上對比不足（青、綠、金這類強調色），保持色相繼續壓深到合格為止。
 * 半透明或已經合格的顏色不動。
 */
export function readableTextColor(token) {
  const flipped = invertLightness(token);
  const parsed = parseColor(flipped);
  if (!parsed || parsed[3] < 0.9 || flipped === token) return flipped;
  let [h, sat, light] = rgbToHsl(parsed[0], parsed[1], parsed[2]);
  let rgb = parsed.slice(0, 3);
  // 太亮的顏色是「深色底上的淺字」反轉不到的情況（例如白字），不是要壓深的強調色
  if (contrastRatio(rgb, LIGHT_SURFACE) >= MIN_TEXT_CONTRAST || light > 0.8) return flipped;
  while (light > 0.05 && contrastRatio(rgb, LIGHT_SURFACE) < MIN_TEXT_CONTRAST) {
    light -= 0.01;
    rgb = hslToRgb(h, sat, light);
  }
  return `#${rgb.map((value) => Math.round(clamp01(value) * 255).toString(16).padStart(2, '0')).join('')}`;
}

/** 只拿來當文字顏色用的變數（委託分類、閱讀標記），和 color 一樣要檢查對比。 */
const TEXT_VARS = /^--(req|reading)-/;

function transformTextValue(value) {
  return value.replace(COLOR_TOKEN, (token) => readableTextColor(token));
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

/**
 * 前綴包在 :where() 裡，不增加權重：淺色規則和原規則權重相同、只靠「寫在後面」蓋過去，
 * 所以原本誰蓋過誰的關係完全不變（例如維持原樣的地圖按鈕不會被一般按鈕的淺色規則蓋掉）。
 * 產生的檔案必須在來源樣式之後載入。
 */
function lightSelector(selector, prefix) {
  const trimmed = selector.trim();
  if (/^(:root|html)(?![\w-])/.test(trimmed)) return trimmed.replace(/^(:root|html)/, prefix);
  return `:where(${prefix}) ${trimmed}`;
}

/**
 * 手動調整：自動反轉後仍不適合淺色底的少數顏色。
 * 主色（青）與輔色（桃紅）明度約 50%，反轉後不變，當文字或框線在淺色底對比不足，改用較深的同色相。
 */
const GUIDE_MANUAL = `
html.guide-light {
  color-scheme: light;
  --accent-primary: #00607a;
  --accent-secondary: #a3144d;
  --accent-tertiary: #5b21b6;
}

/* 顏色來自變數（步驟的主題色、行內指定的屬性色）的文字，自動轉換看不到實際顏色，在這裡混入黑色壓深 */
:where(html.guide-light) #guideContentRoot .gb-step h4 {
  color: color-mix(in srgb, var(--c) 55%, #000);
}

:where(html.guide-light) #guideContentRoot .gb-weak-chip {
  color: color-mix(in srgb, var(--gb-c, #8a8fb5) 42%, #000);
}

:where(html.guide-light) #guideContentRoot .gb-counter-label {
  color: #0a5a32;
}
`;

const ATLAS_MANUAL = `
html.atlas-light {
  color-scheme: light;
}

/* 地圖畫面與疊在上面的控制鈕、地點卡片維持深色，裡面的文字要用回原本的淺色（否則會繼承到頁面的深色字） */
html.atlas-light .map-stage {
  color: #f4f0e4;
  color-scheme: dark;
}

html.atlas-light .map-stage button {
  color: #f6f1e2;
}

html.atlas-light .map-stage p {
  color: #c6d4cf;
}

html.atlas-light .map-stage a {
  color: #f4d897;
}
`;

/** 要產生的檔案：來源、輸出、選擇器前綴、維持原樣的選擇器、手動調整。 */
export const TARGETS = [
  { source: 'src/styles/main.css', out: 'src/styles/guide-light.css', prefix: 'html.guide-light', keep: GUIDE_KEEP, manual: GUIDE_MANUAL },
  { source: 'public/atlas/atlas.css', out: 'public/atlas/atlas-light.css', prefix: 'html.atlas-light', keep: ATLAS_KEEP, manual: ATLAS_MANUAL },
];

/**
 * @param {string} source 原始 CSS
 * @param {{ prefix?: string, keep?: RegExp, manual?: string, sourceName?: string }} options
 */
export function buildLightCss(source, {
  prefix = 'html.guide-light', keep = GUIDE_KEEP, manual = GUIDE_MANUAL, sourceName = 'main.css',
} = {}) {
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
      const selectors = node.selectors.filter((selector) => !keep.test(selector.trim()));
      if (!selectors.length) return;
      const decls = [];
      const keepColors = keepsOwnColors(node);
      node.each((decl) => {
        if (decl.type !== 'decl' || !COLOR_PROPS.test(decl.prop)) return;
        if (/shadow/.test(decl.prop)) return;
        if (keepColors && /^(color|background(-color)?)$/.test(decl.prop)) return;
        const value = decl.prop === 'color' || TEXT_VARS.test(decl.prop) ? transformTextValue(decl.value) : transformValue(decl.value);
        if (value !== decl.value) decls.push(postcss.decl({ prop: decl.prop, value, important: decl.important }));
      });
      if (!decls.length) return;
      const rule = postcss.rule({ selector: selectors.map((selector) => lightSelector(selector, prefix)).join(',\n') });
      decls.forEach((decl) => rule.append(decl));
      target.append(rule);
    });
  }

  convert(ast, out);
  const header = `/* 由 scripts/build-guide-light.mjs 從 ${sourceName} 產生，請勿手動修改；改完 ${sourceName} 的顏色後重跑腳本。 */\n`;
  return `${header}${out.toString().replace(/\r\n/g, '\n')}\n${manual}`;
}

/** 各輸出檔應有的內容（相對路徑 → 文字）。 */
export function buildAll(read = (rel) => readFileSync(path.join(root, rel), 'utf8')) {
  return new Map(TARGETS.map((target) => [target.out, buildLightCss(read(target.source), {
    ...target, sourceName: path.basename(target.source),
  })]));
}

function main() {
  const files = buildAll();
  if (process.argv.includes('--check')) {
    const stale = [...files].filter(([rel, css]) => {
      const file = path.join(root, rel);
      return !existsSync(file) || readFileSync(file, 'utf8') !== css;
    }).map(([rel]) => rel);
    if (stale.length) {
      console.error(`淺色樣式與來源不同步（${stale.join(', ')}），請執行 node scripts/build-guide-light.mjs`);
      process.exit(1);
    }
    console.log('淺色樣式與來源同步');
    return;
  }
  for (const [rel, css] of files) {
    writeFileSync(path.join(root, rel), css);
    console.log(`寫入 ${rel}（${Buffer.byteLength(css)} bytes）`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
