#!/usr/bin/env node
/**
 * 把 public/atlas/atlas-data.json（1 MB 以上、含所有版本）拆成按需載入的小檔：
 *   public/atlas/data/index.json        版本清單、各版本有哪些地圖、地圖標題、內容雜湊
 *   public/atlas/data/maps/<id>.json    單一地圖的完整資料
 *
 * atlas-data.json 仍是唯一的編輯來源；改完它（或跑完 build-pokemmo-maps.mjs）後重跑本腳本。
 * 用法：node scripts/split-atlas-data.mjs        產生檔案
 *       node scripts/split-atlas-data.mjs --check 只檢查是否與來源一致（CI／測試用）
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceFile = path.join(root, 'public', 'atlas', 'atlas-data.json');
const outDir = path.join(root, 'public', 'atlas', 'data');
const mapsDir = path.join(outDir, 'maps');

/** 由來源資料算出要輸出的所有檔案內容（相對於 data/ 的路徑 → 文字）。 */
export function buildSplitFiles(atlas) {
  const files = new Map();
  const hash = createHash('sha256');
  const mapIds = Object.keys(atlas.maps).sort();
  for (const id of mapIds) {
    if (!/^[a-z0-9-]+$/.test(id)) throw new Error(`地圖代碼不能當檔名：${id}`);
    const text = `${JSON.stringify(atlas.maps[id])}\n`;
    files.set(`maps/${id}.json`, text);
    hash.update(id).update(text);
  }
  const index = {
    schema: atlas.schema,
    // 內容雜湊：地圖資料有任何變動就會改變，前端用它當快取版本
    dataVersion: hash.digest('hex').slice(0, 12),
    versions: atlas.versions.map(({ id, title, displayGeneration }) => ({ id, title, displayGeneration })),
    versionMaps: atlas.versionMaps,
    mapTitles: Object.fromEntries(mapIds.map((id) => [id, atlas.maps[id].title])),
  };
  files.set('index.json', `${JSON.stringify(index)}\n`);
  return files;
}

function main() {
  const atlas = JSON.parse(readFileSync(sourceFile, 'utf8'));
  const files = buildSplitFiles(atlas);

  if (process.argv.includes('--check')) {
    const stale = [...files].filter(([rel, text]) => {
      const file = path.join(outDir, rel);
      return !existsSync(file) || readFileSync(file, 'utf8') !== text;
    }).map(([rel]) => rel);
    const extra = existsSync(mapsDir)
      ? readdirSync(mapsDir).filter((name) => !files.has(`maps/${name}`))
      : [];
    if (stale.length || extra.length) {
      console.error(`地圖分割檔與 atlas-data.json 不一致，請執行 node scripts/split-atlas-data.mjs\n過期：${stale.join(', ') || '無'}\n多餘：${extra.join(', ') || '無'}`);
      process.exit(1);
    }
    console.log(`地圖分割檔與來源一致（${files.size - 1} 張地圖）`);
    return;
  }

  rmSync(mapsDir, { recursive: true, force: true });
  mkdirSync(mapsDir, { recursive: true });
  let total = 0;
  for (const [rel, text] of files) {
    writeFileSync(path.join(outDir, rel), text);
    total += Buffer.byteLength(text);
  }
  const indexSize = Buffer.byteLength(files.get('index.json'));
  console.log(`寫入 ${files.size - 1} 張地圖＋index.json（index ${indexSize} bytes，合計 ${total} bytes）`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
