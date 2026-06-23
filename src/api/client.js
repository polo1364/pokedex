import { getCache, setCache } from './cache.js';
import { CONCURRENCY_LIMIT } from '../config.js';

export async function fetchJson(url, cacheKey) {
  if (cacheKey) {
    const cached = await getCache(cacheKey);
    if (cached) return cached;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${url}`);
  }
  const data = await response.json();
  if (cacheKey) await setCache(cacheKey, data);
  return data;
}

export async function runPool(items, worker, limit = CONCURRENCY_LIMIT) {
  const results = [];
  let index = 0;

  async function run() {
    while (index < items.length) {
      const i = index++;
      try {
        results[i] = await worker(items[i], i);
      } catch (err) {
        results[i] = { error: err };
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}
