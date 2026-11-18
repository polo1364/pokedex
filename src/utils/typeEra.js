/**
 * 依世代計算屬性相剋（攻略用）：攻略寫的是當代遊戲，不能直接套用現行相剋表。
 * - 第 1 世代：沒有惡、鋼、妖精；幽靈打超能力無效、蟲與毒互剋、冰打火為 1 倍
 * - 第 2–5 世代：沒有妖精；鋼抵抗幽靈與惡
 * - 第 6 世代起：現行相剋表
 */
import { TYPE_ORDER } from '../config.js';
import { TYPE_CHART } from './typeChart.js';

const GEN1_MISSING = ['dark', 'steel', 'fairy'];
const GEN2_MISSING = ['fairy'];

/** @returns {'gen1'|'gen2'|'modern'} */
export function typeEra(generation) {
  const gen = Number(generation);
  if (gen === 1) return 'gen1';
  if (gen >= 2 && gen <= 5) return 'gen2';
  return 'modern';
}

export function eraTypes(era) {
  const missing = era === 'gen1' ? GEN1_MISSING : era === 'gen2' ? GEN2_MISSING : [];
  return TYPE_ORDER.filter((t) => !missing.includes(t));
}

/** 單一攻擊屬性對單一防禦屬性的倍率（依世代修正）。 */
export function eraMultiplier(attack, defense, era) {
  if (era === 'gen1') {
    if (attack === 'ghost' && defense === 'psychic') return 0;
    if (attack === 'bug' && defense === 'poison') return 2;
    if (attack === 'poison' && defense === 'bug') return 2;
    if (attack === 'ice' && defense === 'fire') return 1;
  }
  if ((era === 'gen1' || era === 'gen2') && defense === 'steel' && (attack === 'ghost' || attack === 'dark')) {
    return 0.5;
  }
  const value = TYPE_CHART[attack]?.[defense];
  return value === undefined ? 1 : value;
}

/**
 * 防禦方的弱點：回傳 4 倍與 2 倍的攻擊屬性（只列該世代存在的屬性）。
 * @param {string[]} defenseTypes
 * @param {number|null} generation 攻略的世代；null（如 PokeMMO，沒有妖精屬性）視為第 5 世代
 */
export function weaknessesFor(defenseTypes, generation) {
  const era = typeEra(generation ?? 5);
  const available = eraTypes(era);
  const types = (defenseTypes || []).filter((t) => available.includes(t));
  const quad = [];
  const double = [];
  if (!types.length) return { quad, double };
  for (const attack of available) {
    const mult = types.reduce((m, d) => m * eraMultiplier(attack, d, era), 1);
    if (mult >= 4) quad.push(attack);
    else if (mult > 1) double.push(attack);
  }
  return { quad, double };
}
