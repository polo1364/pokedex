import { typeNamesCN } from '../config.js';
import { getValidChineseName, isPlaceholderTranslation } from './i18n.js';
import { formatSlug, getItemSpriteUrl, VERSION_GROUP_TO_GEN } from './items.js';
import { versionGroupScore } from './versions.js';

export const KIND_LABELS_CN = {
  TM: '招式學習器',
  HM: '秘傳機器',
  TR: '招式記錄',
};

export const KIND_COLORS = {
  TM: '#58a6ff',
  HM: '#3fb950',
  TR: '#a371f7',
};

export const KIND_TIPS_CN = {
  TM: '單次使用的招式學習器，教會相容寶可夢對應招式',
  HM: '可反覆使用的秘傳機器，部分世代需取得對應徽章',
  TR: '第八世代劍盾的招式記錄，使用後消失',
};

const SLUG_RE = /^(tm|hm|tr)(\d+)$/i;

export function parseMachineSlug(slug) {
  const match = SLUG_RE.exec(slug || '');
  if (!match) return null;
  const kind = match[1].toUpperCase();
  if (!KIND_LABELS_CN[kind]) return null;
  return { kind, number: parseInt(match[2], 10) };
}

function padNumber(kind, number) {
  if (kind === 'TR') return String(number).padStart(2, '0');
  return String(number).padStart(2, '0');
}

export function formatMachineLabel(kind, number) {
  const label = KIND_LABELS_CN[kind] || kind;
  return `${label} ${padNumber(kind, number)}`;
}

export function pickMachineForGen(machines, gen) {
  const inGen = (machines || []).filter(
    (m) => VERSION_GROUP_TO_GEN[m.version_group?.name] === gen,
  );
  if (!inGen.length) return null;
  return inGen.reduce((best, cur) => (
    versionGroupScore(cur.version_group.name) >= versionGroupScore(best.version_group.name)
      ? cur : best
  ));
}

function resolveMoveNames(moveData, moveSlug) {
  const zh = getValidChineseName(moveData?.names);
  const enFormatted = formatSlug(moveSlug);
  const hasChineseMoveName = Boolean(zh);
  const moveNameZh = zh || enFormatted;
  return {
    moveName: moveNameZh,
    moveNameZh,
    hasChineseMoveName,
    moveNameEn: enFormatted,
  };
}

/** 招式 flavor 說明（繁中，取最新 version group） */
export function getMoveEffectText(moveData) {
  const entries = moveData?.flavor_text_entries?.filter(
    (entry) => entry.language?.name?.toLowerCase() === 'zh-hant',
  ) || [];
  if (!entries.length) return '無繁中效果說明';

  const latest = entries.reduce((best, cur) => {
    const curScore = versionGroupScore(cur.version_group?.name);
    const bestScore = versionGroupScore(best.version_group?.name);
    return curScore >= bestScore ? cur : best;
  });

  const text = latest.flavor_text
    .replace(/\s+/g, ' ')
    .replace(/\[VAR[^\]]*]/gi, '對手')
    .trim();
  return isPlaceholderTranslation(text) ? '無繁中效果說明' : text;
}

export function buildMachineEntry(itemData, slug, gen, machineRef, moveData) {
  const parsed = parseMachineSlug(slug);
  if (!parsed) return null;

  const { kind, number } = parsed;
  const moveSlug = moveData?.name || '';
  const type = moveData?.type?.name || 'normal';
  const names = resolveMoveNames(moveData, moveSlug);
  const sprite = getItemSpriteUrl(itemData, slug);
  const hasSprite = Boolean(itemData?.sprites?.default);
  const moveEffect = getMoveEffectText(moveData);

  return {
    kind,
    kindLabel: KIND_LABELS_CN[kind],
    number,
    itemSlug: slug,
    displayLabel: formatMachineLabel(kind, number),
    moveSlug,
    moveName: names.moveName,
    moveNameZh: names.moveNameZh,
    hasChineseMoveName: names.hasChineseMoveName,
    moveNameEn: names.moveNameEn,
    moveEffect,
    type,
    typeLabel: typeNamesCN[type] || type,
    generation: gen,
    versionGroup: machineRef?.version_group?.name || '',
    sprite: hasSprite ? sprite : '',
    spriteFallback: sprite,
    placeholderIcon: '💿',
  };
}

export function cssSafeKind(kind) {
  return (kind || 'tm').toLowerCase();
}
