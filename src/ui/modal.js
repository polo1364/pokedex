import { BASE_URL, MOVE_PAGE_SIZE, statNames, typeColors, typeNamesCN, versionNamesCN } from '../config.js';
import { fetchJson } from '../api/client.js';
import { store, toggleFavorite, getFavorites } from '../state/store.js';
import { getChineseName, getLatestZhEntry, getGenerationFromSpecies } from '../utils/i18n.js';
import { getPokemonImage } from '../utils/sprites.js';
import { buildTypeChartHtml } from '../utils/typeChart.js';
import { buildEvolutionTree, renderEvolutionTree } from '../data/evolution.js';
import { ensurePokemonLoadedById, ensurePokemonBySpeciesId, getPokemonBySpeciesId } from '../data/pokemon.js';

let currentDetailId = null;
let detailGeneration = 0;
let shinyMode = false;
let loadedTabs = new Set();
let currentPokemon = null;

export function openModal(id) {
  showDetail(id);
}

export async function showDetail(id) {
  const entry = store.speciesIndex.find((e) => e.id === id) || { id };
  let pokemon;
  try {
    pokemon = entry.pokemon || (await ensurePokemonLoadedById(id));
  } catch {
    return;
  }

  currentDetailId = pokemon.id;
  const gen = ++detailGeneration;
  currentPokemon = pokemon;
  loadedTabs = new Set();
  shinyMode = false;

  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');
  modalContent.scrollTop = 0;

  renderModalHeader(pokemon);
  renderModalBody(pokemon);

  modal.classList.add('active');
  document.body.classList.add('modal-open');

  loadAbilities(pokemon, gen);
  loadVersions(pokemon, gen);
}

function renderModalHeader(pokemon) {
  const favs = getFavorites();
  const isFav = favs.includes(pokemon.id);
  document.getElementById('modalHeader').innerHTML = `
    <div class="modal-id">#${pokemon.id.toString().padStart(4, '0')}</div>
    <h2 class="modal-name">${pokemon.chineseName}</h2>
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

function renderModalBody(pokemon) {
  const flavor = getLatestZhEntry(pokemon.speciesData?.flavor_text_entries);
  const maxStat = Math.max(...pokemon.stats.map((s) => s.base_stat), 1);
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const gen = getGenerationFromSpecies(pokemon.speciesData, store.generationMap) || '—';
  const img = getPokemonImage(pokemon, { shiny: shinyMode });
  const varieties = pokemon.speciesData?.varieties || [];

  document.getElementById('modalBody').innerHTML = `
    ${varieties.length > 1 ? `<div class="form-switcher" id="formSwitcher">${varieties.map((v, i) =>
      `<button type="button" class="form-btn${v.is_default ? ' active' : ''}" data-url="${v.pokemon.url}">形態 ${i + 1}</button>`
    ).join('')}</div>` : ''}
    <div class="detail-grid">
      <div class="detail-section">
        <img id="modalMainImage" src="${img}" style="width:100%;max-width:300px;display:block;margin:0 auto" alt="${pokemon.chineseName}">
        ${flavor ? `<div class="description">${flavor.flavor_text.replace(/\n/g, '')}</div>` : ''}
        <div class="info-grid">
          <div class="info-item"><div class="info-label">身高</div><div class="info-value">${pokemon.height / 10}m</div></div>
          <div class="info-item"><div class="info-label">體重</div><div class="info-value">${pokemon.weight / 10}kg</div></div>
          <div class="info-item"><div class="info-label">世代</div><div class="info-value">${gen}</div></div>
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
      <button type="button" class="tab" data-tab="compare">比較</button>
    </div>
    <div class="tab-content active" id="movesTab"><div id="movesList"><p class="tab-hint">切換至此分頁載入招式</p></div></div>
    <div class="tab-content" id="evolutionTab"><div id="evolutionChain"><p class="tab-hint">切換至此分頁載入進化鏈</p></div></div>
    <div class="tab-content" id="typechartTab"><div id="typeChartSection"></div></div>
    <div class="tab-content" id="compareTab"><div id="compareSection"><p>在列表中選擇寶可夢加入比較（最多 3 隻）</p><div id="compareList"></div></div></div>`;

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', (e) => switchTab(e.currentTarget.dataset.tab, e.currentTarget, detailGeneration));
  });

  document.querySelectorAll('.form-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      document.querySelectorAll('.form-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const url = btn.dataset.url;
      const id = parseInt(url.split('/').slice(-2, -1)[0], 10);
      await showDetail(id);
    });
  });

  renderTypeChart(pokemon);
  renderCompareSection();
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

function renderCompareSection() {
  const el = document.getElementById('compareList');
  if (!el) return;
  if (!store.compareList.length) {
    el.innerHTML = '<p style="color:var(--text-secondary)">點擊卡片上的「比較」或從詳情加入</p>';
    return;
  }
  el.innerHTML = store.compareList.map((p) => {
    const total = p.stats?.reduce((s, x) => s + x.base_stat, 0) || 0;
    return `<div class="compare-card">
      <img src="${getPokemonImage(p)}" alt=""><div>${p.chineseName}</div>
      <div class="compare-stats">${p.stats?.map((s) => `<span>${statNames[s.stat.name]}: ${s.base_stat}</span>`).join('')}</div>
      <div>總和 ${total}</div>
    </div>`;
  }).join('');
}

export function addToCompare(pokemon) {
  if (store.compareList.find((p) => p.id === pokemon.id)) return;
  if (store.compareList.length >= 3) store.compareList.shift();
  store.compareList.push(pokemon);
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
    const versions = pokemon.game_indices || [];
    if (gen !== detailGeneration) return;
    if (!versions.length) {
      document.getElementById('versionsSection').innerHTML = '<p class="empty-msg">無版本資料</p>';
      return;
    }
    document.getElementById('versionsSection').innerHTML = `<div class="version-tags">${versions.map((v) =>
      `<span class="version-tag">${versionNamesCN[v.version.name] || v.version.name}</span>`
    ).join('')}</div>`;
  } catch {
    if (gen === detailGeneration) document.getElementById('versionsSection').innerHTML = '<p class="empty-msg">無法載入版本資料</p>';
  }
}

const moveLimits = {};

async function loadMoves(pokemon, gen) {
  const methods = { 'level-up': '升級學習', machine: '技能機', egg: '遺傳', tutor: '教學招式' };
  try {
    let html = '';
    for (const [method, label] of Object.entries(methods)) {
      const moves = pokemon.moves.filter((m) =>
        m.version_group_details.some((v) => v.move_learn_method.name === method)
      );
      if (!moves.length) continue;
      const limit = moveLimits[`${pokemon.id}_${method}`] || MOVE_PAGE_SIZE;
      const slice = moves.slice(0, limit);
      const list = await Promise.all(slice.map(async (m) => {
        const data = await fetchJson(m.move.url, `move_${m.move.name}`);
        const detail = m.version_group_details.find((v) => v.move_learn_method.name === method);
        return { name: getChineseName(data.names), level: detail?.level_learned_at || 0 };
      }));
      if (gen !== detailGeneration) return;
      const moreBtn = moves.length > limit
        ? `<button type="button" class="show-more-moves" data-method="${method}" data-pid="${pokemon.id}">顯示更多 (${moves.length - limit})</button>`
        : '';
      html += `<div class="moves-category"><h4 class="category-title">${label} (${moves.length})</h4>
        <div class="moves-grid">${list.map((move) =>
          `<div class="move-item"><span>${move.name}</span>${move.level > 0 ? `<span class="move-level">Lv. ${move.level}</span>` : ''}</div>`
        ).join('')}</div>${moreBtn}</div>`;
    }
    if (gen !== detailGeneration) return;
    document.getElementById('movesList').innerHTML = html || '<p class="empty-msg">無招式資料</p>';
    document.querySelectorAll('.show-more-moves').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = `${btn.dataset.pid}_${btn.dataset.method}`;
        moveLimits[key] = (moveLimits[key] || MOVE_PAGE_SIZE) + MOVE_PAGE_SIZE;
        loadedTabs.delete('moves');
        loadMoves(pokemon, gen);
        loadedTabs.add('moves');
      });
    });
  } catch {
    if (gen === detailGeneration) document.getElementById('movesList').innerHTML = '<p class="empty-msg">無法載入招式資料</p>';
  }
}

async function loadEvolution(pokemon, gen) {
  try {
    const evoData = await fetchJson(pokemon.speciesData.evolution_chain.url, `evolution_${pokemon.id}`);
    const tree = buildEvolutionTree(evoData.chain);

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
