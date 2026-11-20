import { typeNamesCN } from '../config.js';
import { getValidChineseName } from './i18n.js';
import { formatSlug, getItemSpriteUrl, VERSION_GROUP_TO_GEN } from './items.js';
import { versionGroupScore } from './versions.js';
import { getVersionedFlavor } from './catalogText.js';

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
  TM: '教會相容寶可夢對應招式；是否消耗依遊戲版本而異',
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

export function getMoveEffectText(moveData, versionGroup) {
  return getVersionedFlavor(moveData?.flavor_text_entries, versionGroup, 'flavor_text').text;
}

export function getMoveTypeForVersion(moveData, versionGroup) {
  const score = versionGroupScore(versionGroup);
  if (score < 0) return '';
  const changes = (moveData?.past_values || [])
    .filter((change) => change.type && versionGroupScore(change.version_group?.name) > score)
    .sort((a, b) => versionGroupScore(a.version_group.name) - versionGroupScore(b.version_group.name));
  return changes[0]?.type?.name || moveData?.type?.name || '';
}

export function buildMachineEntry(itemData, slug, gen, machineRef, moveData) {
  const parsed = parseMachineSlug(slug);
  if (!parsed) return null;

  const { kind, number } = parsed;
  const moveSlug = moveData?.name || '';
  const type = getMoveTypeForVersion(moveData, machineRef?.version_group?.name);
  const names = resolveMoveNames(moveData, moveSlug);
  const sprite = getItemSpriteUrl(itemData, slug);
  const hasSprite = Boolean(itemData?.sprites?.default);
  const effect = getVersionedFlavor(moveData?.flavor_text_entries, machineRef?.version_group?.name, 'flavor_text',
    { chineseReference: true });
  const moveEffect = effect.text;

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
    effectLanguage: effect.language,
    effectReference: effect.reference || null,
    type,
    typeLabel: typeNamesCN[type] || type || '屬性未提供',
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
