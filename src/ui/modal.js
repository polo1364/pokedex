import { BASE_URL, MOVE_PAGE_SIZE, statNames, typeColors, typeNamesCN } from '../config.js';
import { fetchJson, runPool } from '../api/client.js';
import { store, toggleFavorite, getFavorites } from '../state/store.js';
import { getChineseName, getLatestZhEntry, getGenerationFromSpecies } from '../utils/i18n.js';
import { getPokemonImage, isUsingSpeciesImageFallback } from '../utils/sprites.js';
import { getVarietyButtons, getVarietyButtonsSync } from '../utils/forms.js';
import { buildTypeChartHtml } from '../utils/typeChart.js';
import { getLatestVersionGroupDetail, getSpeciesAppearanceGames } from '../utils/versions.js';
import { buildEvolutionTree, renderEvolutionTree, annotateEvolutionTree } from '../data/evolution.js';
import { resolvePokemonById, ensurePokemonBySpeciesId, getPokemonBySpeciesId } from '../data/pokemon.js';

let currentDetailId = null;
let detailGeneration = 0;
let shinyMode = false;
let loadedTabs = new Set();
let currentPokemon = null;

export function openModal(id) {
  showDetail(id);
}

let currentSpeciesEntry = null;

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
  modal.querySelector('.modal-content').scrollTop = 0;
  modal.classList.add('active');
  document.body.classList.add('modal-open');

  renderModalContent(pokemon, gen);

  loadAbilities(pokemon, gen);
  loadVersions(pokemon, gen);
  loadedTabs.add('moves');
  loadMoves(pokemon, gen);
  enrichFormSwitcher(pokemon, gen);
}

async function switchForm(pokemonId) {
  if (pokemonId === currentDetailId) return;

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
  loadAbilities(pokemon, gen);
  loadVersions(pokemon, gen);
  loadedTabs.add('moves');
  loadMoves(pokemon, gen);
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
  document.getElementById('modalHeader').innerHTML = `
    <div class="modal-id">#${pokemon.id.toString().padStart(4, '0')}</div>
    <h2 class="modal-name">${name}</h2>
    <div class="pokemon-types">
      ${pokemon.types.map((t) => `<span class="type-badge" style="background:${typeColors[t.type.name]}">${typeNamesCN[t.type.name]}</span>`).join('')}
    </div>
    <div class="modal-actions">
      <button type="button" class="modal-action-btn" id="favoriteBtn" data-fav="${isFav}">${isFav ? '★ 已收藏' : '☆ 收藏'}</button>
      <button type="button" class="modal-action-btn" id="shinyToggleBtn">✨ 閃光</button>
      <button type="button" class="modal-action-btn" id="shareBtn">🔗 分享</button>
    </div>`;

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

function renderModalBody(pokemon, gen, formButtons, displayName) {
  const flavor = getLatestZhEntry(pokemon.speciesData?.flavor_text_entries);
  const maxStat = Math.max(...pokemon.stats.map((s) => s.base_stat), 1);
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const genNum = getGenerationFromSpecies(pokemon.speciesData, store.generationMap) || '—';
  const img = getPokemonImage(pokemon, { shiny: shinyMode });
  const imgFallback = isUsingSpeciesImageFallback(pokemon);

  document.getElementById('modalBody').innerHTML = `
    ${formButtons.length ? `<div class="form-switcher" id="formSwitcher">${formButtons.map((b) =>
      `<button type="button" class="form-btn${b.isActive ? ' active' : ''}" data-pid="${b.pokemonId}">${b.label}</button>`
    ).join('')}</div>` : ''}
    <div class="detail-grid">
      <div class="detail-section">
        <img id="modalMainImage" class="${imgFallback ? 'form-img-fallback' : ''}" src="${img}" style="width:100%;max-width:300px;display:block;margin:0 auto" alt="${displayName}">
        ${imgFallback ? '<p class="form-img-hint">此形態暫無獨立圖像，顯示預設外觀參考</p>' : ''}
        ${flavor ? `<div class="description">${flavor.flavor_text.replace(/\n/g, '')}</div>` : ''}
        <div class="info-grid">
          <div class="info-item"><div class="info-label">身高</div><div class="info-value">${pokemon.height / 10}m</div></div>
          <div class="info-item"><div class="info-label">體重</div><div class="info-value">${pokemon.weight / 10}kg</div></div>
          <div class="info-item"><div class="info-label">世代</div><div class="info-value">${genNum}</div></div>
        </div>
      </div>
      <div class="detail-section">
        <h3 class="section-title">種族值</h3>
        ${pokemon.stats.map((s) => `
          <div class="stat-item">
            <div class="stat-header"><span class="stat-name">${statNames[s.stat.name]}</span><span class="stat-number">${s.base_stat}</span></div>
            <div class="stat-bar-container"><div class="stat-bar-fill" style="width:${(s.base_stat / maxStat) * 100}%"></div></div>
          </div>`).join('')}
        <div class="stat-total"><span>總和</span><span style="color:var(--accent-primary)">${totalStats}</span></div>
      </div>
    </div>
    <div class="detail-section"><h3 class="section-title">特性</h3><div id="abilitiesSection">載入中...</div></div>
    <div class="detail-section"><h3 class="section-title">出現版本</h3><div id="versionsSection">載入中...</div></div>
    <div class="tabs">
      <button type="button" class="tab active" data-tab="moves">可學習招式</button>
      <button type="button" class="tab" data-tab="evolution">進化鏈</button>
      <button type="button" class="tab" data-tab="typechart">屬性相剋</button>
    </div>
    <div class="tab-content active" id="movesTab"><div id="movesList"><p class="tab-hint">載入招式中...</p></div></div>
    <div class="tab-content" id="evolutionTab"><div id="evolutionChain"><p class="tab-hint">切換至此分頁載入進化鏈</p></div></div>
    <div class="tab-content" id="typechartTab"><div id="typeChartSection"></div></div>`;

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', (e) => switchTab(e.currentTarget.dataset.tab, e.currentTarget, detailGeneration));
  });

  bindFormButtons();
  renderTypeChart(pokemon);
}

function switchTab(tabName, tabEl, gen) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach((t) => t.classList.remove('active'));
  tabEl.classList.add('active');
  document.getElementById(`${tabName}Tab`).classList.add('active');

  if (!currentPokemon || gen !== detailGeneration) return;
  if (loadedTabs.has(tabName)) return;
  loadedTabs.add(tabName);

  if (tabName === 'moves') loadMoves(currentPokemon, gen);
  if (tabName === 'evolution') loadEvolution(currentPokemon, gen);
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
      return `<div class="ability-item">
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

function collectSpeciesIds(node, set = new Set()) {
  set.add(node.speciesId);
  node.children.forEach((c) => collectSpeciesIds(c, set));
  return [...set];
}

export function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.classList.remove('modal-open');
  currentDetailId = null;
  currentSpeciesEntry = null;
  detailGeneration++;
}

export function initModalEvents() {
  document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
  document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
