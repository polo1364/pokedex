/**
 * 攻略共用邏輯（不含任何攻略資料）。
 * 首頁、聊天元件等只需要版本清單或這些輔助函式的地方匯入本檔，
 * 就不會把所有版本的攻略資料一起打包進去。
 */
import { GUIDE_VERSIONS } from './guideVersions.js';
import { VERSION_DLC_PLACEHOLDERS } from './versionDlc.js';

/**
 * 把另外撰寫的擴充內容與尚無資料的 DLC 暫位項目併入攻略。
 * @param {object} guide
 * @param {string} versionId
 * @param {object[]} authored 另外撰寫的擴充內容（如關都、對戰開拓區）
 */
export function attachDlcPlaceholders(guide, versionId, authored = []) {
  if (!guide) return null;

  const defaults = VERSION_DLC_PLACEHOLDERS[versionId] || [];
  const authoredIds = new Set(authored.map((expansion) => expansion.id));
  const existing = [
    ...(guide.expansions || []).filter((expansion) => !authoredIds.has(expansion.id)),
    ...authored,
  ].map((expansion) => expansion.sources?.length
    ? { ...expansion, chapterNavigation: true }
    : expansion);
  const existingIds = new Set(existing.map((e) => e.id));
  const merged = [
    ...existing,
    ...defaults.filter((d) => !existingIds.has(d.id)),
  ];

  if (!merged.length && !existing.length) return guide;
  return { ...guide, expansions: merged.length ? merged : existing };
}

export function getAllGuideVersions() {
  return GUIDE_VERSIONS;
}

/**
 * 由已載入的資料組出完整攻略；沒有攻略資料的版本回傳只有基本資訊的暫位攻略。
 * @param {string} versionId
 * @param {object|null} base 該版本的攻略本體
 * @param {object[]} authored 另外撰寫的擴充內容
 */
export function assembleGuide(versionId, base, authored = []) {
  if (base) return attachDlcPlaceholders(base, versionId, authored);

  const meta = GUIDE_VERSIONS.find((v) => v.id === versionId);
  if (!meta) return null;

  return attachDlcPlaceholders({
    id: meta.id,
    title: meta.title,
    displayGeneration: meta.displayGeneration,
    status: meta.status,
    gyms: [],
  }, versionId, authored);
}

/** 朱／紫：本體加上三條主線的章節與對戰。 */
export function composeScarletViolet(guide, story) {
  return {
    ...guide,
    sections: [...(guide.sections || []), ...story.sections],
    adventureBattles: story.battles,
    sources: [...(guide.sources || []), ...(story.sources || [])],
    chapterNavigation: true,
  };
}

/** 傳說 Z-A：啟用章節導覽。 */
export function composeLegendsZa(guide) {
  return { ...guide, chapterNavigation: true };
}

export function isPlaceholder(versionId) {
  const meta = GUIDE_VERSIONS.find((v) => v.id === versionId);
  return !meta || meta.status === 'placeholder';
}

export function getVersionMeta(versionId) {
  return GUIDE_VERSIONS.find((v) => v.id === versionId) ?? null;
}

/**
 * @param {string} battleRef - gym:1 | league | expansion:sevii:1 | eliteFour:2 | champion
 * @param {object} guide
 */
export function resolveBattle(battleRef, guide) {
  if (!guide || !battleRef) return null;
  if (battleRef === 'league') return guide.league ?? null;
  if (battleRef === 'champion') return guide.champion ?? null;

  const expansionMatch = battleRef.match(/^expansion:([^:]+):(\d+)$/);
  if (expansionMatch) {
    const [, expId, orderStr] = expansionMatch;
    const order = parseInt(orderStr, 10);
    const expansion = guide.expansions?.find((e) => e.id === expId);
    return expansion?.gyms?.find((b) => b.order === order) ?? null;
  }

  const [role, orderStr] = battleRef.split(':');
  const order = parseInt(orderStr, 10);
  if (role === 'gym') return guide.gyms?.find((b) => b.order === order) ?? null;
  if (role === 'noble') return guide.nobles?.find((b) => b.order === order) ?? null;
  if (role === 'eliteFour') return guide.eliteFour?.find((b) => b.order === order) ?? null;
  if (role === 'story') return guide.storyBattles?.find((b) => b.order === order) ?? null;
  if (role === 'adventure') return guide.adventureBattles?.find((b) => b.order === order) ?? null;
  return null;
}

/** @param {object} guide */
export function getLeagueOpponents(guide) {
  const list = [];
  guide.eliteFour?.forEach((b) => list.push({ battle: b, battleRef: `eliteFour:${b.order}` }));
  guide.storyBattles?.forEach((b) => list.push({ battle: b, battleRef: `story:${b.order}` }));
  if (guide.champion) list.push({ battle: guide.champion, battleRef: 'champion' });
  return list;
}

/**
 * 本體攻略是否已有道館或聯盟內容
 * @param {object} guide
 */
export function hasMainGuideContent(guide) {
  if (!guide) return false;
  if (guide.gyms?.length > 0 || guide.nobles?.length > 0) return true;
  if (guide.sections?.length || guide.prerequisites?.length || guide.hms?.length) return true;
  return Boolean(guide.league?.recommendedTeams?.length);
}

/**
 * 擴充地區是否已有攻略內容（道館或聯盟）
 * @param {object} expansion
 */
export function hasExpansionContent(expansion) {
  if (!expansion) return false;
  if (expansion.gyms?.length > 0) return true;
  if (expansion.sections?.length || expansion.prerequisites?.length || expansion.hms?.length) return true;
  const league = expansion.league;
  return Boolean(league?.recommendedTeams?.length);
}

/**
 * 攻略頁書籤：本體 + DLC／擴充地區（含尚無資料的暫位項目）
 * @param {object} guide
 * @returns {{ id: string, label: string, isPlaceholder?: boolean }[] | null}
 */
export function getGuidePartTabs(guide) {
  if (!guide) return null;

  const expansions = guide.expansions || [];
  if (!expansions.length) return null;

  const tabs = [{ id: 'main', label: guide.mainPartLabel || '本體' }];
  expansions.forEach((e) => {
    tabs.push({
      id: e.id,
      label: e.tabLabel || e.title,
      isPlaceholder: !hasExpansionContent(e),
    });
  });

  return tabs.length > 1 ? tabs : null;
}

/** @param {object} guide @param {string} partId */
export function getGuideExpansion(guide, partId) {
  if (!guide || !partId || partId === 'main') return null;
  return guide.expansions?.find((e) => e.id === partId) ?? null;
}

export { GUIDE_VERSIONS };
