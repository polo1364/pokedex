import { fetchJson, runPool } from '../api/client.js';
import { getValidChineseName } from './i18n.js';
import { getVersionDisplayName, versionScore } from './versions.js';
import { escapeHtml, renderInfoCard } from './infoCards.js';
import { getLatestItemEffect } from './items.js';

const HABITAT_NAMES = {
  cave: '洞窟',
  forest: '森林',
  grassland: '草原',
  mountain: '山地',
  rare: '稀少',
  'rough-terrain': '崎嶇地形',
  sea: '海洋',
  urban: '城市',
  'waters-edge': '水邊',
};

function fallbackName(apiName) {
  if (!apiName) return '—';
  return apiName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getHabitatLabel(speciesData) {
  const key = speciesData?.habitat?.name;
  if (!key) return '—';
  return HABITAT_NAMES[key] || fallbackName(key);
}

export function renderEcologySectionHtml(speciesData) {
  const habitatCard = renderInfoCard({
    label: '棲息地',
    value: getHabitatLabel(speciesData),
    kind: 'habitat',
    tip: '圖鑑棲息地分類，補充生態印象；實際可遇敵地點請看「遇敵地點」分頁。',
  });

  return `<div class="detail-panel detail-section ecology-section">
    <h3 class="section-title">生態資訊</h3>
    <div class="info-grid ecology-grid">${habitatCard}</div>
    <div class="held-items-wrap">
      <h4 class="subsection-title">野生持有道具</h4>
      <div id="heldItemsSection"><p class="tab-hint">載入中...</p></div>
    </div>
  </div>`;
}

function formatVersionBreakdown(details) {
  return details
    .slice()
    .sort((a, b) => versionScore(b.version?.name) - versionScore(a.version?.name))
    .map((d) => ({
      version: getVersionDisplayName(d.version?.name),
      rarity: d.rarity ?? 0,
    }));
}

export async function loadHeldItemCards(pokemon) {
  const heldItems = pokemon?.held_items || [];
  if (!heldItems.length) return [];

  const cards = await runPool(heldItems, async (held) => {
    const data = await fetchJson(held.item.url, `item_${held.item.name}`);
    const zhName = getValidChineseName(data.names);
    const name = zhName || fallbackName(held.item.name);
    const breakdown = formatVersionBreakdown(held.version_details || []);
    const maxRarity = breakdown.reduce((max, d) => Math.max(max, d.rarity), 0);
    return { name, effect: getLatestItemEffect(data), maxRarity, breakdown };
  });

  return cards.filter((item) => item && !item.error);
}

export function renderHeldItemCards(items) {
  if (!items?.length) {
    return '<p class="empty-msg">無野生持有道具資料</p>';
  }

  const cards = items.map((item) => {
    const visibleLimit = 8;
    const versionRows = item.breakdown
      .slice(0, visibleLimit)
      .map((d) => `<div class="held-tip-row"><span>${escapeHtml(d.version)}</span><strong>${escapeHtml(`${d.rarity}%`)}</strong></div>`)
      .join('');
    const more = item.breakdown.length > visibleLimit
      ? `<div class="held-tip-more">另有 ${item.breakdown.length - visibleLimit} 個版本，最高機率 ${escapeHtml(`${item.maxRarity}%`)}</div>`
      : '';
    return `<div class="info-card info-card--held held-card" tabindex="0">
      <div class="info-label">${escapeHtml(item.name)}<span class="info-tip-icon" aria-hidden="true">ⓘ</span></div>
      <div class="info-value">最高 ${escapeHtml(`${item.maxRarity}%`)}</div>
      <div class="held-inline-detail">
        <div class="held-tip">
        <div class="held-tip-section">
          <div class="held-tip-title">道具效果</div>
          <p class="held-tip-effect">${escapeHtml(item.effect)}</p>
        </div>
        <div class="held-tip-section">
          <div class="held-tip-title">持有機率</div>
          <div class="held-tip-versions">${versionRows}${more}</div>
        </div>
        </div>
      </div>
    </div>`;
  }).join('');

  return `<div class="info-grid held-items-grid">${cards}</div>`;
}

export function renderHeldItemsErrorHtml() {
  return `<p class="empty-msg">${escapeHtml('無法載入持有道具資料')}</p>`;
}
