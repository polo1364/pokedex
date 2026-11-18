import { isPlaceholderTranslation } from './i18n.js';

/** Only use text from the requested game; English is preferable to a different game's effect. */
export function getVersionedFlavor(entries = [], versionGroup, field = 'text') {
  for (const language of ['zh-hant', 'en']) {
    const entry = entries.find((candidate) => candidate.version_group?.name === versionGroup
      && candidate.language?.name?.toLowerCase() === language
      && !isPlaceholderTranslation(candidate[field])
      && !/\[VAR[^\]]*\]/i.test(candidate[field]));
    if (entry) return { text: entry[field].replace(/\s+/g, ' ').trim(), language, versionGroup };
  }
  return { text: '此版本尚無效果說明', language: '', versionGroup };
}
