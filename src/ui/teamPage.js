/**
 * 隊伍屬性分析頁：選 6 隻寶可夢，分析共同弱點、本系招式打擊面與補強方向。
 * 資料只用預建物種索引（public/data/species-index.json），不需呼叫 PokéAPI。
 */
import '../styles/team.css';
import { typeColors, typeNamesCN } from '../config.js';
import { escapeHtml } from '../utils/infoCards.js';
import { matchesSearch } from '../utils/search.js';
import { getTeamIds, setTeamIds } from '../state/team.js';
import {
  TEAM_SIZE, parseTeamIds, addTeamId, defensiveMatrix, sharedWeaknesses,
  offensiveCoverage, uncoveredTypes, suggestDefensiveTypes, suggestOffensiveTypes,
} from '../utils/teamAnalysis.js';

const INDEX_URL = './data/species-index.json';
const ARTWORK = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const MAX_SUGGESTIONS = 8;

let entries = [];
let byId = new Map();
let teamIds = [];
let activeSuggestion = -1;

const $ = (id) => document.getElementById(id);

function imageUrl(entry) {
  return `${ARTWORK}/${entry.p || entry.id}.png`;
}

function num(id) {
  return `#${String(id).padStart(4, '0')}`;
}

function typeBadge(type, extraClass = '') {
  return `<span class="type-badge ${extraClass}" style="background:${typeColors[type] || '#666'}">${escapeHtml(typeNamesCN[type] || type)}</span>`;
}

function multiplierLabel(m) {
  if (m === 0) return '0';
  if (m === 0.25) return '¼';
  if (m === 0.5) return '½';
  return String(m);
}

function multiplierClass(m) {
  if (m === 0) return 'm-immune';
  if (m >= 4) return 'm-quad';
  if (m > 1) return 'm-double';
  if (m <= 0.25) return 'm-quarter';
  if (m < 1) return 'm-half';
  return 'm-neutral';
}

/* ---------- 狀態與網址 ---------- */

function setTeam(ids, { syncUrl = true } = {}) {
  teamIds = parseTeamIds(ids.filter((id) => byId.has(id)).join(','));
  setTeamIds(teamIds);
  if (syncUrl) {
    const url = new URL(location.href);
    if (teamIds.length) url.searchParams.set('t', teamIds.join(','));
    else url.searchParams.delete('t');
    const href = url.href.replace(/([?&]t=)([^&#]*)/, (_, k, v) => k + v.replace(/%2C/gi, ','));
    history.replaceState(null, '', href);
  }
  render();
}

function addMember(id) {
  const result = addTeamId(teamIds, id);
  if (result.duplicate) flash(`${byId.get(id)?.zh || num(id)} 已在隊伍中`);
  else if (result.full) flash(`隊伍已滿 ${TEAM_SIZE} 隻，請先移除一隻`);
  if (result.added) setTeam(result.ids);
}

function flash(text) {
  const el = $('teamStatus');
  if (!el) return;
  el.textContent = text;
  el.classList.add('is-visible');
  clearTimeout(flash.timer);
  flash.timer = setTimeout(() => el.classList.remove('is-visible'), 2600);
}

/* ---------- 選擇寶可夢 ---------- */

function renderSuggestions() {
  const input = $('teamSearch');
  const list = $('teamSuggestions');
  const q = input.value.trim();
  if (!q) {
    list.hidden = true;
    list.innerHTML = '';
    input.setAttribute('aria-expanded', 'false');
    return;
  }
  const matches = entries
    .filter((e) => matchesSearch({ id: e.id, name: e.n, chineseName: e.zh }, q))
    .slice(0, MAX_SUGGESTIONS);
  activeSuggestion = matches.length ? 0 : -1;
  list.hidden = false;
  input.setAttribute('aria-expanded', 'true');
  list.innerHTML = matches.length
    ? matches.map((e, i) => `<li role="option" id="teamOpt${e.id}" class="team-suggestion${i === 0 ? ' is-active' : ''}" data-add="${e.id}" aria-selected="${i === 0}">
        <img src="${imageUrl(e)}" alt="" loading="lazy">
        <span class="team-suggestion-num">${num(e.id)}</span>
        <span class="team-suggestion-name">${escapeHtml(e.zh)}</span>
        <span class="team-suggestion-types">${e.t.map((t) => typeBadge(t)).join('')}</span>
        ${teamIds.includes(e.id) ? '<span class="team-suggestion-in">已在隊伍</span>' : ''}
      </li>`).join('')
    : '<li class="team-suggestion-empty">找不到符合的寶可夢</li>';
  if (matches.length) input.setAttribute('aria-activedescendant', `teamOpt${matches[0].id}`);
  else input.removeAttribute('aria-activedescendant');
}

function moveActive(delta) {
  const items = [...document.querySelectorAll('#teamSuggestions [data-add]')];
  if (!items.length) return;
  activeSuggestion = (activeSuggestion + delta + items.length) % items.length;
  items.forEach((el, i) => {
    el.classList.toggle('is-active', i === activeSuggestion);
    el.setAttribute('aria-selected', String(i === activeSuggestion));
  });
  const active = items[activeSuggestion];
  active.scrollIntoView({ block: 'nearest' });
  $('teamSearch').setAttribute('aria-activedescendant', active.id);
}

function pickFromSuggestions(id) {
  addMember(id);
  const input = $('teamSearch');
  input.value = '';
  renderSuggestions();
  input.focus();
}

/* ---------- 畫面 ---------- */

function renderSlots() {
  const slots = [];
  for (let i = 0; i < TEAM_SIZE; i += 1) {
    const e = byId.get(teamIds[i]);
    if (!e) {
      slots.push(`<li class="team-slot team-slot--empty"><span aria-hidden="true">＋</span><span class="team-slot-hint">空位</span></li>`);
      continue;
    }
    slots.push(`<li class="team-slot">
      <button type="button" class="team-slot-remove" data-remove="${e.id}" aria-label="移除 ${escapeHtml(e.zh)}">×</button>
      <a class="team-slot-link" href="./index.html?id=${e.id}" title="在圖鑑查看 ${escapeHtml(e.zh)}">
        <img src="${imageUrl(e)}" alt="" loading="lazy">
        <span class="team-slot-num">${num(e.id)}</span>
        <span class="team-slot-name">${escapeHtml(e.zh)}</span>
      </a>
      <span class="team-slot-types">${e.t.map((t) => typeBadge(t)).join('')}</span>
    </li>`);
  }
  $('teamSlots').innerHTML = slots.join('');
  $('teamCount').textContent = `${teamIds.length} / ${TEAM_SIZE}`;
  $('teamClear').disabled = !teamIds.length;
  $('teamShare').disabled = !teamIds.length;
}

function memberIcons(indices, members) {
  return indices.map((i) => `<img class="team-mini" src="${imageUrl(members[i])}" alt="${escapeHtml(members[i].zh)}" title="${escapeHtml(members[i].zh)}" loading="lazy">`).join('');
}

function renderSummary(members, team) {
  const weaknesses = sharedWeaknesses(team);
  const gaps = uncoveredTypes(team);
  const defensive = suggestDefensiveTypes(weaknesses.slice(0, 4).map((w) => w.attack));
  const offensive = suggestOffensiveTypes(gaps);

  const weakHtml = weaknesses.length
    ? `<ul class="team-chip-list">${weaknesses.map((w) => `<li class="team-chip team-chip--weak">
        ${typeBadge(w.attack)}<span><strong>${w.weak}</strong> 隻怕${w.quad ? `（${w.quad} 隻 4 倍）` : ''}・${w.resist} 隻能抗</span>
      </li>`).join('')}</ul>`
    : '<p class="team-ok">沒有明顯的共同弱點 👍</p>';

  const gapHtml = gaps.length
    ? `<ul class="team-chip-list">${gaps.map((t) => `<li class="team-chip team-chip--gap">${typeBadge(t)}</li>`).join('')}</ul>`
    : '<p class="team-ok">本系招式能對所有屬性打出效果絕佳 👍</p>';

  const suggestion = (list, verb) => list.map((s) => `<li>${typeBadge(s.type)}<span>${verb} ${s.covers.map((t) => escapeHtml(typeNamesCN[t])).join('、')}</span></li>`).join('');

  return `<section class="team-card team-summary" aria-labelledby="teamSummaryTitle">
    <h2 id="teamSummaryTitle">重點摘要</h2>
    <div class="team-summary-grid">
      <div>
        <h3>共同弱點</h3>
        ${weakHtml}
        ${defensive.length ? `<h4>補強建議：加入這些屬性</h4><ul class="team-suggest-list">${suggestion(defensive, '可抵抗')}</ul>` : ''}
      </div>
      <div>
        <h3>本系招式打不痛的屬性</h3>
        ${gapHtml}
        ${offensive.length ? `<h4>補強建議：加入這些屬性的攻擊手</h4><ul class="team-suggest-list">${suggestion(offensive, '本系能剋制')}</ul>` : ''}
      </div>
    </div>
  </section>`;
}

function renderDefenseTable(members, team) {
  const weakSet = new Set(sharedWeaknesses(team).map((w) => w.attack));
  const head = members.map((m) => `<th scope="col"><img class="team-mini" src="${imageUrl(m)}" alt="" loading="lazy"><span class="sr-only">${escapeHtml(m.zh)}</span></th>`).join('');
  const rows = defensiveMatrix(team).map((row) => `<tr class="${weakSet.has(row.attack) ? 'is-shared-weak' : ''}">
      <th scope="row">${typeBadge(row.attack, 'type-badge--sm')}</th>
      ${row.multipliers.map((m) => `<td class="${multiplierClass(m)}">${m === 1 ? '' : multiplierLabel(m)}</td>`).join('')}
      <td class="team-count-cell team-count-weak">${row.weak || ''}</td>
      <td class="team-count-cell team-count-resist">${row.resist || ''}</td>
    </tr>`).join('');
  return `<section class="team-card" aria-labelledby="teamDefenseTitle">
    <h2 id="teamDefenseTitle">防禦相剋表</h2>
    <p class="team-card-desc">受到各屬性招式攻擊的倍率；空白為 1 倍。標紅的列是隊伍共同弱點。</p>
    <div class="team-table-wrap"><table class="team-defense-table">
      <thead><tr><th scope="col">攻擊屬性</th>${head}<th scope="col" class="team-count-head">怕</th><th scope="col" class="team-count-head">抗</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
  </section>`;
}

function renderCoverage(members, team) {
  const cells = offensiveCoverage(team).map((row) => `<li class="team-cover ${row.hitters.length ? '' : 'is-gap'}">
      ${typeBadge(row.defense)}
      <span class="team-cover-best ${multiplierClass(row.best)}">${row.hitters.length ? `${row.best}×` : `最高 ${multiplierLabel(row.best)}×`}</span>
      <span class="team-cover-hitters">${memberIcons(row.hitters, members)}</span>
    </li>`).join('');
  return `<section class="team-card" aria-labelledby="teamCoverTitle">
    <h2 id="teamCoverTitle">本系招式打擊面</h2>
    <p class="team-card-desc">以每隻寶可夢自身屬性的招式估算，對各防守屬性能打出的最高倍率，以及能打出效果絕佳的成員。</p>
    <ul class="team-cover-grid">${cells}</ul>
  </section>`;
}

function render() {
  renderSlots();
  const root = $('teamAnalysis');
  const members = teamIds.map((id) => byId.get(id)).filter(Boolean);
  if (!members.length) {
    root.innerHTML = '<p class="team-empty">在上方搜尋並加入寶可夢，就會顯示隊伍的弱點與打擊面分析。也可以在圖鑑的詳情視窗按「＋隊伍」。</p>';
    return;
  }
  const team = members.map((m) => m.t);
  root.innerHTML = renderSummary(members, team) + renderDefenseTable(members, team) + renderCoverage(members, team);
}

/* ---------- 啟動 ---------- */

function bindEvents() {
  const input = $('teamSearch');
  input.addEventListener('input', renderSuggestions);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
    else if (e.key === 'Enter') {
      const active = document.querySelectorAll('#teamSuggestions [data-add]')[activeSuggestion];
      if (active) { e.preventDefault(); pickFromSuggestions(Number(active.dataset.add)); }
    } else if (e.key === 'Escape') {
      input.value = '';
      renderSuggestions();
    }
  });
  input.addEventListener('blur', () => setTimeout(() => {
    if (!document.activeElement?.closest?.('#teamPicker')) {
      $('teamSuggestions').hidden = true;
      input.setAttribute('aria-expanded', 'false');
    }
  }, 150));
  input.addEventListener('focus', () => { if (input.value.trim()) renderSuggestions(); });

  $('teamSuggestions').addEventListener('mousedown', (e) => e.preventDefault());
  $('teamSuggestions').addEventListener('click', (e) => {
    const item = e.target.closest('[data-add]');
    if (item) pickFromSuggestions(Number(item.dataset.add));
  });
  $('teamSlots').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (btn) setTeam(teamIds.filter((id) => id !== Number(btn.dataset.remove)));
  });
  $('teamClear').addEventListener('click', () => setTeam([]));
  $('teamShare').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      flash('分享連結已複製');
    } catch {
      flash('無法複製，請直接複製網址列');
    }
  });
}

export async function initTeamPage() {
  bindEvents();
  try {
    const res = await fetch(INDEX_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    entries = data.entries || [];
  } catch {
    $('teamAnalysis').innerHTML = '<p class="team-empty">無法載入寶可夢資料，請重新整理頁面。</p>';
    return;
  }
  byId = new Map(entries.map((e) => [e.id, e]));
  $('teamSearch').disabled = false;
  const fromUrl = parseTeamIds(new URLSearchParams(location.search).get('t'));
  setTeam(fromUrl.length ? fromUrl : getTeamIds());
}
