import { BASE_URL, DATA_STRATEGY } from '../config.js';
import { fetchJson, runPool } from '../api/client.js';
import { store } from '../state/store.js';
import { getChineseName } from '../utils/i18n.js';
import { getPokemonImage } from '../utils/sprites.js';

const pokemonCache = new Map();
const speciesCache = new Map();

export async function loadGenerations() {
  const data = await fetchJson(`${BASE_URL}/generation?limit=20`, 'generations_list');
  const gens = await runPool(data.results, async (g) => {
    const id = g.url.split('/').slice(-2, -1)[0];
    return fetchJson(g.url, `generation_${id}`);
  });
  for (const gen of gens) {
    if (gen?.id) store.generationMap[gen.id] = gen.id;
  }
}

export async function bootstrapSpeciesIndex(onProgress) {
  const countEndpoint = DATA_STRATEGY === 'all' ? 'pokemon' : 'pokemon-species';
  const countRes = await fetchJson(`${BASE_URL}/${countEndpoint}?limit=0`, `${countEndpoint}_count`);
  const total = countRes.count;
  const listData = await fetchJson(`${BASE_URL}/${countEndpoint}?limit=${total}`, `${countEndpoint}_list`);

  let completed = 0;
  const report = () => {
    completed++;
    onProgress?.(Math.round((completed / total) * 100), completed, total);
  };

  if (DATA_STRATEGY === 'all') {
    const entries = await runPool(listData.results, async (item) => {
      const id = parseInt(item.url.split('/').slice(-2, -1)[0], 10);
      try {
        const pokemon = await fetchJson(item.url, `pokemon_${id}`);
        const speciesData = await fetchJson(pokemon.species.url, `species_${pokemon.id}`);
        report();
        return {
          id: pokemon.id,
          speciesId: speciesData.id,
          name: pokemon.name,
          chineseName: getChineseName(speciesData.names),
          pokemonUrl: item.url,
          loaded: true,
          pokemon: enrichPokemon(pokemon, speciesData),
          speciesData,
        };
      } catch (err) {
        report();
        return { error: err };
      }
    });
    store.speciesIndex = entries.filter((e) => e && !e.error);
    store.allPokemon = store.speciesIndex.map((e) => e.pokemon);
  } else {
    const entries = await runPool(listData.results, async (item) => {
      const id = parseInt(item.url.split('/').slice(-2, -1)[0], 10);
      try {
        const speciesData = await fetchJson(item.url, `species_${id}`);
        const defaultVariety = speciesData.varieties?.find((v) => v.is_default) || speciesData.varieties?.[0];
        report();
        return {
          id,
          speciesId: id,
          name: item.name,
          chineseName: getChineseName(speciesData.names),
          pokemonUrl: defaultVariety?.pokemon?.url,
          loaded: false,
          speciesData,
        };
      } catch (err) {
        report();
        return { error: err };
      }
    });
    store.speciesIndex = entries.filter((e) => e && !e.error);
    store.allPokemon = [];
  }

  for (const entry of store.speciesIndex) {
    if (entry.speciesData) speciesCache.set(entry.speciesId, entry.speciesData);
    if (entry.pokemon) pokemonCache.set(entry.pokemon.id, entry.pokemon);
  }

  return store.speciesIndex;
}

function enrichPokemon(pokemon, speciesData) {
  pokemon.chineseName = getChineseName(speciesData.names);
  pokemon.speciesData = speciesData;
  pokemon.generation = speciesData.generation;
  return pokemon;
}

export async function ensurePokemonLoaded(entry) {
  if (entry?.loaded && entry.pokemon) return entry.pokemon;
  if (!entry) return null;

  if (entry.pokemon) return entry.pokemon;

  const speciesData = entry.speciesData || speciesCache.get(entry.speciesId) || await fetchJson(
    `${BASE_URL}/pokemon-species/${entry.speciesId}`,
    `species_${entry.speciesId}`
  );
  speciesCache.set(entry.speciesId, speciesData);

  let pokemonUrl = entry.pokemonUrl;
  if (!pokemonUrl) {
    const variety = speciesData.varieties?.find((v) => v.is_default) || speciesData.varieties?.[0];
    pokemonUrl = variety?.pokemon?.url;
  }
  if (!pokemonUrl) throw new Error(`No pokemon URL for species ${entry.speciesId}`);

  const pokemon = await fetchJson(pokemonUrl, `pokemon_${entry.id}`);
  enrichPokemon(pokemon, speciesData);
  entry.pokemon = pokemon;
  entry.loaded = true;
  pokemonCache.set(pokemon.id, pokemon);

  if (!store.allPokemon.find((p) => p.id === pokemon.id)) {
    store.allPokemon.push(pokemon);
  }

  return pokemon;
}

export async function ensurePokemonLoadedById(id) {
  let p = store.allPokemon.find((x) => x.id === id);
  if (p) return p;

  const entry = store.speciesIndex.find((e) => e.id === id || e.speciesId === id);
  if (entry) return ensurePokemonLoaded(entry);

  const pokemon = await fetchJson(`${BASE_URL}/pokemon/${id}`, `pokemon_${id}`);
  const speciesData = await fetchJson(pokemon.species.url, `species_${pokemon.id}`);
  enrichPokemon(pokemon, speciesData);
  if (!store.allPokemon.find((p) => p.id === pokemon.id)) store.allPokemon.push(pokemon);
  pokemonCache.set(pokemon.id, pokemon);
  return pokemon;
}

export async function ensurePokemonBySpeciesId(speciesId) {
  let p = store.allPokemon.find((x) => x.speciesData?.id === speciesId);
  if (p) return p;
  const entry = store.speciesIndex.find((e) => e.speciesId === speciesId);
  if (entry) return ensurePokemonLoaded(entry);
  const speciesData = await fetchJson(`${BASE_URL}/pokemon-species/${speciesId}`, `species_${speciesId}`);
  const variety = speciesData.varieties?.find((v) => v.is_default) || speciesData.varieties?.[0];
  if (!variety?.pokemon?.url) return null;
  const pokemon = await fetchJson(variety.pokemon.url, `pokemon_sp_${speciesId}`);
  enrichPokemon(pokemon, speciesData);
  if (!store.allPokemon.find((x) => x.id === pokemon.id)) store.allPokemon.push(pokemon);
  return pokemon;
}

export function getPokemonBySpeciesId(speciesId) {
  const p = store.allPokemon.find((x) => x.speciesData?.id === speciesId);
  if (!p) return { chineseName: '', image: '', id: speciesId };
  return {
    chineseName: p.chineseName,
    image: getPokemonImage(p),
    id: p.id,
  };
}

export async function fetchPokemonForm(url) {
  const id = parseInt(url.split('/').slice(-2, -1)[0], 10);
  return fetchJson(url, `pokemon_form_${id}`);
}
