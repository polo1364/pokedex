/** 搜尋：支援中文名、英文名（含空白/連字號差異）、編號（可帶 # 或前導 0）。 */
export function matchesSearch(entry, rawQuery) {
  const q = String(rawQuery || '').trim().toLowerCase();
  if (!q) return true;
  if (entry.chineseName?.toLowerCase().includes(q)) return true;
  const normalize = (s) => s.replace(/[\s\-_.'’]/g, '');
  const nq = normalize(q);
  if (nq && entry.name && normalize(entry.name.toLowerCase()).includes(nq)) return true;
  const digits = q.replace(/^#/, '');
  if (/^\d+$/.test(digits)) {
    const n = digits.replace(/^0+(?=\d)/, '');
    return String(entry.dexNumber ?? entry.id).includes(n);
  }
  return false;
}
