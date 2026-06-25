import {
  getVersionGuide, isPlaceholder, resolveBattle, getLeagueOpponents,
} from '../src/data/versionGuides/index.js';
import { typeNamesCN } from '../src/config.js';

function formatPokemon(p) {
  const types = p.types.map((t) => typeNamesCN[t] || t).join('／');
  return `${p.name}${p.level ? ` Lv.${p.level}` : ''}（${types}）`;
}

function formatTeam(team) {
  const members = team.pokemon.map((p) => {
    const types = p.types.map((t) => typeNamesCN[t] || t).join('／');
    return `${p.name}（${types}）`;
  }).join('、');
  return `【${team.label}】${members}。${team.reason}`;
}

function formatOpponent(battle, prefix = '') {
  if (!battle) return '';
  const lines = [`${prefix}${battle.name}`];
  if (battle.specialty) lines.push(`專長：${typeNamesCN[battle.specialty] || battle.specialty}`);
  if (battle.notes) lines.push(`備註：${battle.notes}`);
  const partyLabel = battle.role === 'wild' || battle.role === 'legendary' ? '野生寶可夢' : '對手隊伍';
  lines.push(`${partyLabel}：` + battle.party.map(formatPokemon).join('、'));
  return lines.join('\n');
}

function battleRolePrefix(battle) {
  switch (battle.role) {
    case 'gym':
      return `道館${battle.order} `;
    case 'trainer':
      return `戰鬥${battle.order} `;
    case 'wild':
      return '事件 ';
    case 'legendary':
      return '傳說 ';
    case 'noble':
      return '王／女王 ';
    default:
      return '';
  }
}

function formatExpansionPrerequisites(prerequisites) {
  if (!prerequisites?.length) return '';
  const lines = ['通行證前置：'];
  prerequisites.forEach((phase) => {
    lines.push(phase.title);
    phase.rows?.forEach((r) => lines.push(`  ${r.label}：${r.value}`));
  });
  return lines.join('\n');
}

function formatExpansionHms(hms) {
  if (!hms?.length) return '';
  const lines = ['建議秘傳招式：'];
  hms.forEach((h) => lines.push(`  ${h.name}（${h.importance}）：${h.usage}`));
  return lines.join('\n');
}

function formatExpansionSection(section) {
  const lines = [];
  switch (section.type) {
    case 'island':
      lines.push(`${section.title}：${section.intro || ''}`);
      section.flows?.slice(0, 4).forEach((f, i) => lines.push(`  ${i + 1}. ${f}`));
      section.tips?.slice(0, 2).forEach((t) => lines.push(`  提示：${t}`));
      break;
    case 'summary':
      lines.push(section.title);
      if (section.summaryMode === 'columns') {
        section.rows?.forEach((r) => {
          if (r.cells) lines.push(`  ${r.cells.join('：')}`);
          else lines.push(`  ${r.label || r.col1}：${r.value || r.col2}`);
        });
      } else {
        section.rows?.forEach((r) => lines.push(`  ${r.island}（${r.priority}）：${r.task}；HM：${r.hms}`));
      }
      break;
    case 'checklist':
      lines.push(section.title);
      section.steps?.forEach((s) => {
        if (typeof s === 'string') lines.push(`  - ${s}`);
        else if (s.step) lines.push(`  ${s.step}. ${s.location}：${s.goal}`);
        else lines.push(`  - ${s.location}：${s.goal}`);
      });
      break;
    case 'teams':
      lines.push(section.title);
      section.groups?.forEach((g) => {
        lines.push(`  ${g.title}：${g.members?.map((m) => m.name).join('、')}`);
      });
      break;
    case 'faq':
      lines.push(section.title);
      section.items?.forEach((item) => {
        lines.push(`  Q：${item.problem}`);
        lines.push(`  A：${item.solution}`);
      });
      break;
    case 'conclusion':
      lines.push(`${section.title}：${section.body}`);
      break;
    case 'request':
      lines.push(`委託 ${section.number} ${section.title}`);
      section.rows?.slice(0, 6).forEach((r) => lines.push(`  ${r.label}：${r.value}`));
      break;
    default:
      break;
  }
  return lines.join('\n');
}

function formatExpansionWalkthrough(exp) {
  const parts = [];
  const pre = formatExpansionPrerequisites(exp.prerequisites);
  if (pre) parts.push(pre);
  const hm = formatExpansionHms(exp.hms);
  if (hm) parts.push(hm);
  exp.sections?.forEach((s) => {
    const text = formatExpansionSection(s);
    if (text) parts.push(text);
  });
  return parts.join('\n\n');
}

function formatExpansionBattleContext(exp, battle) {
  const parts = [formatExpansionWalkthrough(exp)];
  if (battle.location) {
    const facility = exp.sections?.find(
      (s) => s.type === 'island' && (
        s.title.includes(battle.location)
        || battle.location.includes(String(s.title).replace('攻略', ''))
      ),
    );
    const island = facility || exp.sections?.find(
      (s) => s.type === 'island' && battle.location?.includes(`${s.number}之島`),
    );
    if (island) {
      parts.push(`相關設施流程：${island.title}`);
      island.flows?.forEach((f, i) => parts.push(`  ${i + 1}. ${f}`));
    }
  }
  return parts.filter(Boolean).join('\n\n');
}

function formatGymBattle(battle, prefix = '') {
  if (!battle) return '';
  const lines = [formatOpponent(battle, prefix)];
  if (battle.location) lines.splice(1, 0, `地點：${battle.location}`);
  if (battle.badge) lines.splice(battle.location ? 2 : 1, 0, `徽章：${battle.badge}`);
  lines.push('建議攜帶隊伍：');
  battle.recommendedTeams.forEach((t) => lines.push(formatTeam(t)));
  return lines.join('\n');
}

function formatBattleGuide(battleRef, guide) {
  const league = guide.league;
  if (!league?.battles) return '';
  const bg = league.battles[battleRef];
  if (!bg) return '';
  const lines = [];
  if (bg.intro) lines.push(bg.intro);
  if (bg.tips?.length) {
    lines.push('注意：' + bg.tips.join('；'));
  }
  if (bg.matchups?.length) {
    lines.push('推薦上場：');
    bg.matchups.forEach((m) => lines.push(`  ${m.opponent} → ${m.counters}`));
  }
  if (bg.variants?.length) {
    bg.variants.forEach((v) => {
      lines.push(`${v.label}（${v.subtitle || ''}）`);
      v.matchups?.forEach((m) => lines.push(`  ${m.opponent} → ${m.counters}`));
    });
  }
  return lines.join('\n');
}

function formatLeague(guide) {
  const league = guide.league;
  if (!league) return '';
  const parts = ['四天王＋冠軍（連戰，中途不可換隊）'];
  if (league.intro || league.note) parts.push(league.intro || league.note);
  if (league.coverage?.length) {
    parts.push('必備攻擊面：');
    league.coverage.forEach((c) => parts.push(`  ${c.label}：${c.uses}`));
  }
  parts.push('建議攜帶隊伍（須一次帶入打完全程）：');
  league.recommendedTeams.forEach((t) => parts.push(formatTeam(t)));
  if (league.battleOrder?.length) {
    parts.push('連戰上場分配：');
    league.battleOrder.forEach((r) => {
      parts.push(`  ${r.battle}：${r.leads}（備用 ${r.backup}）`);
    });
  }
  parts.push('對手情報（依戰鬥順序）：');
  getLeagueOpponents(guide).forEach(({ battle, battleRef }, i) => {
    const label = battleRef === 'champion' ? '冠軍' : `四天王 ${i + 1}`;
    parts.push(formatOpponent(battle, `${label} `));
    const guideText = formatBattleGuide(battleRef, guide);
    if (guideText) parts.push(guideText);
  });
  if (league.conclusion) parts.push(league.conclusion);
  return parts.join('\n');
}

function hasAnyExpansionContent(exp) {
  if (!exp) return false;
  if (exp.gyms?.length) return true;
  if (exp.sections?.length) return true;
  if (exp.league?.recommendedTeams?.length) return true;
  if (exp.prerequisites?.length) return true;
  return false;
}

/**
 * @param {string} versionId
 * @param {string} [partId='main']
 */
export function getGuideScope(versionId, partId = 'main') {
  const guide = getVersionGuide(versionId);
  if (!guide) return null;

  const expansions = (guide.expansions || [])
    .filter(hasAnyExpansionContent)
    .map((e) => ({ id: e.id, title: e.tabLabel || e.title }));

  let partLabel = guide.mainPartLabel || '本體';
  const activePartId = partId && partId !== 'main' ? partId : 'main';
  if (activePartId !== 'main') {
    const exp = guide.expansions?.find((e) => e.id === activePartId);
    if (exp) partLabel = exp.tabLabel || exp.title;
  }

  return {
    versionId,
    versionTitle: guide.title,
    partId: activePartId,
    partLabel,
    expansions,
  };
}

/**
 * @param {string} versionId
 * @param {string|null} battleRef
 * @param {string} [partId='main']
 */
export function getGuideContext(versionId, battleRef, partId = 'main') {
  if (isPlaceholder(versionId)) return null;

  const guide = getVersionGuide(versionId);
  if (!guide) return null;

  const activePartId = partId && partId !== 'main' ? partId : 'main';

  const parts = [`版本：${guide.title}`];
  if (guide.notes) parts.push(`備註：${guide.notes}`);

  if (battleRef === 'league') {
    parts.push(formatLeague(guide));
  } else if (battleRef) {
    const battle = resolveBattle(battleRef, guide);
    if (battle) {
      const isLeagueOpponent = battleRef === 'champion' || battleRef.startsWith('eliteFour:');
      if (isLeagueOpponent) {
        parts.push('當前對手（四天王／冠軍連戰中，隊伍入場後不可更換）：');
        parts.push(formatOpponent(battle));
        if (guide.league) {
          parts.push('整體建議攜帶隊伍：');
          guide.league.recommendedTeams.forEach((t) => parts.push(formatTeam(t)));
          const guideText = formatBattleGuide(battleRef, guide);
          if (guideText) parts.push(guideText);
        }
      } else {
        parts.push('當前場次：');
        parts.push(formatGymBattle(battle, battleRolePrefix(battle)));
        const expansionMatch = battleRef?.match(/^expansion:([^:]+):/);
        if (expansionMatch) {
          const exp = guide.expansions?.find((e) => e.id === expansionMatch[1]);
          if (exp) {
            const ctx = formatExpansionBattleContext(exp, battle);
            if (ctx) parts.push(ctx);
          }
        }
      }
    }
  } else if (activePartId === 'requests') {
    const exp = guide.expansions?.find((e) => e.id === 'requests');
    if (exp) {
      parts.push(`===【所有委託攻略】（${guide.title}）===`);
      if (exp.notes) parts.push(exp.notes);
      const walkthrough = formatExpansionWalkthrough(exp);
      if (walkthrough) parts.push(walkthrough);
    }
  } else if (activePartId !== 'main') {
    const exp = guide.expansions?.find((e) => e.id === activePartId);
    if (exp && hasAnyExpansionContent(exp)) {
      parts.push(`===【擴充內容：${exp.tabLabel || exp.title}】（僅限《${guide.title}》此 DLC，勿與他版混用）===`);
      if (exp.notes) parts.push(exp.notes);
      const walkthrough = formatExpansionWalkthrough(exp);
      if (walkthrough) parts.push(walkthrough);
      const battleTitle = exp.battleSectionTitle || '重要戰鬥';
      if (exp.gyms?.length) {
        parts.push(`${battleTitle}：`);
        exp.gyms.forEach((b) => parts.push(formatGymBattle(b, battleRolePrefix(b))));
      }
    }
  } else {
    parts.push(`===【本體主線】（${guide.title}）===`);
    const walkthrough = formatExpansionWalkthrough(guide);
    if (walkthrough) parts.push(walkthrough);
    if (guide.nobles?.length) {
      parts.push('王／女王鎮撫戰：');
      guide.nobles.forEach((b) => parts.push(formatGymBattle(b, battleRolePrefix(b))));
    }
    if (guide.gyms?.length) {
      const gymTitle = guide.id === 'legends-arceus' ? '主線傳說戰' : '道館';
      parts.push(`${gymTitle}：`);
      guide.gyms.forEach((b) => parts.push(formatGymBattle(b, battleRolePrefix(b))));
    }
    parts.push(formatLeague(guide));
  }

  return parts.filter(Boolean).join('\n');
}
