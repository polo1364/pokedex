import { fetchJson, runPool } from '../api/client.js';
import { escapeHtml } from '../utils/infoCards.js';
import { getVersionDisplayName, versionScore } from '../utils/versions.js';

const METHOD_NAMES = {
  walk: '行走',
  'old-rod': '舊竿',
  'good-rod': '好竿',
  'super-rod': '厲害竿',
  surf: '衝浪',
  'rock-smash': '碎岩',
  headbutt: '頭錘',
  'dark-grass': '深色草叢',
  'grass-spots': '草叢',
  'cave-spots': '洞窟',
  'bridge-spots': '橋上',
  'super-rod-spots': '釣魚點',
  'surf-spots': '水面',
  'yellow-flowers': '黃花田',
  'purple-flowers': '紫花田',
  'red-flowers': '紅花田',
  'rough-terrain': '崎嶇地形',
  gift: '贈送',
  'gift-egg': '贈送蛋',
  static: '定點',
  pokeflute: '寶可夢之笛',
  'headbutt-low': '頭錘（低）',
  'headbutt-normal': '頭錘',
  'headbutt-high': '頭錘（高）',
  'squirt-bottle': '傑尼龜噴壺',
  'wailmer-pail': '吼吼鯨噴壺',
  seaweed: '海藻',
  'roaming-grass': '遊走（草叢）',
  'roaming-water': '遊走（水面）',
  'devon-scope': '得文偵測鏡',
  'feebas-tile-fishing': '醜醜魚釣點',
  'island-scan': '島嶼掃描',
  sos: '求救對戰',
  'bubbling-spots': '冒泡水面',
  'berry-trees': '樹果樹',
  'npc-trade': '交換',
  'sos-from-bubbling-spot': '求救對戰（冒泡水面）',
  overworld: '野外出現',
  'overworld-water': '野外出現（水面）',
  'overworld-flying': '野外出現（飛行）',
  'overworld-special': '野外出現（特殊）',
  'overworld-flying-special': '野外出現（飛行特殊）',
  'overworld-water-special': '野外出現（水面特殊）',
  'overworld-dirt': '野外出現（地面）',
  horde: '群體對戰',
  'hidden-grotto': '隱藏洞穴',
  'honey-tree': '甜甜蜜樹',
  wanderer: '徘徊',
  'wanderer-water': '徘徊（水面）',
  'chase-water': '水面追逐',
  'dynamax-adventure': '極巨大冒險',
  'max-raid': '極巨團體戰',
  'trash-can-ambush': '垃圾桶突襲',
  'rustling-bush-ambush': '晃動草叢突襲',
  'ceiling-ambush': '天花板突襲',
  'ground-ambush': '地面突襲',
  'sky-ambush': '空中突襲',
  snag: '奪取',
  'snag-rematch': '奪取（再戰）',
};

const ENCOUNTER_VERSION_LABELS = {
  'red-japan': '寶可夢 紅（日版）',
  'green-japan': '寶可夢 綠（日版）',
  'blue-japan': '寶可夢 藍（日版）',
  red: '寶可夢 紅',
  blue: '寶可夢 藍',
  yellow: '寶可夢 黃',
  gold: '寶可夢 金',
  silver: '寶可夢 銀',
  crystal: '寶可夢 水晶',
  ruby: '寶可夢 紅寶石',
  sapphire: '寶可夢 藍寶石',
  emerald: '寶可夢 綠寶石',
  firered: '寶可夢 火紅',
  leafgreen: '寶可夢 葉綠',
  diamond: '寶可夢 鑽石',
  pearl: '寶可夢 珍珠',
  platinum: '寶可夢 白金',
  heartgold: '寶可夢 心金',
  soulsilver: '寶可夢 魂銀',
  black: '寶可夢 黑',
  white: '寶可夢 白',
  'black-2': '寶可夢 黑2',
  'white-2': '寶可夢 白2',
  x: '寶可夢 卡洛斯（一）',
  y: '寶可夢 卡洛斯（二）',
  'omega-ruby': '寶可夢 終極紅寶石',
  'alpha-sapphire': '寶可夢 始源藍寶石',
  sun: '寶可夢 太陽',
  moon: '寶可夢 月亮',
  'ultra-sun': '寶可夢 究極之日',
  'ultra-moon': '寶可夢 究極之月',
  'lets-go-pikachu': '寶可夢 走吧！皮卡丘',
  'lets-go-eevee': '寶可夢 走吧！伊布',
  sword: '寶可夢 劍',
  shield: '寶可夢 盾',
  'brilliant-diamond': '寶可夢 晶燦鑽石',
  'shining-pearl': '寶可夢 明亮珍珠',
  'legends-arceus': '寶可夢傳說 阿爾宙斯',
  scarlet: '寶可夢 朱',
  violet: '寶可夢 紫',
  champions: '寶可夢 冠軍賽',
};

function idFromUrl(url) {
  return url?.split('/').filter(Boolean).pop();
}

function zhName(names) {
  return names?.find((n) => n.language?.name?.toLowerCase() === 'zh-hant')?.name || '';
}

function nameByLang(names, lang) {
  return names?.find((n) => n.language?.name?.toLowerCase() === lang)?.name || '';
}

/** 英文地名中常見的道路格式轉成繁中，其餘保留英文（總比只顯示編號好辨認）。 */
function localizeEnglishPlace(name) {
  return name
    .replace(/^Route (\d+)$/i, '$1號道路')
    .replace(/^(.+?) Route (\d+)$/i, '$1 $2號道路');
}

/** PokéAPI 新地區（伽勒爾、帕底亞等）常缺繁中譯名：繁中 → 英文 → 編號。 */
export function placeName(names, prefix, id) {
  const zh = zhName(names);
  if (zh) return zh;
  const en = nameByLang(names, 'en');
  if (en) return localizeEnglishPlace(en);
  return fallbackById(prefix, id);
}

/** 區域名常把地點名當前綴（Giant's Cap (Max Den D)），合併時避免重複。 */
export function combinePlace(locationName, areaName) {
  if (!areaName || areaName === locationName) return locationName;
  if (areaName.startsWith(locationName)) return areaName;
  return `${locationName}／${areaName}`;
}

function fallbackById(prefix, id) {
  return id ? `${prefix} #${id}` : `未知${prefix}`;
}

function encounterVersionLabel(version) {
  const label = ENCOUNTER_VERSION_LABELS[version] || getVersionDisplayName(version);
  return /[A-Za-z]/.test(label) ? `其他版本（${version}）` : label;
}

function methodLabel(name) {
  return METHOD_NAMES[name] || '其他方式';
}

async function resolveLocationArea(areaRef) {
  const areaId = idFromUrl(areaRef.url);
  const area = await fetchJson(areaRef.url, `location_area_${areaId}`);
  const locationId = idFromUrl(area.location?.url);
  const location = area.location?.url
    ? await fetchJson(area.location.url, `location_${locationId}`)
    : null;
  const regionId = idFromUrl(location?.region?.url);
  const region = location?.region?.url
    ? await fetchJson(location.region.url, `region_${regionId}`)
    : null;

  const locationName = placeName(location?.names, '地點', locationId || areaId);
  const areaName = zhName(area.names)
    || (zhName(location?.names) || !area.names?.length ? '' : placeName(area.names, '區域', areaId));
  const combined = combinePlace(locationName, areaName);

  return {
    areaUrl: areaRef.url,
    regionName: placeName(region?.names, '地區', regionId),
    placeName: combined,
  };
}

function detailLabel(detail) {
  const min = detail.min_level ?? '?';
  const max = detail.max_level ?? min;
  const level = min === max ? `等級 ${min}` : `等級 ${min}-${max}`;
  const conditions = detail.condition_values?.length ? '特殊條件' : '';
  return `${level}／${detail.chance ?? 0}%${conditions ? `／${conditions}` : ''}`;
}

export async function getEncounterGroups(pokemon) {
  if (!pokemon?.location_area_encounters) return [];

  const encounters = await fetchJson(pokemon.location_area_encounters, `encounters_${pokemon.id}`);
  if (!encounters?.length) return [];

  const areaRefs = [...new Map(encounters.map((e) => [e.location_area.url, e.location_area])).values()];
  const areaPairs = await runPool(areaRefs, async (areaRef) => [areaRef.url, await resolveLocationArea(areaRef)]);
  const areaMap = new Map(areaPairs.filter((pair) => pair && !pair.error));
  const versionRows = new Map();

  for (const encounter of encounters) {
    const area = areaMap.get(encounter.location_area.url);
    if (!area) continue;

    for (const versionDetail of encounter.version_details || []) {
      const versionKey = versionDetail.version?.name;
      if (!versionKey) continue;

      if (!versionRows.has(versionKey)) versionRows.set(versionKey, new Map());
      const rows = versionRows.get(versionKey);

      for (const detail of versionDetail.encounter_details || []) {
        const method = detail.method?.name || 'unknown';
        const key = `${area.areaUrl}|${method}`;
        const current = rows.get(key) || {
          regionName: area.regionName,
          placeName: area.placeName,
          method: methodLabel(method),
          chance: 0,
          chanceByCondition: new Map(),
          minLevel: Infinity,
          maxLevel: 0,
          details: [],
        };

        // 同一條件下的多個遭遇欄位機率相加；不同條件（時段、天氣、星級）互斥，取最大值。
        const condKey = (detail.condition_values || []).map((c) => c.name).sort().join(',');
        const condSum = (current.chanceByCondition.get(condKey) || 0) + (detail.chance ?? 0);
        current.chanceByCondition.set(condKey, condSum);
        current.chance = Math.min(100, Math.max(...current.chanceByCondition.values()));
        current.minLevel = Math.min(current.minLevel, detail.min_level ?? current.minLevel);
        current.maxLevel = Math.max(current.maxLevel, detail.max_level ?? current.maxLevel);
        current.details.push(detailLabel(detail));
        rows.set(key, current);
      }
    }
  }

  return [...versionRows.entries()]
    .map(([version, rowMap]) => ({
      version,
      label: encounterVersionLabel(version),
      rows: [...rowMap.values()].sort((a, b) =>
        a.regionName.localeCompare(b.regionName, 'zh-Hant')
        || a.placeName.localeCompare(b.placeName, 'zh-Hant')
        || a.method.localeCompare(b.method, 'zh-Hant')
      ),
    }))
    .sort((a, b) => versionScore(b.version) - versionScore(a.version));
}

function renderEncounterRow(row) {
  const min = Number.isFinite(row.minLevel) ? row.minLevel : '?';
  const max = row.maxLevel || min;
  const level = min === max ? `等級 ${min}` : `等級 ${min}-${max}`;
  const detailTip = row.details.slice(0, 10).join('、');
  const more = row.details.length > 10 ? `，另 ${row.details.length - 10} 筆條件` : '';

  return `<div class="encounter-row" title="${escapeHtml(detailTip + more)}">
    <div class="encounter-place">
      <span class="encounter-region">${escapeHtml(row.regionName)}</span>
      <span>${escapeHtml(row.placeName)}</span>
    </div>
    <span class="encounter-method">${escapeHtml(row.method)}</span>
    <span class="encounter-level">${escapeHtml(level)}</span>
    <span class="encounter-chance">${escapeHtml(`${row.chance}%`)}</span>
  </div>`;
}

export function renderEncountersHtml(groups) {
  if (!groups?.length) {
    return '<p class="empty-msg">此形態無野生遇敵紀錄</p>';
  }

  const options = groups.map((group, index) =>
    `<option value="${escapeHtml(group.version)}"${index === 0 ? ' selected' : ''}>${escapeHtml(group.label)}</option>`
  ).join('');

  const panels = groups.map((group, index) => `
    <div class="encounter-version-panel" data-version="${escapeHtml(group.version)}"${index === 0 ? '' : ' hidden'}>
      <div class="encounter-table">
        <div class="encounter-row encounter-row--header">
          <span>地點</span><span>方式</span><span>等級</span><span>機率</span>
        </div>
        ${group.rows.map(renderEncounterRow).join('')}
      </div>
    </div>`
  ).join('');

  return `<div class="encounters-panel">
    <label class="encounter-filter">
      <span>版本</span>
      <select class="encounter-version-select" id="encounterVersionFilter">${options}</select>
    </label>
    ${panels}
  </div>`;
}
