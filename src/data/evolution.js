import { formatEvolutionDetails } from '../utils/i18n.js';

export function buildEvolutionTree(evo) {
  const speciesId = parseInt(evo.species.url.split('/').slice(-2, -1)[0], 10);
  return {
    speciesId,
    name: evo.species.name,
    methods: evo.evolution_details || [],
    children: (evo.evolves_to || []).map((child) => buildEvolutionTree(child)),
  };
}

export function renderEvolutionNode(node, getPokemonBySpeciesId, depth = 0) {
  const pokemon = getPokemonBySpeciesId(node.speciesId);
  const methodText = formatEvolutionDetails(node.methods);
  const img = pokemon?.image || '';
  const name = pokemon?.chineseName || node.name;

  let html = `<div class="evolution-branch" data-depth="${depth}">`;
  if (depth > 0) html += '<div class="evolution-arrow">→</div>';
  html += `<div class="evolution-item">
    <img class="evolution-image" src="${img}" alt="${name}" loading="lazy">
    <div class="evolution-name">${name}</div>
    ${methodText ? `<div class="evolution-method">${methodText}</div>` : ''}
  </div>`;

  if (node.children.length === 1) {
    html += renderEvolutionNode(node.children[0], getPokemonBySpeciesId, depth + 1);
  } else if (node.children.length > 1) {
    html += '<div class="evolution-fork">';
    for (const child of node.children) {
      html += renderEvolutionNode(child, getPokemonBySpeciesId, depth + 1);
    }
    html += '</div>';
  }
  html += '</div>';
  return html;
}

export function renderEvolutionTree(tree, getPokemonBySpeciesId) {
  return `<div class="evolution-tree">${renderEvolutionNode(tree, getPokemonBySpeciesId, 0)}</div>`;
}
