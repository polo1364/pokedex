import { escapeHtml, renderInfoCard } from './infoCards.js';

const EGG_GROUP_NAMES = {
  monster: '怪獸',
  water1: '水中1',
  bug: '蟲',
  flying: '飛行',
  ground: '陸上',
  fairy: '妖精',
  plant: '植物',
  humanshape: '人型',
  water3: '水中3',
  mineral: '礦物',
  indeterminate: '不定形',
  water2: '水中2',
  ditto: '百變',
  dragon: '龍',
  'no-eggs': '無法孵化',
  undiscovered: '無法孵化',
};

const GROWTH_RATE_NAMES = {
  slow: '慢速',
  'medium-slow': '較慢',
  medium: '普通',
  'medium-fast': '較快',
  fast: '快速',
  fluctuating: '浮動',
  erratic: '起伏',
};

const FIELD_TIPS = {
  egg: '決定能在培育屋與哪些蛋群的寶可夢交配；須同蛋群，或一方為百變怪。',
  gender: 'gender_rate 以 1/8 為單位表示雌性機率；-1 表示無性別（如小磁怪、急凍鳥）。',
  hatch: '孵化步數 = (hatch_counter + 1) × 255；括號內為孵化周期數（攜帶火焰軀體等可縮短）。',
  capture: '數值 0–255，越高越容易在野生遭遇中捕獲；不直接等同於「一球必中」。',
  happiness: '剛捕獲或孵化的親密度起點；影響進化條件（如皮丘、伊布）與部分招式。',
  growth: '升級所需經驗的成長曲線；數值越高代表後期升級越慢。',
  infertile: '此寶可夢屬於無法孵化的蛋群，無法透過培育屋繁殖後代。',
  height: '圖鑑登錄的身高；實際遊戲中不影響戰鬥或培育。',
  weight: '圖鑑登錄的體重；部分招式（如重磅衝撞）會參考體重差。',
  generation: '此寶可夢首次登場的世代編號。',
  experience: '打倒此寶可夢後，參戰寶可夢獲得的基礎經驗值（會再依等級差等修正）。',
};

const BADGE_TIPS = {
  legendary: '傳說寶可夢：通常僅能遭遇一次，多數無法在培育屋繁殖。',
  mythical: '幻之寶可夢：多透過活動或特殊劇情取得，與傳說類似。',
  baby: '寶可夢嬰兒：需特定條件（如親密度、道具）才能進化的幼兒形態。',
};

const CAPTURE_TIER_CLASS = {
  非常容易: 'info-tier--very-easy',
  較易: 'info-tier--easy',
  普通: 'info-tier--normal',
  較難: 'info-tier--hard',
  很難: 'info-tier--very-hard',
};

function isZhHant(languageName) {
  return languageName?.toLowerCase() === 'zh-hant';
}

export function getGeneraLabel(speciesData) {
  if (!speciesData?.genera?.length) return '';
  const entry = speciesData.genera.find((g) => isZhHant(g.language?.name));
  return entry?.genus || '';
}

export function getSpeciesBadges(speciesData) {
  if (!speciesData) return [];
  const badges = [];
  if (speciesData.is_legendary) badges.push({ kind: 'legendary', label: '傳說', tip: BADGE_TIPS.legendary });
  if (speciesData.is_mythical) badges.push({ kind: 'mythical', label: '幻獸', tip: BADGE_TIPS.mythical });
  if (speciesData.is_baby) badges.push({ kind: 'baby', label: '寶可夢嬰兒', tip: BADGE_TIPS.baby });
  return badges;
}

function formatGenderRate(rate) {
  if (rate === -1) return '無性別';
  const femalePct = (rate / 8) * 100;
  const malePct = ((8 - rate) / 8) * 100;
  const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
  if (rate === 0) return '♂ 100%';
  if (rate === 8) return '♀ 100%';
  return `♀ ${fmt(femalePct)}%　♂ ${fmt(malePct)}%`;
}

function formatHatchCounter(counter) {
  if (counter == null) return '—';
  const cycles = counter + 1;
  const steps = cycles * 255;
  return `${steps.toLocaleString()} 步（${cycles} 周期）`;
}

function formatCaptureRate(rate) {
  if (rate == null) return { text: '—', html: '—' };
  let tier = '很難';
  if (rate >= 200) tier = '非常容易';
  else if (rate >= 120) tier = '較易';
  else if (rate >= 60) tier = '普通';
  else if (rate >= 30) tier = '較難';
  const tierClass = CAPTURE_TIER_CLASS[tier] || '';
  const html = `${rate} <span class="info-tier ${tierClass}">${tier}</span>`;
  return { text: `${rate}（${tier}）`, html };
}

function formatEggGroups(speciesData) {
  const groups = speciesData?.egg_groups || [];
  if (!groups.length) return '—';
  if (groups.some((g) => g.name === 'undiscovered' || g.name === 'no-eggs')) {
    return null;
  }
  return groups
    .map((g) => EGG_GROUP_NAMES[g.name] || g.name)
    .join(' · ');
}

function formatGrowthRate(speciesData) {
  const name = speciesData?.growth_rate?.name;
  if (!name) return '—';
  return GROWTH_RATE_NAMES[name] || name;
}

/**
 * @returns {{ infertile: boolean, fields: { label: string, value: string, valueHtml?: string, kind: string, tip: string }[] }}
 */
export function getBreedingFields(speciesData) {
  if (!speciesData) {
    return { infertile: false, fields: [] };
  }

  const eggLabel = formatEggGroups(speciesData);
  if (eggLabel === null) {
    return {
      infertile: true,
      fields: [{
        label: '繁殖',
        value: '無法孵化',
        kind: 'infertile',
        tip: FIELD_TIPS.infertile,
      }],
    };
  }

  const capture = formatCaptureRate(speciesData.capture_rate);

  return {
    infertile: false,
    fields: [
      { label: '蛋群', value: eggLabel, kind: 'egg', tip: FIELD_TIPS.egg },
      { label: '性別比', value: formatGenderRate(speciesData.gender_rate), kind: 'gender', tip: FIELD_TIPS.gender },
      { label: '孵化', value: formatHatchCounter(speciesData.hatch_counter), kind: 'hatch', tip: FIELD_TIPS.hatch },
      { label: '捕獲率', value: capture.text, valueHtml: capture.html, kind: 'capture', tip: FIELD_TIPS.capture },
      { label: '初始親密度', value: String(speciesData.base_happiness ?? 70), kind: 'happiness', tip: FIELD_TIPS.happiness },
      { label: '成長速度', value: formatGrowthRate(speciesData), kind: 'growth', tip: FIELD_TIPS.growth },
    ],
  };
}

export function renderBreedingSectionHtml(speciesData) {
  const { infertile, fields } = getBreedingFields(speciesData);
  const gridClass = infertile ? 'info-grid breeding-grid breeding-grid--infertile' : 'info-grid breeding-grid';
  const items = fields.map((f) => renderInfoCard(f)).join('');
  return `<div class="detail-panel detail-section breeding-section">
    <h3 class="section-title">培育資訊<span class="section-tip-icon" tabindex="0" aria-label="培育相關數值說明">ⓘ
      <span class="section-tip" role="tooltip">滑鼠移到各欄位可查看說明；顏色代表不同資料類型。</span>
    </span></h3>
    <div class="${gridClass}">${items}</div>
  </div>`;
}

export function renderSpeciesMetaHtml(speciesData) {
  const genera = getGeneraLabel(speciesData);
  const badges = getSpeciesBadges(speciesData);
  if (!genera && !badges.length) return '';

  const badgeHtml = badges.map((b) =>
    `<span class="species-badge species-badge--${b.kind}" tabindex="0">
      ${escapeHtml(b.label)}
      <span class="species-badge-tip" role="tooltip">${escapeHtml(b.tip)}</span>
    </span>`).join('');
  const generaHtml = genera ? `<span class="species-genera">${escapeHtml(genera)}</span>` : '';

  return `<div class="species-meta">${generaHtml}${badgeHtml ? `<span class="species-badges">${badgeHtml}</span>` : ''}</div>`;
}

export function renderBasicInfoGrid(pokemon, genNum) {
  const exp = pokemon.base_experience != null ? String(pokemon.base_experience) : '—';
  const items = [
    { label: '身高', value: `${pokemon.height / 10}m`, kind: 'height', tip: FIELD_TIPS.height },
    { label: '體重', value: `${pokemon.weight / 10}kg`, kind: 'weight', tip: FIELD_TIPS.weight },
    { label: '世代', value: String(genNum), kind: 'generation', tip: FIELD_TIPS.generation },
    { label: '打倒經驗', value: exp, kind: 'experience', tip: FIELD_TIPS.experience },
  ];
  return `<div class="info-grid info-grid--basic">${items.map((item) => renderInfoCard(item)).join('')}</div>`;
}
