#!/usr/bin/env node
/**
 * 產生首頁用的精簡物種索引：public/data/species-index.json
 *
 * 首頁原本開啟時要逐一抓 1025 筆 pokemon-species（首次造訪十幾秒以上），
 * 這份索引把網格、篩選、排序需要的欄位預先打包成一個檔案，首頁一次讀完即可顯示。
 * 完整資料（招式、持有道具、圖鑑說明等）仍在背景與開啟詳情時向 PokéAPI 取得。
 *
 * 用法：node scripts/build-species-index.mjs
 * 新世代或 PokéAPI 修正資料後重跑一次並提交產出的 JSON。
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://pokeapi.co/api/v2';
const CONCURRENCY = 12;
const STAT_ORDER = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(root, 'public', 'data', 'species-index.json');

async function getJson(url, attempt = 1) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'pokedex-index-builder' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (attempt >= 4) throw new Error(`${url}: ${err.message}`);
    await new Promise((r) => setTimeout(r, 500 * attempt));
    return getJson(url, attempt + 1);
  }
}

const idFromUrl = (url) => parseInt(url.split('/').filter(Boolean).pop(), 10);

/** 與 src/utils/i18n.js getChineseName 相同規則：只採用 zh-hant。 */
function zhHant(names) {
  return names?.find((n) => n.language?.name?.toLowerCase() === 'zh-hant')?.name || '（無繁中譯名）';
}

const ARTWORK_PREFIX = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

/** 形態分類：超級進化／原始回歸、地區形態、超極巨化、其他。 */
export function formKind(slug, form) {
  if (form?.is_mega || /-(mega|primal)(-|$)/.test(slug)) return 'mega';
  if (/-gmax$/.test(slug)) return 'gmax';
  if (/-(alola|galar|hisui|paldea)(-|$)/.test(slug)) return 'regional';
  return 'other';
}

/** 非預設形態：屬性、種族值、特性與繁中形態名，供首頁「顯示形態」使用。 */
async function buildForm(pokemonUrl, speciesId) {
  const pokemon = await getJson(pokemonUrl);
  const formRef = pokemon.forms?.[0];
  const form = formRef ? await getJson(formRef.url) : null;
  const statMap = Object.fromEntries(pokemon.stats.map((s) => [s.stat.name, s.base_stat]));
  const art = pokemon.sprites?.other?.['official-artwork']?.front_default
    || pokemon.sprites?.other?.home?.front_default
    || pokemon.sprites?.front_default
    || null;
  const zhForm = form?.form_names?.find((n) => n.language?.name?.toLowerCase() === 'zh-hant')?.name
    || form?.names?.find((n) => n.language?.name?.toLowerCase() === 'zh-hant')?.name
    || null;
  const entry = {
    id: pokemon.id,
    sp: speciesId,
    n: pokemon.name,
    k: formKind(pokemon.name, form),
    t: pokemon.types.sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
    s: STAT_ORDER.map((k) => statMap[k] ?? 0),
    h: pokemon.height,
    w: pokemon.weight,
    a: pokemon.abilities.sort((x, y) => x.slot - y.slot)
      .map((x) => (x.is_hidden ? `*${x.ability.name}` : x.ability.name)),
  };
  if (zhForm) entry.fz = zhForm;
  // 圖片不是標準官方立繪路徑時才記錄（相對於 sprites/pokemon/）
  if (art && art !== `${ARTWORK_PREFIX}other/official-artwork/${pokemon.id}.png`) {
    entry.img = art.startsWith(ARTWORK_PREFIX) ? art.slice(ARTWORK_PREFIX.length) : art;
  }
  if (!art) entry.img = '';
  return entry;
}

async function buildEntry(item) {
  const species = await getJson(item.url);
  const defaultVariety = species.varieties.find((v) => v.is_default) || species.varieties[0];
  const pokemon = await getJson(defaultVariety.pokemon.url);
  const statMap = Object.fromEntries(pokemon.stats.map((s) => [s.stat.name, s.base_stat]));

  const entry = {
    id: species.id,
    n: species.name,
    zh: zhHant(species.names),
    g: idFromUrl(species.generation.url),
    t: pokemon.types.sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
    s: STAT_ORDER.map((k) => statMap[k] ?? 0),
    h: pokemon.height,
    w: pokemon.weight,
    cr: species.capture_rate,
    // 特性：隱藏特性前綴 *；蛋群代碼
    a: pokemon.abilities.sort((x, y) => x.slot - y.slot)
      .map((x) => (x.is_hidden ? `*${x.ability.name}` : x.ability.name)),
    eg: species.egg_groups.map((g) => g.name),
  };
  const defaultId = idFromUrl(defaultVariety.pokemon.url);
  if (defaultId !== species.id) entry.p = defaultId;
  if (species.varieties.length > 1) entry.v = species.varieties.map((v) => idFromUrl(v.pokemon.url));
  const forms = [];
  for (const v of species.varieties) {
    if (v.is_default) continue;
    forms.push(await buildForm(v.pokemon.url, species.id));
  }
  return { entry, forms };
}

async function main() {
  const { count } = await getJson(`${API}/pokemon-species?limit=0`);
  const list = await getJson(`${API}/pokemon-species?limit=${count}`);
  const items = list.results;
  const entries = new Array(items.length);
  let next = 0;
  let done = 0;

  const forms = [];
  async function worker() {
    while (next < items.length) {
      const i = next++;
      const built = await buildEntry(items[i]);
      entries[i] = built.entry;
      forms.push(...built.forms);
      done += 1;
      if (done % 100 === 0 || done === items.length) process.stdout.write(`\r${done}/${items.length}`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  process.stdout.write('\n');

  entries.sort((a, b) => a.id - b.id);
  forms.sort((a, b) => a.sp - b.sp || a.id - b.id);
  const kinds = forms.reduce((acc, f) => ({ ...acc, [f.k]: (acc[f.k] || 0) + 1 }), {});
  console.log(`形態 ${forms.length} 種（繁中形態名 ${forms.filter((f) => f.fz).length}）`, kinds);

  // 特性繁中名稱（篩選介面用）；沒有繁中譯名的保留英文代碼
  const abilitySlugs = [...new Set([...entries, ...forms].flatMap((e) => e.a.map((x) => x.replace(/^\*/, ''))))].sort();
  const abilityNames = {};
  let k = 0;
  async function abilityWorker() {
    while (k < abilitySlugs.length) {
      const slug = abilitySlugs[k++];
      const data = await getJson(`${API}/ability/${slug}/`);
      const zh = zhHant(data.names);
      if (zh !== '（無繁中譯名）') abilityNames[slug] = zh;
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, abilityWorker));
  console.log(`特性 ${abilitySlugs.length} 種（繁中 ${Object.keys(abilityNames).length} 種）`);

  const payload = {
    version: 3,
    generatedAt: new Date().toISOString().slice(0, 10),
    count: entries.length,
    stats: STAT_ORDER,
    abilityNames,
    entries,
    forms,
  };
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, `${JSON.stringify(payload)}\n`);
  console.log(`寫入 ${path.relative(root, outFile)}：${entries.length} 筆`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
