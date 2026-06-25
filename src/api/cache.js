import { get, set, del, keys } from 'idb-keyval';
import { CACHE_PREFIX, CACHE_DURATION } from '../config.js';

let cacheErrorNotified = false;

export function onCacheError(callback) {
  window.__onCacheError = callback;
}

function notifyCacheError(err) {
  if (!cacheErrorNotified) {
    cacheErrorNotified = true;
    window.__onCacheError?.(err);
  }
}

export async function getCache(key) {
  try {
    const item = await get(CACHE_PREFIX + key);
    if (!item) return null;
    const { data, timestamp } = item;
    if (Date.now() - timestamp > CACHE_DURATION) {
      await del(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function setCache(key, data) {
  try {
    await set(CACHE_PREFIX + key, { data, timestamp: Date.now() });
  } catch (e) {
    console.warn('Cache storage failed:', e);
    notifyCacheError(e);
  }
}

export async function clearAllCache() {
  const allKeys = await keys();
  const ours = allKeys.filter((k) => String(k).startsWith(CACHE_PREFIX));
  await Promise.all(ours.map((k) => del(k)));
  // legacy localStorage
  Object.keys(localStorage)
    .filter((k) => k.startsWith('pokedex_pro_zh_'))
    .forEach((k) => localStorage.removeItem(k));
  if ('caches' in window) {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map((k) => caches.delete(k)));
  }
  cacheErrorNotified = false;
}
