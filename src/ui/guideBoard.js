/**
 * 攻略「對戰看板」排版（版本 B）：屬性色橫幅＋王牌立繪、帶圖片與弱點的對手列、
 * 編號作戰步驟、帶圖片與標籤的推薦隊伍卡片。
 * 只負責產生 HTML 與補上圖片；資料仍由 versionGuide.js 傳入。
 */
import { typeColors, typeNamesCN } from '../config.js';
import { weaknessesFor } from '../utils/typeEra.js';
import {
  createMonResolver, monImageUrl, splitVersionPrefix, monDetailHref, teamAnalysisHref, createMoveMatcher,
} from '../utils/guideMons.js';

let boardGeneration = null;

/** 目前攻略的世代（決定弱點用哪一代的相剋表）。 */
export function setBoardGeneration(generation) {
  boardGeneration = generation ?? null;
}

function esc(text) {
  return String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function typeBadge(type) {
  return `<span class="type-badge" style="background:${typeColors[type] || '#666'}">${typeNamesCN[type] || type}</span>`;
}

function art(name, types, extraClass = '') {
  const color = typeColors[types?.[0]] || '#8a8fb5';
  return `<span class="gb-art ${extraClass}" data-mon="${esc(name)}" data-types="${esc((types || []).join(','))}" style="--gb-c:${color}" aria-hidden="true"></span>`;
}

/* ---------- 橫幅 ---------- */

/**
 * @param {object} battle
 * @param {{ roleLabel?: string, specialty?: string|null, levelText?: string, chips?: string[] }} options
 */
export function renderBoardHero(battle, { roleLabel = '', specialty = null, levelText = '', chips = [] } = {}) {
  const party = battle.party?.length ? battle.party : battle.variants?.find((v) => v.party?.length)?.party || [];
  const ace = party[party.length - 1];
  const color = typeColors[specialty] || typeColors[ace?.types?.[0]] || '#7f77dd';
  const stepParts = [roleLabel, battle.location].filter(Boolean);
  const pills = [];
  if (specialty && typeColors[specialty]) pills.push(`<span class="guide-meta-chip gb-pill">${typeBadge(specialty)} 專長</span>`);
  if (battle.badge) pills.push(`<span class="guide-meta-chip gb-pill">徽章 <b>${battle.badge}</b></span>`);
  if (levelText) pills.push(`<span class="guide-meta-chip gb-pill gb-pill--level">建議 <b>${levelText}</b></span>`);
  chips.forEach((chip) => pills.push(`<span class="guide-meta-chip gb-pill">${chip}</span>`));

  return `<header class="gb-hero" style="--gb-c:${color}">
    ${stepParts.length ? `<span class="gb-hero-step">${stepParts.join(' ・ ')}</span>` : ''}
    <div class="guide-leader-name gb-hero-name">${battle.name}</div>
    ${pills.length ? `<div class="guide-meta-row gb-hero-meta">${pills.join('')}</div>` : ''}
    ${ace ? art(ace.name, ace.types, 'gb-hero-art') : ''}
  </header>`;
}

/** 「18～22」這類等級範圍轉成橫幅上的短標籤；其他敘述太長就不放。 */
export function heroLevelText(level) {
  const text = String(level || '').trim();
  const range = text.match(/^(\d+)\s*[～~–-]\s*(\d+)$/);
  if (range) return `Lv.${range[1]}–${range[2]}`;
  if (/^\d+$/.test(text)) return `Lv.${text}`;
  return '';
}

/* ---------- 對手隊伍 ---------- */

function weaknessRow(mon) {
  const defensive = mon.teraType ? [mon.teraType] : mon.types;
  const { quad, double } = weaknessesFor(defensive, boardGeneration);
  if (!quad.length && !double.length) return '';
  const chip = (type, strong) => `<span class="gb-weak-chip${strong ? ' is-quad' : ''}" style="--gb-c:${typeColors[type] || '#999'}">${typeNamesCN[type] || type}${strong ? '<small>×4</small>' : ''}</span>`;
  return `<div class="gb-weak"><span class="gb-weak-label">${mon.teraType ? '太晶後怕' : '怕'}</span>${quad.map((t) => chip(t, true)).join('')}${double.map((t) => chip(t, false)).join('')}</div>`;
}

/**
 * @param {object[]} party
 * @param {string[]} counters 與 party 同順序的對策（推薦上場的寶可夢與招式）；沒有就不顯示
 */
export function renderBoardParty(party, counters = []) {
  if (!party?.length) return '';
  const maxLevel = Math.max(...party.map((p) => Number(p.level) || 0));
  let html = '<ul class="guide-party-grid gb-foes">';
  party.forEach((p, i) => {
    const isLead = i === party.length - 1 && party.length > 1;
    const width = maxLevel && p.level ? Math.max(30, Math.round((Number(p.level) / maxLevel) * 100)) : 0;
    html += `<li class="guide-party-grid-row gb-foe${isLead ? ' guide-party-grid-row--lead gb-foe--ace' : ''}">
      ${art(p.name, p.types)}
      <div class="gb-foe-main">
        <div class="gb-foe-top"><span class="guide-party-grid-name">${p.name}</span>${isLead ? '<span class="gb-ace">王牌</span>' : ''}</div>
        ${p.level ? `<div class="gb-lv"><span class="guide-level">Lv.${p.level}</span><i style="--w:${width}%"></i></div>` : ''}
        <div class="guide-type-badges gb-foe-types">${p.teraType ? '<span class="gb-types-label">原屬性</span>' : ''}${(p.types || []).map(typeBadge).join('')}${p.teraType ? `<span class="gb-tera">太晶：${typeNamesCN[p.teraType] || p.teraType}</span>` : ''}</div>
        ${weaknessRow(p)}
        ${counters[i] ? `<div class="gb-counter"><span class="gb-counter-label">對策</span><span data-move-note>${counters[i]}</span></div>` : ''}
      </div>
    </li>`;
  });
  html += '</ul>';
  return html;
}

/* ---------- 作戰步驟 ---------- */

/**
 * 作戰摘要各段的小標。資料沒有標階段，只能從寫法判斷：
 * 第一段是主要打法；帶有提醒語氣的是「留意」；其餘是「接著」。
 */
export function stepLabel(part, index, total) {
  if (index === 0) return total > 1 ? '主打' : '打法';
  if (/注意|小心|留意|(?<![分特個類級識區])別|不要|勿|避免|不能|無法|只是|僅/.test(part)) return '留意';
  return '接著';
}

/**
 * @param {{ level?: string, summary?: string, tips?: string[] }} strategy
 * @param {string} levelLabel 已整理好的等級說明
 */
export function renderBoardSteps(strategy, levelLabel) {
  const parts = String(strategy.summary || '').split('；').map((s) => s.trim()).filter(Boolean);
  let html = '<ol class="gb-steps">';
  if (levelLabel) {
    html += `<li class="gb-step gb-step--prep"><div><h4>準備</h4><p class="guide-strategy-level">${levelLabel}</p></div></li>`;
  }
  parts.forEach((part, index) => {
    const label = stepLabel(part, index, parts.length);
    html += `<li class="gb-step gb-step--do${label === '留意' ? ' gb-step--care' : ''}"><div><h4>${label}</h4><p class="guide-strategy-summary">${part}</p></div></li>`;
  });
  (strategy.tips || []).forEach((tip) => {
    html += `<li class="gb-step gb-step--warn"><div><h4>注意</h4><p class="guide-battle-tip">${tip}</p></div></li>`;
  });
  html += '</ol>';
  return html;
}

/* ---------- 推薦隊伍 ---------- */

function obtainHtml(text) {
  const split = splitVersionPrefix(text);
  if (!split) return text;
  return `<span class="gb-ver gb-ver--${split.key}">${split.tag}</span>${split.rest}`;
}

export function renderBoardAlly(p) {
  return `<li class="guide-team-row gb-ally">
    ${art(p.name, p.types)}
    <span class="guide-pokemon-name">${p.name}</span>
    <span class="guide-type-badges">${(p.types || []).map(typeBadge).join('')}</span>
    ${p.obtain ? `<span class="guide-pokemon-note gb-fact"><strong class="gb-k gb-k--get">取得</strong><span>${obtainHtml(p.obtain)}</span></span>` : ''}
    ${p.moveNote ? `<span class="guide-pokemon-note gb-fact"><strong class="gb-k gb-k--move">招式</strong><span data-move-note>${p.moveNote}</span></span>` : ''}
  </li>`;
}

/** 推薦隊伍分組的標籤：只有一組時是「推薦」，多組時第一組「首選」、其餘「替代」。 */
export function teamRoleTag(index, total) {
  if (total <= 1) return '<span class="gb-role gb-role--first">推薦</span>';
  return index === 0
    ? '<span class="gb-role gb-role--first">首選</span>'
    : '<span class="gb-role gb-role--alt">替代</span>';
}

/* ---------- 圖片 ---------- */

let speciesIndexPromise = null;
let resolverPromise = null;

function loadSpeciesIndex() {
  speciesIndexPromise ||= fetch('./data/species-index.json')
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);
  return speciesIndexPromise;
}

function loadResolver() {
  resolverPromise ||= loadSpeciesIndex().then((index) => (index ? createMonResolver(index) : null));
  return resolverPromise;
}

/** 和招式同名、但在攻略裡是一般用語的詞。 */
const MOVE_WORDS_IGNORED = ['換場'];

let moveMatcherPromise = null;

function loadMoveMatcher() {
  moveMatcherPromise ||= Promise.all([
    fetch('./data/moves-index.json').then((res) => (res.ok ? res.json() : null)),
    loadSpeciesIndex(),
  ])
    .then(([index, species]) => (index
      ? createMoveMatcher(index.entries, [...MOVE_WORDS_IGNORED, ...(species?.entries || []).map((e) => e.zh)])
      : null))
    .catch(() => null);
  return moveMatcherPromise;
}

/** 對手與推薦隊伍的名稱連到圖鑑詳情。 */
function linkMonName(slot, resolved) {
  const href = monDetailHref(resolved);
  const nameEl = slot.closest('.gb-foe, .gb-ally')?.querySelector('.guide-party-grid-name, .guide-pokemon-name');
  if (!href || !nameEl || nameEl.querySelector('a')) return;
  const link = document.createElement('a');
  link.className = 'gb-mon-link';
  link.href = href;
  link.title = '在圖鑑查看';
  link.append(...nameEl.childNodes);
  nameEl.append(link);
}

/** 推薦隊伍加上「用這隊做屬性分析」，帶著整隊到隊伍分析頁。 */
function addTeamLinks(root, resolve) {
  const teams = [...(root.matches?.('.gb-team') ? [root] : []), ...root.querySelectorAll('.gb-team')];
  teams.forEach((team) => {
    if (team.dataset.teamDone) return;
    team.dataset.teamDone = '1';
    const members = [...team.querySelectorAll('.gb-ally [data-mon]')].map((el) => resolve(el.dataset.mon));
    // 推薦隊伍和對手在同一張看板裡時，把這場的對手一起帶過去（有版本分支時取第一組）
    const board = team.closest('.gb');
    const foes = [...(board?.querySelector('.gb-foes')?.querySelectorAll('.gb-foe [data-mon]') || [])];
    const opponents = foes.map((el) => ({
      speciesId: resolve(el.dataset.mon)?.speciesId,
      types: (el.dataset.types || '').split(',').filter(Boolean),
    }));
    const href = teamAnalysisHref(members, {
      opponents,
      name: board?.querySelector('.gb-hero-name')?.textContent.trim(),
      generation: boardGeneration,
    });
    if (!href) return;
    const link = document.createElement('a');
    link.className = 'gb-team-analyze';
    link.href = href;
    const versus = href.includes('&vs=');
    link.textContent = versus ? '用這隊分析這場對戰' : '用這隊做屬性分析';
    link.title = versus
      ? '帶著這組寶可夢和這場的對手到隊伍分析頁，看誰能剋對手、誰要小心'
      : '帶著這組寶可夢到隊伍分析頁，查看整隊的弱點與抗性';
    team.append(link);
  });
}

/** 招式說明裡的招式名稱連到招式圖鑑（只處理文字節點，不動原有的標籤）。 */
async function linkMoveNotes(root) {
  const notes = [...root.querySelectorAll('[data-move-note]:not([data-move-done])')];
  if (!notes.length) return;
  notes.forEach((el) => { el.dataset.moveDone = '1'; });
  const match = await loadMoveMatcher();
  if (!match) return;
  notes.forEach((note) => {
    const walker = document.createTreeWalker(note, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      if (node.parentElement?.closest('a')) return;
      const parts = match(node.nodeValue);
      if (!parts.some((part) => typeof part !== 'string')) return;
      const fragment = document.createDocumentFragment();
      parts.forEach((part) => {
        if (typeof part === 'string') {
          fragment.append(part);
          return;
        }
        const link = document.createElement('a');
        link.className = 'gb-move-link';
        link.href = `./moves.html?open=${encodeURIComponent(part.slug)}`;
        link.title = '在招式圖鑑查看';
        link.textContent = part.text;
        fragment.append(link);
      });
      node.replaceWith(fragment);
    });
  });
}

/**
 * 補上寶可夢圖片與各頁連結；對不到名稱或圖片載入失敗時保留屬性色佔位圖。
 */
export async function hydrateGuideArt(root) {
  if (!root) return;
  linkMoveNotes(root);
  const slots = [...root.querySelectorAll('[data-mon]:not([data-mon-done])')];
  if (!slots.length) return;
  slots.forEach((el) => { el.dataset.monDone = '1'; });
  const resolve = await loadResolver();
  if (resolve) addTeamLinks(root, resolve);
  slots.forEach((el) => {
    const resolved = resolve?.(el.dataset.mon);
    linkMonName(el, resolved);
    const url = monImageUrl(resolved);
    if (!url) {
      el.classList.add('is-empty');
      return;
    }
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.loading = 'lazy';
    img.onerror = () => {
      img.remove();
      el.classList.add('is-empty');
    };
    img.src = url;
    el.appendChild(img);
  });
}
