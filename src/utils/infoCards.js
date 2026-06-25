export function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderInfoCard({ label, value, valueHtml, kind, tip, tipHtml, className = '' }) {
  const display = valueHtml || escapeHtml(value);
  const extraClass = className ? ` ${className}` : '';
  const tooltip = tipHtml || escapeHtml(tip);
  return `<div class="info-card info-card--${escapeHtml(kind)}${extraClass}" tabindex="0">
    <div class="info-label">${escapeHtml(label)}<span class="info-tip-icon" aria-hidden="true">ⓘ</span></div>
    <div class="info-value">${display}</div>
    <div class="info-tip" role="tooltip">${tooltip}</div>
  </div>`;
}
