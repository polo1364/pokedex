const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<rect fill="#1a1a2e" width="200" height="200" rx="16"/>' +
    '<text x="100" y="108" text-anchor="middle" fill="#b8b8d1" font-size="48">?</text></svg>'
  );

export function getPokemonImage(pokemon, { shiny = false } = {}) {
  if (!pokemon?.sprites) return PLACEHOLDER;
  const s = pokemon.sprites;
  if (shiny) {
    return (
      s.other?.home?.front_shiny ||
      s.other?.['official-artwork']?.front_default ||
      s.front_shiny ||
      s.front_default ||
      PLACEHOLDER
    );
  }
  return (
    s.other?.['official-artwork']?.front_default ||
    s.other?.home?.front_default ||
    s.front_default ||
    PLACEHOLDER
  );
}

export { PLACEHOLDER };
