import { GUIDE_VERSIONS } from './guideVersions.js';
import { redBlueGuide } from './gen1-red-blue.js';
import { yellowGuide } from './gen1-yellow.js';
import { fireredLeafgreenGuide } from './gen1-firered-leafgreen.js';
import { goldSilverGuide } from './gen2-gold-silver.js';
import { crystalGuide } from './gen2-crystal.js';
import { rubySapphireGuide } from './gen3-ruby-sapphire.js';
import { emeraldGuide } from './gen3-emerald.js';
import { diamondPearlGuide } from './gen4-diamond-pearl.js';
import { platinumGuide } from './gen4-platinum.js';
import { heartgoldSoulsilverGuide } from './gen4-heartgold-soulsilver.js';
import { blackWhiteGuide } from './gen5-black-white.js';
import { black2White2Guide } from './gen5-black-2-white-2.js';
import { xyGuide } from './gen6-x-y.js';
import { omegaRubyAlphaSapphireGuide } from './gen6-omega-ruby-alpha-sapphire.js';
import { sunMoonGuide } from './gen7-sun-moon.js';
import { ultraSunUltraMoonGuide } from './gen7-ultra-sun-ultra-moon.js';
import { swordShieldGuide } from './gen8-sword-shield.js';
import { brilliantDiamondShiningPearlGuide } from './gen8-brilliant-diamond-shining-pearl.js';
import { scarletVioletGuide } from './gen9-scarlet-violet.js';
import { legendsArceusGuide } from './gen8-legends-arceus.js';
import { VERSION_DLC_PLACEHOLDERS } from './versionDlc.js';

/** @type {Record<string, object>} */
const COMPLETE_GUIDES = {
  'red-blue': redBlueGuide,
  yellow: yellowGuide,
  'firered-leafgreen': fireredLeafgreenGuide,
  'gold-silver': goldSilverGuide,
  crystal: crystalGuide,
  'ruby-sapphire': rubySapphireGuide,
  emerald: emeraldGuide,
  'diamond-pearl': diamondPearlGuide,
  platinum: platinumGuide,
  'heartgold-soulsilver': heartgoldSoulsilverGuide,
  'black-white': blackWhiteGuide,
  'black-2-white-2': black2White2Guide,
  'x-y': xyGuide,
  'omega-ruby-alpha-sapphire': omegaRubyAlphaSapphireGuide,
  'sun-moon': sunMoonGuide,
  'ultra-sun-ultra-moon': ultraSunUltraMoonGuide,
  'sword-shield': swordShieldGuide,
  'brilliant-diamond-shining-pearl': brilliantDiamondShiningPearlGuide,
  'scarlet-violet': scarletVioletGuide,
  'legends-arceus': legendsArceusGuide,
};

function attachDlcPlaceholders(guide, versionId) {
  if (!guide) return null;

  const defaults = VERSION_DLC_PLACEHOLDERS[versionId] || [];
  const existing = guide.expansions || [];
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

export function getVersionGuide(versionId) {
  const complete = COMPLETE_GUIDES[versionId];
  if (complete) return attachDlcPlaceholders(complete, versionId);

  const meta = GUIDE_VERSIONS.find((v) => v.id === versionId);
  if (!meta) return null;

  return attachDlcPlaceholders({
    id: meta.id,
    title: meta.title,
    displayGeneration: meta.displayGeneration,
    status: meta.status,
    gyms: [],
  }, versionId);
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
  return null;
}

/** @param {object} guide */
export function getLeagueOpponents(guide) {
  const list = [];
  guide.eliteFour?.forEach((b) => list.push({ battle: b, battleRef: `eliteFour:${b.order}` }));
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

export { GUIDE_VERSIONS } from './guideVersions.js';
