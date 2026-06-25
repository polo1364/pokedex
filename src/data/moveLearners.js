import { getCache, setCache } from '../api/cache.js';
import { runPool } from '../api/client.js';
import { DATA_STRATEGY } from '../config.js';
import { bootstrapSpeciesIndex, ensurePokemonLoaded } from './pokemon.js';
import { store } from '../state/store.js';
import { ensureFilterMeta } from '../utils/filterMeta.js';

const FETCH_CONCURRENCY = 25;

let speciesReadyPromise = null;

export async function ensureSpeciesIndexReady(onProgress) {
  if (store.speciesIndex.length > 0) return store.speciesIndex;

  if (!speciesReadyPromise) {
    speciesReadyPromise = bootstrapSpeciesIndex((pct, done, total) => {
      onProgress?.({ phase: 'bootstrap', pct, done, total });
    });
  }

  await speciesReadyPromise;
  return store.speciesIndex;
}

export async function ensureAllPokemonLoaded(onProgress, signal) {
  const total = store.speciesIndex.length;
  const pending = store.speciesIndex.filter((e) => !e.loaded);

  if (!pending.length || DATA_STRATEGY === 'all') {
    onProgress?.({ phase: 'load', done: total, total });
    return;
  }

  let done = total - pending.length;

  await runPool(pending, async (entry) => {
    if (signal?.aborted) return;
    await ensurePokemonLoaded(entry).catch(() => null);
    done += 1;
    onProgress?.({ phase: 'load', done, total });
  }, FETCH_CONCURRENCY);
}

function entryHasMachineMove(entry, moveSlug) {
  if (!entry.loaded || !entry.pokemon) return false;
  const meta = ensureFilterMeta(entry);
  if (!meta) return false;
  return meta.machineSlugs.includes(moveSlug);
}

function buildLearnerFromEntry(entry) {
  const types = (entry.pokemon?.types || []).map((t) => t.type.name);
  return {
    id: entry.id,
    chineseName: entry.chineseName || entry.pokemon?.chineseName || '（無繁中譯名）',
    types,
  };
}

export async function findMoveLearners({ moveSlug }, { onProgress, signal } = {}) {
  if (!moveSlug) return { count: 0, learners: [] };

  const cacheKey = `move_learners_${moveSlug}_v1`;
  const cached = await getCache(cacheKey);
  if (cached?.learners && !signal?.aborted) {
    return { count: cached.learners.length, learners: cached.learners };
  }

  if (signal?.aborted) return { count: 0, learners: [] };

  await ensureSpeciesIndexReady(onProgress);
  if (signal?.aborted) return { count: 0, learners: [] };

  await ensureAllPokemonLoaded(onProgress, signal);
  if (signal?.aborted) return { count: 0, learners: [] };

  const learners = store.speciesIndex
    .filter((entry) => entryHasMachineMove(entry, moveSlug))
    .map(buildLearnerFromEntry)
    .sort((a, b) => a.id - b.id);

  await setCache(cacheKey, { learners });
  return { count: learners.length, learners };
}
