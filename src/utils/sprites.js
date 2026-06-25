import { store } from '../state/store.js';

const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<rect fill="#1a1a2e" width="200" height="200" rx="16"/>' +
    '<text x="100" y="108" text-anchor="middle" fill="#b8b8d1" font-size="48">?</text></svg>'
  );

function pickSprite(pokemon, shiny) {
  if (!pokemon?.sprites) return null;
  const s = pokemon.sprites;
  const artwork = s.other?.['official-artwork']?.front_default;
  const home = s.other?.home?.front_default;
  const showdown = s.other?.showdown?.front_default;
  const dream = s.other?.dream_world?.front_default;
  const front = s.front_default;

  if (shiny) {
    return (
      s.other?.home?.front_shiny ||
      s.other?.['official-artwork']?.front_shiny ||
      artwork ||
      home ||
      s.front_shiny ||
      front ||
      showdown ||
      null
    );
  }
  return artwork || home || front || showdown || dream || null;
}

function getDefaultVarietyPokemon(pokemon) {
  const varieties = pokemon?.speciesData?.varieties;
  if (!varieties?.length) return null;
  const def = varieties.find((v) => v.is_default) || varieties[0];
  const defId = parseInt(def.pokemon.url.split('/').slice(-2, -1)[0], 10);
  if (defId === pokemon.id) return null;
  return store.allPokemon.find((p) => p.id === defId) || null;
}

export function getPokemonImage(pokemon, { shiny = false, allowSpeciesFallback = true } = {}) {
  const direct = pickSprite(pokemon, shiny);
  if (direct) return direct;

  if (allowSpeciesFallback) {
    const fallback = getDefaultVarietyPokemon(pokemon);
    if (fallback) {
      const url = pickSprite(fallback, shiny);
      if (url) return url;
    }
  }

  return PLACEHOLDER;
}

/** 是否使用預設形態圖片作為後備（API 無獨立圖時） */
export function isUsingSpeciesImageFallback(pokemon) {
  if (!pokemon || pickSprite(pokemon, false)) return false;
  return !!getDefaultVarietyPokemon(pokemon);
}

export { PLACEHOLDER };
