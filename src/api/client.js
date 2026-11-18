import { getCache, setCache } from './cache.js';
import { CONCURRENCY_LIMIT } from '../config.js';

const pendingRequests = new Map();

export async function fetchJson(url, cacheKey) {
  const key = JSON.stringify([url, cacheKey]);
  if (pendingRequests.has(key)) return pendingRequests.get(key);

  const request = fetchAndCacheJson(url, cacheKey);
  pendingRequests.set(key, request);
  try {
    return await request;
  } finally {
    // Failed requests must also be removed so callers can retry.
    pendingRequests.delete(key);
  }
}

async function fetchAndCacheJson(url, cacheKey) {
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
