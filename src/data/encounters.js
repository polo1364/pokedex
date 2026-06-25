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
};

const ENCOUNTER_VERSION_LABELS = {
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

function fallbackById(prefix, id) {
  return id ? `${prefix} #${id}` : `未知${prefix}`;
}

function encounterVersionLabel(version) {
  const label = ENCOUNTER_VERSION_LABELS[version] || getVersionDisplayName(version);
  return /[A-Za-z]/.test(label) ? `版本 #${versionScore(version) || 0}` : label;
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

  const areaName = zhName(area.names) || fallbackById('區域', areaId);
  const locationName = zhName(location?.names) || fallbackById('地點', locationId || areaId);
  const placeName = areaName && areaName !== locationName ? `${locationName}／${areaName}` : locationName;

  return {
    areaUrl: areaRef.url,
    regionName: zhName(region?.names) || fallbackById('地區', regionId),
    placeName,
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
          minLevel: Infinity,
          maxLevel: 0,
          details: [],
        };

        current.chance += detail.chance ?? 0;
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
