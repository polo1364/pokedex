/**
 * 物種條目的欄位讀取：完整 PokéAPI 資料（entry.pokemon / entry.speciesData）
 * 載入前，改用預先產生的精簡索引（entry.summary，見 scripts/build-species-index.mjs）。
 */
const STAT_INDEX = {
  hp: 0, attack: 1, defense: 2, 'special-attack': 3, 'special-defense': 4, speed: 5,
};

function idFromUrl(url) {
  return parseInt(url?.split('/').filter(Boolean).pop(), 10);
}

export function entryGeneration(entry) {
  const url = entry?.speciesData?.generation?.url;
  if (url) return idFromUrl(url);
  return entry?.summary?.g ?? null;
}

/** 屬性代碼陣列；尚未得知時回傳 null */
export function entryTypes(entry) {
  if (entry?.pokemon?.types) return entry.pokemon.types.map((t) => t.type.name);
  return entry?.summary?.t ?? null;
}

/** 單項種族值；尚未得知時回傳 -1 */
export function entryStat(entry, statName) {
  if (entry?.pokemon?.stats) {
    return entry.pokemon.stats.find((s) => s.stat.name === statName)?.base_stat ?? -1;
  }
  const i = STAT_INDEX[statName];
  return entry?.summary?.s?.[i] ?? -1;
}

/** 種族值總和；尚未得知時回傳 -1 */
export function entryTotalStats(entry) {
  if (entry?.pokemon?.stats) return entry.pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  return entry?.summary?.s ? entry.summary.s.reduce((sum, v) => sum + v, 0) : -1;
}

export function entryHeight(entry) {
  return entry?.pokemon?.height ?? entry?.summary?.h ?? -1;
}

export function entryWeight(entry) {
  return entry?.pokemon?.weight ?? entry?.summary?.w ?? -1;
}

export function entryCaptureRate(entry) {
  return entry?.speciesData?.capture_rate ?? entry?.summary?.cr ?? null;
}

/** 此物種所有形態的 pokemon id（含預設形態） */
export function entryVarietyIds(entry) {
  const varieties = entry?.speciesData?.varieties;
  if (varieties?.length) return varieties.map((v) => idFromUrl(v.pokemon.url));
  return entry?.summary?.v || [entry?.summary?.p || entry?.id].filter(Boolean);
}

/** 由精簡索引的一筆資料建立物種條目（未載入完整資料） */
export function entryFromSummary(summary, baseUrl) {
  const pokemonId = summary.p || summary.id;
  return {
    id: summary.id,
    speciesId: summary.id,
    name: summary.n,
    chineseName: summary.zh,
    pokemonUrl: `${baseUrl}/pokemon/${pokemonId}/`,
    loaded: false,
    summary,
  };
}
