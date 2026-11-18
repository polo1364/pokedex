import { getCache, setCache } from '../api/cache.js';
import { fetchJson, runPool } from '../api/client.js';
import { BASE_URL } from '../config.js';
import { getValidChineseName } from '../utils/i18n.js';

export function canLearnMachineMove(pokemon, moveSlug, versionGroup) {
  return Boolean(versionGroup && pokemon?.moves?.some((entry) => entry.move?.name === moveSlug
    && entry.version_group_details?.some((detail) => detail.version_group?.name === versionGroup
      && detail.move_learn_method?.name === 'machine')));
}

/** Include varieties; the learnset must match both the selected game and method. */
export async function findMoveLearners({ moveSlug, versionGroup }, { onProgress, signal } = {}) {
  if (!moveSlug || !versionGroup) throw new Error('請指定招式及遊戲版本');
  signal?.throwIfAborted();
  const cacheKey = `move_learners_${moveSlug}_${versionGroup}_v2`;
  const cached = await getCache(cacheKey);
  if (cached?.learners) return { count: cached.learners.length, learners: cached.learners };

  const move = await fetchJson(`${BASE_URL}/move/${moveSlug}/`, `learners_move_v2_${moveSlug}`);
  if (!Array.isArray(move.learned_by_pokemon)) throw new Error('來源未提供可學習寶可夢索引');
  let done = 0;
  const candidates = [...new Map(move.learned_by_pokemon.map((ref) => [ref.url, ref])).values()];
  const results = await runPool(candidates, async (ref) => {
    signal?.throwIfAborted();
    const pokemon = await fetchJson(ref.url, `learners_pokemon_v2_${ref.name}`);
    signal?.throwIfAborted();
    done += 1;
    onProgress?.({ phase: 'load', done, total: candidates.length });
    if (!canLearnMachineMove(pokemon, moveSlug, versionGroup)) return null;
    const species = await fetchJson(pokemon.species.url, `species_${pokemon.species.name}`);
    const baseName = getValidChineseName(species.names) || pokemon.species.name;
    const variety = species.varieties?.find((entry) => entry.pokemon?.name === pokemon.name);
    // Retain an unambiguous form identifier if a translated form name is unavailable.
    const chineseName = variety?.is_default ? baseName : `${baseName}（${pokemon.name}）`;
    return { id: pokemon.id, chineseName, types: (pokemon.types || []).map((entry) => entry.type.name) };
  }, 25);
  signal?.throwIfAborted();
  const failures = results.filter((result) => result?.error);
  if (failures.length) throw new Error(`尚有 ${failures.length} 項學習資料未載入，請重試`);
  const learners = results.filter(Boolean).sort((a, b) => a.id - b.id);
  await setCache(cacheKey, { learners });
  return { count: learners.length, learners };
}
