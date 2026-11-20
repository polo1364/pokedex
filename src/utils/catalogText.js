import { isPlaceholderTranslation } from './i18n.js';
import { versionGroupScore, getVersionGroupDisplayName } from './versions.js';

function usable(entry, field, language) {
  return entry.language?.name?.toLowerCase() === language
    && !isPlaceholderTranslation(entry[field])
    && !/\[VAR[^\]]*\]/i.test(entry[field]);
}

const CJK = '　-〿㐀-鿿＀-￯';
const CJK_GAP = new RegExp(`([${CJK}])\\s+(?=[${CJK}])`, 'g');

/**
 * 整理說明文字：原始資料用換行排版，換成單一空格；
 * 中文字（含全形標點）之間不需要空格，直接接起來（「攜帶後，\n可以回復」→「攜帶後，可以回復」）。
 */
export function cleanFlavorText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').replace(CJK_GAP, '$1').trim();
}

const clean = cleanFlavorText;

/**
 * 取得指定版本的說明文字：先找該版本的繁中，再找該版本的英文。
 * text 永遠是該版本自己的文字——效果會隨版本改變（文柚果在第三世代回復 30 HP，之後是 ¼），
 * 不能拿別的版本的說明頂替。
 *
 * chineseReference 為 true 且該版本只有英文時，另外附上 reference：其他版本的繁中說明
 * （最接近的較新版本優先，沒有才用較舊的）與出處版本，給看不懂英文的人參考，畫面上必須標示出處。
 */
export function getVersionedFlavor(entries = [], versionGroup, field = 'text', { chineseReference = false } = {}) {
  const own = entries.filter((candidate) => candidate.version_group?.name === versionGroup);
  const zh = own.find((candidate) => usable(candidate, field, 'zh-hant'));
  if (zh) return { text: clean(zh[field]), language: 'zh-hant', versionGroup };

  const en = own.find((candidate) => usable(candidate, field, 'en'));
  if (!en) return { text: '此版本尚無效果說明', language: '', versionGroup };

  const result = { text: clean(en[field]), language: 'en', versionGroup };
  if (chineseReference) {
    const base = versionGroupScore(versionGroup);
    const rank = (candidate) => {
      const diff = versionGroupScore(candidate.version_group?.name) - base;
      return diff > 0 ? diff : 1000 - diff;
    };
    const other = entries
      .filter((candidate) => candidate.version_group?.name && candidate.version_group.name !== versionGroup
        && usable(candidate, field, 'zh-hant'))
      .sort((a, b) => rank(a) - rank(b))[0];
    if (other) result.reference = { text: clean(other[field]), versionGroup: other.version_group.name };
  }
  return result;
}

function escapeText(text) {
  return String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** 道具頁與招式機頁共用：中文參考的 HTML（出處標籤＋說明）。 */
export function renderChineseReference(reference) {
  return `<span class="catalog-reference-tag" title="這個版本沒有中文說明；效果可能隨版本改變，請以上方本版原文為準">中文參考・${escapeText(getVersionGroupDisplayName(reference.versionGroup))}</span>${escapeText(reference.text)}`;
}
