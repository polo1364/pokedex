/** @typedef {{ name: string, types: string[], level?: number }} GuidePokemon */
/** @typedef {{ label: string, reason: string, pokemon: GuidePokemon[] }} RecommendedTeam */
/** @typedef {'gym'|'eliteFour'|'champion'|'trainer'|'wild'|'legendary'|'noble'} BattleRole */
/** @typedef {'fixed'|'suggested'} BattleSequenceMode */

/**
 * @param {string} name
 * @param {string[]} types
 * @param {number} [level]
 * @returns {GuidePokemon}
 */
export function pm(name, types, level) {
  return level != null ? { name, types, level } : { name, types };
}

/**
 * @param {string} label
 * @param {string} reason
 * @param {GuidePokemon[]} pokemon
 * @returns {RecommendedTeam}
 */
export function rec(label, reason, pokemon) {
  return { label, reason, pokemon };
}

/** @param {string} attackType */
export function cov(attackType, label, uses) {
  return { attackType, label, uses };
}

export function mup(opponent, counters) {
  return { opponent, counters };
}

/** @typedef {{ opponent: string, counters: string }} MatchupEntry */
/** @typedef {{ name: string, reason: string }} BattleEssential */
/** @typedef {{
 *   intro?: string,
 *   tips?: string[],
 *   matchups?: MatchupEntry[],
 *   essentials?: BattleEssential[],
 *   variants?: ChampionVariant[]
 * }} LeagueBattleGuide */
/** @typedef {{
 *   id?: string,
 *   label: string,
 *   subtitle?: string,
 *   tips?: string[],
 *   essentials?: BattleEssential[],
 *   matchups?: MatchupEntry[]
 * }} ChampionVariant */

/** @typedef {'level'|'tm'|'hm'|'tutor'|'egg'} MoveSource */
/** @typedef {{ name: string, use: string, source?: MoveSource, sourceDetail?: string, type?: string }} GuideMove */

/** @type {Record<MoveSource, { label: string, tip?: string, tipPrefix?: string }>} */
export const MOVE_SOURCE_META = {
  level: { label: '升級', tip: '自身升級習得' },
  tm: { label: 'TM', tipPrefix: '技能機' },
  hm: { label: 'HM', tipPrefix: '秘傳' },
  tutor: { label: '教學', tip: '招式教學習得' },
  egg: { label: '蛋', tip: '蛋招式' },
};

/**
 * @param {string} name
 * @param {string} use
 * @param {MoveSource} [source]
 * @param {string} [sourceDetail] TM/HM 編號，如 TM13、HM03
 * @param {string} [type] 招式屬性 key；省略時由 moveTypes 對照表解析
 * @returns {GuideMove}
 */
export function mv(name, use, source, sourceDetail, type) {
  /** @type {GuideMove} */
  const move = { name, use };
  if (source) move.source = source;
  if (sourceDetail) move.sourceDetail = sourceDetail;
  if (type) move.type = type;
  return move;
}

export function supply(name, quantity, note) {
  return note ? { name, quantity, note } : { name, quantity };
}

/** @typedef {'main'|'postgame'|'daybreak'|'path'} RequestCategory */

/**
 * @param {number} number
 * @returns {RequestCategory}
 */
export function reqCategory(number) {
  if (number >= 108) return 'path';
  if (number >= 95) return 'daybreak';
  if (number >= 89) return 'postgame';
  return 'main';
}

/**
 * @param {number|string} number
 * @returns {string}
 */
export function requestSlug(number) {
  return String(number).replace(/[～~]/g, '-');
}

/**
 * @param {number} number
 * @param {string} title
 * @param {Record<string, string>} fields
 * @param {{ category?: RequestCategory, hint?: string }} [opts]
 */
export function req(number, title, fields, opts = {}) {
  const category = opts.category ?? reqCategory(typeof number === 'number' ? number : parseInt(String(number), 10) || 0);
  const rows = Object.entries(fields).map(([label, value]) => ({ label, value }));
  return {
    type: 'request',
    number,
    title,
    category,
    rows,
    hint: opts.hint,
  };
}

/**
 * @param {object} battle
 */
const BATTLE_ROLES_WITH_TEAMS = new Set(['gym', 'trainer', 'wild', 'legendary', 'noble']);

export function assertBattle(battle) {
  if (import.meta.env?.PROD) return;
  if (!BATTLE_ROLES_WITH_TEAMS.has(battle.role)) return;
  const teams = battle.recommendedTeams || [];
  if (teams.length < 1 || teams.length > 2) {
    console.warn('recommendedTeams 應為 1～2 套', battle);
  }
  if ((battle.role === 'legendary' || battle.role === 'noble') && !battle.notes) {
    console.warn('legendary/noble 戰鬥建議填 notes（捕捉／打法說明）', battle);
  }
}

/** @param {{ note?: string, recommendedTeams: RecommendedTeam[] }} league */
export function assertLeague(league) {
  if (import.meta.env?.PROD) return;
  const teams = league?.recommendedTeams || [];
  if (teams.length < 1 || teams.length > 2) {
    console.warn('league.recommendedTeams 應為 1～2 套', league);
  }
}
