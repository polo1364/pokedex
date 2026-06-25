import { MOVE_PAGE_SIZE, statNames, typeColors, typeNamesCN } from '../config.js';
import { fetchJson, runPool } from '../api/client.js';
import { store, toggleFavorite, getFavorites } from '../state/store.js';
import { getChineseName, getLatestZhEntry, getGenerationFromSpecies } from '../utils/i18n.js';
import { getPokemonImage, isUsingSpeciesImageFallback } from '../utils/sprites.js';
import { getVarietyButtons, getVarietyButtonsSync } from '../utils/forms.js';
import { buildTypeChartHtml } from '../utils/typeChart.js';
import {
  getLatestVersionGroupDetail,
  getSpeciesAppearanceGames,
  getVersionDisplayName,
  renderPokedexNumbersHtml,
} from '../utils/versions.js';
import { renderBreedingSectionHtml, renderSpeciesMetaHtml, renderBasicInfoGrid } from '../utils/breeding.js';
import {
  loadHeldItemCards,
  renderEcologySectionHtml,
  renderHeldItemCards,
  renderHeldItemsErrorHtml,
} from '../utils/ecology.js';
import { buildEvolutionTree, renderEvolutionTree, annotateEvolutionTree } from '../data/evolution.js';
import { resolvePokemonById, ensurePokemonBySpeciesId, getPokemonBySpeciesId } from '../data/pokemon.js';
import { getEncounterGroups, renderEncountersHtml } from '../data/encounters.js';

let currentDetailId = null;
let detailGeneration = 0;
let shinyMode = false;
let loadedTabs = new Set();
let currentPokemon = null;

export function openModal(id) {
  showDetail(id);
}

let currentSpeciesEntry = null;

function resetModalScroll() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.scrollTop = 0;
  const content = modal.querySelector('.modal-content');
  if (content) content.scrollTop = 0;
}

function scheduleResetModalScroll() {
  resetModalScroll();
  requestAnimationFrame(() => {
    resetModalScroll();
    requestAnimationFrame(resetModalScroll);
  });
}

function findSpeciesEntry(id) {
  return store.speciesIndex.find((e) => e.id === id || e.speciesId === id)
    || store.speciesIndex.find((e) => e.speciesData?.varieties?.some((v) => {
      const vid = parseInt(v.pokemon.url.split('/').slice(-2, -1)[0], 10);
      return vid === id;
    }));
}

export async function showDetail(id) {
  const speciesEntry = findSpeciesEntry(id);
  let pokemon;
  try {
    pokemon = await resolvePokemonById(id, speciesEntry);
  } catch {
    return;
  }

  currentSpeciesEntry = speciesEntry;
  currentDetailId = pokemon.id;
  const gen = ++detailGeneration;
  currentPokemon = pokemon;
  loadedTabs = new Set();
  shinyMode = false;

  const modal = document.getElementById('modal');
  modal.classList.add('active');
  document.body.classList.add('modal-open');
  resetModalScroll();

  renderModalContent(pokemon, gen);
  scheduleResetModalScroll();

  loadAbilities(pokemon, gen);
  loadVersions(pokemon, gen);
  loadHeldItems(pokemon, gen);
  loadedTabs.add('moves');
  loadMoves(pokemon, gen);
  enrichFormSwitcher(pokemon, gen);
}

async function switchForm(pokemonId) {
  if (pokemonId === currentDetailId) return;
  const activeTabName = document.querySelector('.tab.active')?.dataset.tab || 'moves';

  let pokemon;
  try {
    pokemon = await resolvePokemonById(pokemonId, currentSpeciesEntry);
  } catch {
    return;
  }

  currentDetailId = pokemon.id;
  currentPokemon = pokemon;
  const gen = detailGeneration;
  loadedTabs = new Set();
  shinyMode = false;

  renderModalContent(pokemon, gen);
  scheduleResetModalScroll();
  loadAbilities(pokemon, gen);
  loadVersions(pokemon, gen);
  loadHeldItems(pokemon, gen);
  if (activeTabName === 'moves') {
    loadedTabs.add('moves');
    loadMoves(pokemon, gen);
  } else {
    activateTab(activeTabName, gen, { force: true });
  }
  updateFormSwitcherActive(pokemon.id);

  const active = getVarietyButtonsSync(pokemon.speciesData, pokemon.id).find((b) => b.isActive);
  if (active) {
    const title = document.querySelector('.modal-name');
    if (title) title.textContent = active.label;
  }
}
function renderModalContent(pokemon, gen) {
  const formButtons = getVarietyButtonsSync(pokemon.speciesData, pokemon.id);
  const displayName = formButtons.find((b) => b.isActive)?.label || pokemon.chineseName;
  renderModalHeader(pokemon, displayName);
  renderModalBody(pokemon, gen, formButtons, displayName);
}

async function enrichFormSwitcher(pokemon, gen) {
  const varieties = pokemon.speciesData?.varieties || [];
  if (varieties.length <= 1) return;

  const buttons = await getVarietyButtons(pokemon.speciesData, pokemon.id);
  if (gen !== detailGeneration) return;

  const switcher = document.getElementById('formSwitcher');
  if (!switcher) return;

  switcher.innerHTML = buttons.map((b) =>
    `<button type="button" class="form-btn${b.isActive ? ' active' : ''}" data-pid="${b.pokemonId}">${b.label}</button>`
  ).join('');
  bindFormButtons();

  const active = buttons.find((b) => b.isActive);
  if (active) {
    const title = document.querySelector('.modal-name');
    if (title) title.textContent = active.label;
  }
}

function updateFormSwitcherActive(pokemonId) {
  document.querySelectorAll('.form-btn').forEach((btn) => {
    btn.classList.toggle('active', parseInt(btn.dataset.pid, 10) === pokemonId);
  });
}

function bindFormButtons() {
  document.querySelectorAll('.form-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchForm(parseInt(btn.dataset.pid, 10));
    });
  });
}

function renderModalHeader(pokemon, displayName) {
  const favs = getFavorites();
  const isFav = favs.includes(pokemon.id);
  const name = displayName || pokemon.chineseName;
  const primaryType = pokemon.types[0]?.type?.name || 'normal';
  const accent = typeColors[primaryType] || '#888';
  const speciesMeta = renderSpeciesMetaHtml(pokemon.speciesData);

  document.getElementById('modalHeader').innerHTML = `
    <div class="modal-id">#${pokemon.id.toString().padStart(4, '0')}</div>
    <h2 class="modal-name">${name}</h2>
    ${speciesMeta}
    <div class="pokemon-types">
      ${pokemon.types.map((t) => `<span class="type-badge" style="background:${typeColors[t.type.name]}">${typeNamesCN[t.type.name]}</span>`).join('')}
    </div>
    <div class="modal-actions">
      <button type="button" class="modal-action-btn" id="favoriteBtn" data-fav="${isFav}">${isFav ? '★ 已收藏' : '☆ 收藏'}</button>
      <button type="button" class="modal-action-btn" id="shinyToggleBtn">✨ 閃光</button>
      <button type="button" class="modal-action-btn" id="shareBtn">🔗 分享</button>
    </div>`;

  const modalContent = document.querySelector('.modal-content');
  if (modalContent) modalContent.style.setProperty('--modal-accent', accent);

  document.getElementById('favoriteBtn')?.addEventListener('click', () => {
    const list = toggleFavorite(pokemon.id);
    const btn = document.getElementById('favoriteBtn');
    const on = list.includes(pokemon.id);
    btn.textContent = on ? '★ 已收藏' : '☆ 收藏';
  });
  document.getElementById('shinyToggleBtn')?.addEventListener('click', () => {
    shinyMode = !shinyMode;
    const img = document.querySelector('#modalMainImage');
    if (img) img.src = getPokemonImage(pokemon, { shiny: shinyMode });
  });
  document.getElementById('shareBtn')?.addEventListener('click', () => {
    const url = `${location.origin}${location.pathname}?id=${pokemon.id}`;
    navigator.clipboard?.writeText(url).then(() => alert('連結已複製！'));
  });
}

function renderFlavorHtml(flavorEntry) {
  if (!flavorEntry) return '';
  const text = flavorEntry.flavor_text.replace(/\n/g, '');
  const versionKey = flavorEntry.version?.name;
  const source = versionKey
    ? `<div class="flavor-source">來自：${getVersionDisplayName(versionKey)}</div>`
    : '';
  return `<div class="modal-flavor"><p class="modal-flavor-text">${text}</p>${source}</div>`;
}

function renderModalBody(pokemon, gen, formButtons, displayName) {
  const flavor = getLatestZhEntry(pokemon.speciesData?.flavor_text_entries);
  const maxStat = Math.max(...pokemon.stats.map((s) => s.base_stat), 1);
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const genNum = getGenerationFromSpecies(pokemon.speciesData, store.generationMap) || '—';
  const img = getPokemonImage(pokemon, { shiny: shinyMode });
  const imgFallback = isUsingSpeciesImageFallback(pokemon);
  const primaryType = pokemon.types[0]?.type?.name || 'normal';
  const accent = typeColors[primaryType] || '#888';

  document.getElementById('modalBody').innerHTML = `
    ${formButtons.length ? `<div class="form-switcher" id="formSwitcher">${formButtons.map((b) =>
      `<button type="button" class="form-btn${b.isActive ? ' active' : ''}" data-pid="${b.pokemonId}">${b.label}</button>`
    ).join('')}</div>` : ''}
    <div class="detail-grid">
      <div class="detail-section detail-section--profile">
        <div class="modal-hero" style="--modal-accent: ${accent}">
          <img id="modalMainImage" class="modal-hero-img${imgFallback ? ' form-img-fallback' : ''}" src="${img}" alt="${displayName}">
        </div>
        ${imgFallback ? '<p class="form-img-hint">此形態暫無獨立圖像，顯示預設外觀參考</p>' : ''}
        ${renderFlavorHtml(flavor)}
        ${renderBasicInfoGrid(pokemon, genNum)}
      </div>
      <div class="detail-section detail-section--stats">
        <h3 class="section-title">種族值</h3>
        ${pokemon.stats.map((s) => `
          <div class="stat-item">
            <div class="stat-header"><span class="stat-name">${statNames[s.stat.name]}</span><span class="stat-number">${s.base_stat}</span></div>
            <div class="stat-bar-container"><div class="stat-bar-fill" style="width:${(s.base_stat / maxStat) * 100}%"></div></div>
          </div>`).join('')}
        <div class="stat-total"><span>總和</span><span style="color:var(--accent-primary)">${totalStats}</span></div>
      </div>
    </div>
    ${renderBreedingSectionHtml(pokemon.speciesData)}
    ${renderEcologySectionHtml(pokemon.speciesData)}
    ${renderPokedexNumbersHtml(pokemon.speciesData)}
    <div class="detail-panel detail-section"><h3 class="section-title">特性</h3><div id="abilitiesSection">載入中...</div></div>
    <div class="detail-panel detail-section"><h3 class="section-title">出現版本</h3><div id="versionsSection">載入中...</div></div>
    <div class="detail-panel modal-tabs-wrap">
      <div class="tabs">
        <button type="button" class="tab active" data-tab="moves">可學習招式</button>
        <button type="button" class="tab" data-tab="evolution">進化鏈</button>
        <button type="button" class="tab" data-tab="typechart">屬性相剋</button>
        <button type="button" class="tab" data-tab="encounters">遇敵地點</button>
      </div>
      <div class="tab-content active" id="movesTab"><div id="movesList"><p class="tab-hint">載入招式中...</p></div></div>
      <div class="tab-content" id="evolutionTab"><div id="evolutionChain"><p class="tab-hint">切換至此分頁載入進化鏈</p></div></div>
      <div class="tab-content" id="typechartTab"><div id="typeChartSection"></div></div>
      <div class="tab-content" id="encountersTab"><div id="encountersList"><p class="tab-hint">切換至此分頁載入遇敵地點</p></div></div>
    </div>`;

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', (e) => switchTab(e.currentTarget.dataset.tab, e.currentTarget, detailGeneration));
  });

  bindFormButtons();
  renderTypeChart(pokemon);
}

function activateTab(tabName, gen, options = {}) {
  const tabEl = document.querySelector(`.tab[data-tab="${tabName}"]`)
    || document.querySelector('.tab[data-tab="moves"]');
  if (tabEl) switchTab(tabEl.dataset.tab, tabEl, gen, options);
}

function switchTab(tabName, tabEl, gen, { force = false } = {}) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach((t) => t.classList.remove('active'));
  tabEl.classList.add('active');
  document.getElementById(`${tabName}Tab`).classList.add('active');

  if (!currentPokemon || gen !== detailGeneration) return;
  if (!force && loadedTabs.has(tabName)) return;
  loadedTabs.add(tabName);

  if (tabName === 'moves') loadMoves(currentPokemon, gen);
  if (tabName === 'evolution') loadEvolution(currentPokemon, gen);
  if (tabName === 'encounters') loadEncounters(currentPokemon, gen);
}

function renderTypeChart(pokemon) {
  const types = pokemon.types.map((t) => t.type.name);
  document.getElementById('typeChartSection').innerHTML = buildTypeChartHtml(types);
}

async function loadAbilities(pokemon, gen) {
  try {
    const html = await Promise.all(pokemon.abilities.map(async (a) => {
      const data = await fetchJson(a.ability.url, `ability_${a.ability.name}`);
      const desc = getLatestZhEntry(data.flavor_text_entries);
      return `<div class="ability-item${a.is_hidden ? ' ability-item--hidden' : ''}">
        <div class="ability-name">${getChineseName(data.names)}${a.is_hidden ? '<span class="ability-hidden">隱藏</span>' : ''}</div>
        ${desc ? `<div class="ability-description">${desc.flavor_text.replace(/\n/g, '')}</div>` : ''}
      </div>`;
    }));
    if (gen !== detailGeneration || currentDetailId !== pokemon.id) return;
    document.getElementById('abilitiesSection').innerHTML = `<div class="abilities-list">${html.join('')}</div>`;
  } catch {
    if (gen === detailGeneration) document.getElementById('abilitiesSection').innerHTML = '<p class="empty-msg">無法載入特性資料</p>';
  }
}

async function loadHeldItems(pokemon, gen) {
  const section = document.getElementById('heldItemsSection');
  if (!section) return;
  section.innerHTML = '<p class="tab-hint">載入中...</p>';

  try {
    const items = await loadHeldItemCards(pokemon);
    if (gen !== detailGeneration || currentDetailId !== pokemon.id) return;
    section.innerHTML = renderHeldItemCards(items);
  } catch {
    if (gen === detailGeneration) section.innerHTML = renderHeldItemsErrorHtml();
  }
}

function loadVersions(pokemon, gen) {
  try {
    if (gen !== detailGeneration) return;

    const games = getSpeciesAppearanceGames(pokemon.speciesData);
    if (!games.length) {
      document.getElementById('versionsSection').innerHTML = '<p class="empty-msg">無版本資料</p>';
      return;
    }

    document.getElementById('versionsSection').innerHTML = `<div class="version-tags">${games.map((label) =>
      `<span class="version-tag">${label}</span>`
    ).join('')}</div>`;
  } catch {
    if (gen === detailGeneration) document.getElementById('versionsSection').innerHTML = '<p class="empty-msg">無法載入版本資料</p>';
  }
}

const moveLimits = {};

function getMoveLearnLevel(move, method) {
  const detail = getLatestVersionGroupDetail(move.version_group_details, method);
  return detail?.level_learned_at ?? 0;
}

async function loadMoves(pokemon, gen) {
  const movesListEl = document.getElementById('movesList');
  if (!movesListEl) return;
  movesListEl.innerHTML = '<p class="tab-hint">載入招式中...</p>';

  const methods = { 'level-up': '升級學習', machine: '技能機', egg: '遺傳', tutor: '教學招式' };
  try {
    const sections = await Promise.all(Object.entries(methods).map(async ([method, label]) => {
      const moves = pokemon.moves.filter((m) =>
        m.version_group_details.some((v) => v.move_learn_method.name === method)
      );
      if (!moves.length) return '';

      if (method === 'level-up') {
        moves.sort((a, b) => {
          const diff = getMoveLearnLevel(a, method) - getMoveLearnLevel(b, method);
          return diff !== 0 ? diff : a.move.name.localeCompare(b.move.name);
        });
      }

      const limit = moveLimits[`${pokemon.id}_${method}`] || MOVE_PAGE_SIZE;
      const slice = moves.slice(0, limit);
      const list = await runPool(slice, async (m) => {
        const data = await fetchJson(m.move.url, `move_${m.move.name}`);
        const detail = getLatestVersionGroupDetail(m.version_group_details, method);
        return {
          name: getChineseName(data.names),
          level: detail?.level_learned_at || 0,
          type: data.type?.name || '',
        };
      });

      if (method === 'level-up') {
        list.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, 'zh-Hant'));
      }

      if (gen !== detailGeneration) return null;

      const moreBtn = moves.length > limit
        ? `<button type="button" class="show-more-moves" data-method="${method}" data-pid="${pokemon.id}">顯示更多 (${moves.length - limit})</button>`
        : '';
      return `<div class="moves-category"><h4 class="category-title">${label} (${moves.length})</h4>
        <div class="moves-grid">${list.map((move) => {
          const typeLabel = typeNamesCN[move.type] || move.type;
          const typeBg = typeColors[move.type] || '#666';
          return `<div class="move-item">
            <div class="move-info">
              <span class="move-name">${move.name}</span>
              ${move.type ? `<span class="type-badge move-type" style="background:${typeBg}">${typeLabel}</span>` : ''}
            </div>
            ${move.level > 0 ? `<span class="move-level">${move.level}級</span>` : ''}
          </div>`;
        }).join('')}</div>${moreBtn}</div>`;
    }));

    if (gen !== detailGeneration) return;
    const html = sections.filter(Boolean).join('');
    movesListEl.innerHTML = html || '<p class="empty-msg">無招式資料</p>';
    movesListEl.querySelectorAll('.show-more-moves').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = `${btn.dataset.pid}_${btn.dataset.method}`;
        moveLimits[key] = (moveLimits[key] || MOVE_PAGE_SIZE) + MOVE_PAGE_SIZE;
        loadedTabs.delete('moves');
        loadMoves(pokemon, gen);
        loadedTabs.add('moves');
      });
    });
  } catch {
    if (gen === detailGeneration) movesListEl.innerHTML = '<p class="empty-msg">無法載入招式資料</p>';
  }
}

async function loadEvolution(pokemon, gen) {
  try {
    const evoData = await fetchJson(pokemon.speciesData.evolution_chain.url, `evolution_${pokemon.id}`);
    const tree = buildEvolutionTree(evoData.chain);
    await annotateEvolutionTree(tree);

    const speciesIds = collectSpeciesIds(tree);
    await Promise.all(speciesIds.map((sid) => ensurePokemonBySpeciesId(sid).catch(() => null)));

    if (gen !== detailGeneration) return;

    const getter = (speciesId) => {
      const p = store.allPokemon.find((x) => x.speciesData?.id === speciesId);
      return {
        chineseName: p?.chineseName || getPokemonBySpeciesId(speciesId).chineseName,
        image: p ? getPokemonImage(p) : '',
        id: p?.id || speciesId,
      };
    };

    document.getElementById('evolutionChain').innerHTML = renderEvolutionTree(tree, getter);
  } catch {
    if (gen === detailGeneration) document.getElementById('evolutionChain').innerHTML = '<p class="empty-msg">無法載入進化鏈資料</p>';
  }
}

async function loadEncounters(pokemon, gen) {
  const listEl = document.getElementById('encountersList');
  if (!listEl) return;
  listEl.innerHTML = '<p class="tab-hint">載入遇敵地點中...</p>';

  try {
    const groups = await getEncounterGroups(pokemon);
    if (gen !== detailGeneration || currentDetailId !== pokemon.id) return;
    listEl.innerHTML = renderEncountersHtml(groups);
    bindEncounterVersionFilter();
  } catch {
    if (gen === detailGeneration) listEl.innerHTML = '<p class="empty-msg">無法載入遇敵地點資料</p>';
  }
}

function bindEncounterVersionFilter() {
  const select = document.getElementById('encounterVersionFilter');
  if (!select) return;

  select.addEventListener('change', () => {
    document.querySelectorAll('.encounter-version-panel').forEach((panel) => {
      panel.hidden = panel.dataset.version !== select.value;
    });
  });
}

function collectSpeciesIds(node, set = new Set()) {
  set.add(node.speciesId);
  node.children.forEach((c) => collectSpeciesIds(c, set));
  return [...set];
}

export function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal?.classList.contains('active')) return;
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
  resetModalScroll();
  currentDetailId = null;
  currentSpeciesEntry = null;
  detailGeneration++;
}

let modalEventsInitialized = false;

export function ensurePokemonDetailModal() {
  if (!document.getElementById('modal')) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close-btn" id="closeModalBtn" aria-label="關閉">×</button>
          <div class="modal-header-content" id="modalHeader"></div>
        </div>
        <div class="modal-body" id="modalBody"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  initModalEvents();
}

export function initModalEvents() {
  if (modalEventsInitialized) return;
  modalEventsInitialized = true;

  document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
  document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('modal')?.classList.contains('active')) {
      e.preventDefault();
      closeModal();
    }
  });
}
