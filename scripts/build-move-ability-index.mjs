#!/usr/bin/env node
/**
 * 產生招式與特性圖鑑頁用的精簡索引：
 *   public/data/moves-index.json      全部招式（名稱、屬性、分類、威力、命中、PP、世代、說明）
 *   public/data/abilities-index.json  主系列特性（名稱、世代、說明）
 *
 * 可學會某招式的寶可夢清單很大（最多 300+ 筆），不放進索引，改在頁面展開時才向 PokéAPI 取得。
 * 擁有某特性的寶可夢則直接用 species-index.json 的特性欄位計算。
 *
 * 用法：node scripts/build-move-ability-index.mjs（約 1 分鐘）
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://pokeapi.co/api/v2';
const CONCURRENCY = 12;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'data');

async function getJson(url, attempt = 1) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'pokedex-index-builder' } });
    // 清單中偶有已失效的條目，直接略過（呼叫端統計數量）
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (attempt >= 4) throw new Error(`${url}: ${err.message}`);
    await new Promise((r) => setTimeout(r, 500 * attempt));
    return getJson(url, attempt + 1);
  }
}

const idFromUrl = (url) => parseInt(url.split('/').filter(Boolean).pop(), 10);
const byLang = (list, lang) => list?.filter((x) => x.language?.name?.toLowerCase() === lang) || [];
const clean = (text) => String(text || '').replace(/[\s­]+/g, ' ').replace(/ ?([，。、！？：；）」])/g, '$1').trim();

/** 說明文字：取最新一筆繁中；沒有時保留英文並標記 en。 */
function description(entries, field = 'flavor_text') {
  const zh = byLang(entries, 'zh-hant');
  if (zh.length) return { d: clean(zh[zh.length - 1][field]).replace(/ /g, '') };
  const en = byLang(entries, 'en');
  if (en.length) return { d: clean(en[en.length - 1][field]), en: 1 };
  return { d: '' };
}

function name(names, slug) {
  return byLang(names, 'zh-hant')[0]?.name || null;
}

async function pool(items, worker) {
  const out = new Array(items.length);
  let next = 0;
  let done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await worker(items[i]);
      done += 1;
      if (done % 100 === 0 || done === items.length) process.stdout.write(`\r${done}/${items.length}`);
    }
  }));
  process.stdout.write('\n');
  return out;
}

async function buildMoves() {
  const { count } = await getJson(`${API}/move?limit=0`);
  const list = await getJson(`${API}/move?limit=${count}`);
  const moves = await pool(list.results, async (item) => {
    const m = await getJson(item.url);
    if (!m) return null;
    const zh = name(m.names, m.name);
    const enName = byLang(m.names, 'en')[0]?.name || m.name;
    const entry = {
      id: m.id,
      n: m.name,
      zh: zh || enName,
      t: m.type?.name || 'unknown',
      c: m.damage_class?.name || 'status',
      p: m.power ?? null,
      a: m.accuracy ?? null,
      pp: m.pp ?? null,
      g: idFromUrl(m.generation.url),
      ...description(m.flavor_text_entries),
    };
    if (!zh) entry.noZh = 1;
    return entry;
  });
  const missing = moves.filter((m) => !m).length;
  if (missing) console.log(`略過 ${missing} 筆已失效（404）的招式`);
  // 排除暗影招式（XD／Colosseum 專用）與沒有世代的資料
  return moves.filter((m) => m && m.t !== 'shadow' && m.g).sort((a, b) => a.id - b.id);
}

async function buildAbilities() {
  const { count } = await getJson(`${API}/ability?limit=0`);
  const list = await getJson(`${API}/ability?limit=${count}`);
  const abilities = await pool(list.results, async (item) => {
    const a = await getJson(item.url);
    if (!a || !a.is_main_series) return null;
    const zh = name(a.names, a.name);
    const enName = byLang(a.names, 'en')[0]?.name || a.name;
    return {
      id: a.id,
      n: a.name,
      zh: zh || enName,
      g: idFromUrl(a.generation.url),
      ...description(a.flavor_text_entries),
      ...(zh ? {} : { noZh: 1 }),
    };
  });
  return abilities.filter(Boolean).sort((a, b) => a.id - b.id);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const generatedAt = new Date().toISOString().slice(0, 10);

  console.log('招式');
  const moves = await buildMoves();
  await writeFile(path.join(outDir, 'moves-index.json'),
    `${JSON.stringify({ version: 1, generatedAt, count: moves.length, entries: moves })}\n`);
  console.log(`寫入 moves-index.json：${moves.length} 筆（繁中名 ${moves.filter((m) => !m.noZh).length}、英文說明 ${moves.filter((m) => m.en).length}）`);

  console.log('特性');
  const abilities = await buildAbilities();
  await writeFile(path.join(outDir, 'abilities-index.json'),
    `${JSON.stringify({ version: 1, generatedAt, count: abilities.length, entries: abilities })}\n`);
  console.log(`寫入 abilities-index.json：${abilities.length} 筆（繁中名 ${abilities.filter((a) => !a.noZh).length}、英文說明 ${abilities.filter((a) => a.en).length}）`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
