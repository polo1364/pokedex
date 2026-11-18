import itemPaths from '../data/itemSpritePaths.json' with { type: 'json' };
import itemOverrides from '../data/itemSpriteOverrides.json' with { type: 'json' };
import { escapeHtml } from './infoCards.js';

const SPRITE_ROOT = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/';

/** Only use identities found in the source inventory. A category emoji is not an item image. */
export function getItemIcon(item) {
  if (item.historicalName) return '';
  if (itemOverrides[item.slug]) return itemOverrides[item.slug];
  return itemPaths[item.slug] ? `${SPRITE_ROOT}${itemPaths[item.slug]}` : '';
}

export function getMachineIcon(entry) {
  if (entry.kind === 'TR') {
    return Number.isInteger(entry.number) && entry.number >= 0 && entry.number <= 99
      ? `./catalog-icons/machines/tr${String(entry.number).padStart(2, '0')}.png` : '';
  }
  const kind = entry.kind?.toLowerCase();
  if (!['tm', 'hm'].includes(kind) || !entry.type) return '';
  const filename = `${kind}-${entry.type}.png`;
  return itemPaths[`${kind}-${entry.type}`] ? `./catalog-icons/machines/${filename}` : '';
}

function missingIcon(label, historical = false) {
  return `<span class="catalog-icon-missing" role="img" aria-label="${escapeHtml(label)}：無對應圖示">${historical ? '舊版缺圖' : '暫無圖示'}</span>`;
}

export function renderCatalogIcon(url, label, { historical = false } = {}) {
  if (!url) return missingIcon(label, historical);
  return `<img class="item-card-sprite" src="${escapeHtml(url)}" alt="${escapeHtml(label)}圖示"
    title="對應道具的圖鑑圖片，非各代原版介面" loading="lazy" width="48" height="48"
    data-catalog-icon="${escapeHtml(label)}">`;
}

export function bindCatalogIconFallbacks(container) {
  container.querySelectorAll('img[data-catalog-icon]').forEach((img) => {
    if (img.dataset.iconBound) return;
    img.dataset.iconBound = 'true';
    const onError = () => {
      const placeholder = document.createElement('span');
      placeholder.className = 'catalog-icon-missing';
      placeholder.setAttribute('role', 'img');
      placeholder.setAttribute('aria-label', `${img.dataset.catalogIcon}：圖片載入失敗`);
      placeholder.textContent = '圖片未載入';
      img.replaceWith(placeholder);
    };
    img.addEventListener('error', onError, { once: true });
    // Cached failures can finish before the card's event handlers are attached.
    if (img.complete && img.naturalWidth === 0) onError();
  });
}
