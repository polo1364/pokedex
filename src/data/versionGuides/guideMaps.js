/** 地圖 slot 1～8（依圖上標籤文字 bbox 像素量測）→ 各版本 gym.order */
export const MAP_SLOT_GYM_ORDER = {
  'red-blue': [1, 2, 3, 4, 5, 6, 7, 8],
  yellow: [1, 2, 3, 4, 5, 6, 7, 8],
  'firered-leafgreen': [1, 2, 3, 4, 5, 6, 7, 8],
  'gold-silver': [1, 2, 3, 4, 5, 6, 7, 8],
  crystal: [1, 2, 3, 4, 5, 6, 7, 8],
  'ruby-sapphire': [1, 2, 3, 4, 5, 6, 7, 8],
  emerald: [1, 2, 3, 4, 5, 6, 7, 8],
};

const kantoGymHotspots = [
  { slot: 1, left: '19.67%', top: '18.61%', width: '12%', height: '10%', placement: 'top' },
  { slot: 2, left: '45.57%', top: '16.59%', width: '12%', height: '10%', placement: 'top' },
  { slot: 3, left: '43.72%', top: '64.73%', width: '12%', height: '10%', placement: 'bottom' },
  { slot: 4, left: '29.36%', top: '41.32%', width: '12%', height: '10%', placement: 'top' },
  { slot: 5, left: '46%', top: '42%', width: '12%', height: '10%', placement: 'top' },
  { slot: 6, left: '67.88%', top: '66.11%', width: '12%', height: '10%', placement: 'bottom' },
  { slot: 7, left: '12.75%', top: '79.99%', width: '12%', height: '10%', placement: 'top' },
  { slot: 8, left: '7.37%', top: '53.48%', width: '12%', height: '10%', placement: 'left' },
];

/** 黃版關都地圖熱點（圖上 ⑤淺紅、⑥金黃） */
const kantoYellowGymHotspots = [
  { slot: 1, left: '19.67%', top: '15.61%', width: '12%', height: '10%', placement: 'top' },
  { slot: 2, left: '42.57%', top: '12.59%', width: '12%', height: '10%', placement: 'top' },
  { slot: 3, left: '43.72%', top: '60.73%', width: '12%', height: '10%', placement: 'bottom' },
  { slot: 4, left: '27.36%', top: '41.32%', width: '12%', height: '10%', placement: 'top' },
  { slot: 5, left: '68.88%', top: '62.11%', width: '12%', height: '10%', placement: 'bottom' },
  { slot: 6, left: '44%', top: '38%', width: '12%', height: '10%', placement: 'top' },
  { slot: 7, left: '12.75%', top: '88.99%', width: '12%', height: '10%', placement: 'top' },
  { slot: 8, left: '7.37%', top: '50.48%', width: '12%', height: '10%', placement: 'left' },
];

const kantoLeagueHotspot = {
  label: '石英高原',
  left: '3.5%',
  top: '12%',
  width: '12%',
  height: '9%',
  placement: 'bottom',
};

const kantoMapCaption = '將滑鼠移至道館標籤或石英高原可預覽資訊，點擊跳至攻略。標籤看不清時可橫向捲動，或點「開啟大圖」檢視。';

const johtoGymHotspots = [
  { slot: 1, left: '56.28%', top: '35.18%', width: '8%', height: '6.67%', placement: 'top' },
  { slot: 2, left: '12.56%', top: '35.39%', width: '8%', height: '6.67%', placement: 'top' },
  { slot: 3, left: '34.15%', top: '34.43%', width: '8%', height: '6.67%', placement: 'top' },
  { slot: 4, left: '24.64%', top: '12.96%', width: '8%', height: '6.67%', placement: 'bottom' },
  { slot: 5, left: '5.50%', top: '61.96%', width: '8%', height: '6.67%', placement: 'left' },
  { slot: 6, left: '51.32%', top: '70.56%', width: '8%', height: '6.67%', placement: 'bottom' },
  { slot: 7, left: '57.72%', top: '12.22%', width: '8%', height: '6.67%', placement: 'top' },
  { slot: 8, left: '73.33%', top: '23.17%', width: '8%', height: '6.67%', placement: 'right' },
];

const johtoLeagueHotspot = {
  label: '寶可夢聯盟',
  left: '83.50%',
  top: '49.00%',
  width: '8%',
  height: '6%',
  placement: 'bottom',
};

const johtoMapCaption = '將滑鼠移至道館標籤或寶可夢聯盟可預覽資訊，點擊跳至攻略。標籤看不清時可橫向捲動，或點「開啟大圖」檢視。';

const hoennGymHotspots = [
  { slot: 1, left: '5.98%', top: '9.78%', width: '8%', height: '6.67%', placement: 'top' },
  { slot: 2, left: '3.41%', top: '66.42%', width: '8%', height: '6.67%', placement: 'left' },
  { slot: 3, left: '38.70%', top: '36.13%', width: '8%', height: '6.67%', placement: 'top' },
  { slot: 4, left: '44.14%', top: '23.17%', width: '8%', height: '6.67%', placement: 'top' },
  { slot: 5, left: '15.25%', top: '40.81%', width: '8%', height: '6.67%', placement: 'top' },
  { slot: 6, left: '63.16%', top: '10.84%', width: '8%', height: '6.67%', placement: 'top' },
  { slot: 7, left: '65.79%', top: '64.51%', width: '8%', height: '6.67%', placement: 'right' },
  { slot: 8, left: '57.30%', top: '38.04%', width: '8%', height: '6.67%', placement: 'top' },
];

const hoennLeagueHotspot = {
  label: '寶可夢聯盟',
  left: '83.79%',
  top: '6.70%',
  width: '8%',
  height: '6%',
  placement: 'bottom',
};

const hoennMapCaption = '將滑鼠移至道館標籤或寶可夢聯盟可預覽資訊，點擊跳至攻略。標籤看不清時可橫向捲動，或點「開啟大圖」檢視。';

export const GUIDE_MAPS = {
  kanto: {
    src: './images/guides/kanto.png',
    alt: '關都地區地圖',
    caption: kantoMapCaption,
    hotspots: kantoGymHotspots,
    leagueHotspot: kantoLeagueHotspot,
  },
  'kanto-yellow': {
    src: './images/guides/kanto-yellow.png',
    alt: '關都地區地圖（皮卡丘版）',
    caption: kantoMapCaption,
    hotspots: kantoYellowGymHotspots,
    leagueHotspot: kantoLeagueHotspot,
  },
  johto: {
    src: './images/guides/johto.png',
    alt: '城都地區地圖（金／銀・水晶版）',
    caption: johtoMapCaption,
    hotspots: johtoGymHotspots,
    leagueHotspot: johtoLeagueHotspot,
  },
  hoenn: {
    src: './images/guides/hoenn.png',
    alt: '豐緣地區地圖（紅／藍・綠寶石版）',
    caption: hoennMapCaption,
    hotspots: hoennGymHotspots,
    leagueHotspot: hoennLeagueHotspot,
  },
  sevii: {
    src: './images/guides/sevii.png',
    alt: '七之島地圖',
    caption: '將滑鼠移至地點可預覽資訊，點擊跳至該島攻略。標籤看不清時可橫向捲動，或點「開啟大圖」檢視。',
    hotspots: [
      { id: 'island-1', kind: 'island', island: 1, phase: 'tri', left: '2.5%', top: '57.5%', width: '19%', height: '29%', placement: 'right' },
      { id: 'island-2', kind: 'island', island: 2, phase: 'tri', left: '20.5%', top: '18%', width: '13%', height: '14%', placement: 'bottom' },
      { id: 'island-3', kind: 'island', island: 3, phase: 'tri', left: '27%', top: '46%', width: '14%', height: '18%', placement: 'top' },
      { id: 'island-4', kind: 'island', island: 4, phase: 'rainbow', left: '39%', top: '17%', width: '14%', height: '18%', placement: 'bottom' },
      { id: 'island-5', kind: 'island', island: 5, phase: 'rainbow', left: '49.5%', top: '39%', width: '21%', height: '26%', placement: 'left' },
      { id: 'island-6', kind: 'island', island: 6, phase: 'rainbow', left: '68.5%', top: '59%', width: '19%', height: '26%', placement: 'top' },
      { id: 'island-7', kind: 'island', island: 7, phase: 'rainbow', left: '76%', top: '9%', width: '18%', height: '22%', placement: 'bottom' },
      {
        id: 'story-ember',
        kind: 'story',
        island: 1,
        label: '火焰山',
        placeName: '火焰山',
        battleRefs: ['expansion:sevii:2', 'expansion:sevii:3'],
        left: '12.5%',
        top: '47%',
        width: '9%',
        height: '7%',
        placement: 'top',
      },
      {
        id: 'story-icefall',
        kind: 'story',
        island: 4,
        label: '冰凍瀑布洞窟',
        placeName: '冰凍瀑布洞窟',
        battleRefs: ['expansion:sevii:5'],
        left: '47.5%',
        top: '11%',
        width: '9%',
        height: '7%',
        placement: 'bottom',
      },
      {
        id: 'story-dotted',
        kind: 'story',
        island: 6,
        label: '點之穴',
        placeName: '點之穴',
        left: '72.5%',
        top: '68%',
        width: '9%',
        height: '7%',
        placement: 'top',
      },
      {
        id: 'story-warehouse',
        kind: 'story',
        island: 5,
        label: '火箭隊倉庫',
        placeName: '火箭隊倉庫',
        battleRefs: ['expansion:sevii:6'],
        left: '54.5%',
        top: '66%',
        width: '9%',
        height: '7%',
        placement: 'left',
      },
    ],
  },
  'battle-frontier': {
    src: './images/guides/battle-frontier.png',
    alt: '戰鬥開拓區地圖',
    width: 1672,
    height: 941,
    caption: '將滑鼠移至設施或地點可預覽資訊，點擊跳至攻略。標籤看不清時可橫向捲動，或點「開啟大圖」檢視。',
    hotspots: [
      // 座標對準 battle-frontier.png 上的文字標籤 pill，不覆蓋整棟建築。
      { id: 'facility-1', kind: 'facility', island: 1, label: '對戰塔', left: '47.5%', top: '20.5%', width: '8%', height: '4%', placement: 'bottom' },
      { id: 'facility-2', kind: 'facility', island: 2, label: '對戰工廠', left: '11%', top: '68.5%', width: '8%', height: '5%', placement: 'right' },
      { id: 'facility-3', kind: 'facility', island: 3, label: '對戰巨蛋', left: '13%', top: '18%', width: '8%', height: '4%', placement: 'right' },
      { id: 'facility-4', kind: 'facility', island: 4, label: '對戰競技場', left: '58.75%', top: '42%', width: '8.5%', height: '4%', placement: 'left' },
      { id: 'facility-5', kind: 'facility', island: 5, label: '對戰水管', left: '26.75%', top: '40.75%', width: '8.5%', height: '4.5%', placement: 'right' },
      { id: 'facility-6', kind: 'facility', island: 6, label: '對戰宮殿', left: '74.75%', top: '50.5%', width: '8.5%', height: '5%', placement: 'left' },
      { id: 'facility-7', kind: 'facility', island: 7, label: '對戰金字塔', left: '73%', top: '14%', width: '10%', height: '5%', placement: 'left' },
      {
        id: 'story-route111',
        kind: 'story',
        label: '111 號道路入口',
        left: '37.3%',
        top: '11%',
        width: '9.33%',
        height: '4.36%',
        placement: 'bottom',
        hint: '破關後由此進入；亞希達可帶路至開拓區',
        scrollTo: 'prerequisites',
      },
      {
        id: 'story-scott',
        kind: 'story',
        label: '亞希達的家',
        left: '30.44%',
        top: '25.29%',
        width: '7.06%',
        height: '4.36%',
        placement: 'right',
        hint: '開拓區創辦人亞希達的住所，位於巨蛋與對戰塔之間',
      },
      {
        id: 'story-move-tutor',
        kind: 'story',
        label: '招式教學屋',
        left: '9%',
        top: '49.75%',
        width: '8%',
        height: '4.5%',
        placement: 'right',
        hint: '兩位婆婆以戰鬥點數教學招式，巨蛋西南側',
        scrollTo: 'bp-exchange',
      },
      {
        id: 'story-ranking',
        kind: 'story',
        label: '排名殿堂',
        left: '58.43%',
        top: '25.08%',
        width: '6.1%',
        height: '4.36%',
        placement: 'bottom',
        hint: '查閱各設施連勝紀錄；位於對戰塔與金字塔之間',
      },
      {
        id: 'story-exchange',
        kind: 'story',
        label: '開拓區兌換處',
        left: '43.5%',
        top: '48%',
        width: '9%',
        height: '4%',
        placement: 'top',
        hint: '以戰鬥點數兌換剩飯、選擇頭帶等道具與招式',
        scrollTo: 'bp-exchange',
      },
      {
        id: 'story-pokecenter',
        kind: 'story',
        label: '寶可夢中心',
        left: '41.87%',
        top: '60.79%',
        width: '7.6%',
        height: '4.57%',
        placement: 'top',
        hint: '恢復寶可夢、存放／取回寶可夢',
      },
      {
        id: 'story-pier',
        kind: 'story',
        label: '破浪號碼頭',
        left: '5%',
        top: '83%',
        width: '8%',
        height: '4.5%',
        placement: 'right',
        hint: '凱那市或水靜市搭破浪號抵達；第二次起可直達',
      },
      {
        id: 'story-artisan',
        kind: 'story',
        label: '藝術家之洞',
        left: '40%',
        top: '91%',
        width: '9%',
        height: '4.5%',
        placement: 'top',
        hint: '貫穿島嶼南北的洞穴捷徑；宮殿側入口，出口在對戰塔東側',
      },
      {
        id: 'story-sudowoodo',
        kind: 'story',
        label: '樹才怪',
        left: '91.2%',
        top: '65.7%',
        width: '5.56%',
        height: '4.68%',
        placement: 'left',
        hint: '宮殿東南瀑布上的樹才怪；擊敗或收服後可衝浪進入藝術家之洞',
      },
    ],
  },
};

const hisuiMapCaption = '將滑鼠移至地區標籤或地點可預覽資訊，點擊跳至攻略。標籤看不清時可橫向捲動，或點「開啟大圖」檢視。';

/** @param {object} extra */
function hisuiHotspot(id, kind, label, left, top, width, height, extra = {}) {
  const regionMatch = /^region-(\d+)$/.exec(id);
  const island = extra.island ?? (regionMatch ? Number(regionMatch[1]) : undefined);
  return {
    id,
    kind,
    label,
    left,
    top,
    width,
    height,
    placement: extra.placement || 'top',
    ...extra,
    ...(island != null ? { island } : {}),
  };
}

/** 本篇專用（12）；禁止 DLC battleRef */
export const HISUI_MAIN_HOTSPOTS = [
  hisuiHotspot('region-1', 'island', '黑曜原野', '69.79%', '44.07%', '12.90%', '7.16%', { island: 1 }),
  hisuiHotspot('region-2', 'island', '紅蓮濕地', '22.42%', '68.48%', '15.29%', '7.16%', { island: 2, placement: 'bottom' }),
  hisuiHotspot('region-3', 'island', '群青海岸', '13.91%', '41.82%', '11.83%', '7.80%', { island: 3, placement: 'left' }),
  hisuiHotspot('region-4', 'island', '天冠山麓', '40.81%', '27.14%', '12.30%', '7.16%'),
  hisuiHotspot('region-5', 'island', '純白凍土', '41.29%', '7.82%', '12.12%', '7.16%'),
  hisuiHotspot('region-6', 'island', '神奧神殿', '15.13%', '25.50%', '11.24%', '3.08%', { island: 6 }),
  hisuiHotspot('hub-jubilife', 'story', '祝慶村', '42.83%', '55.30%', '11.30%', '3.08%', { scrollTo: 'prerequisites' }),
  hisuiHotspot('noble-kleavor', 'story', '森林王戰場', '67.62%', '82.25%', '11.12%', '3.08%', { island: 1, battleRefs: ['noble:1'], placement: 'bottom' }),
  hisuiHotspot('noble-lilligant', 'story', '峭壁女王戰場', '35.38%', '89.05%', '11.54%', '3.08%', { island: 2, battleRefs: ['noble:2'], placement: 'bottom' }),
  hisuiHotspot('noble-arcanine', 'story', '熔岩戰場', '6.73%', '65.67%', '10.71%', '3.08%', { island: 3, battleRefs: ['noble:3'], placement: 'left' }),
  hisuiHotspot('noble-electrode', 'story', '迎月戰場', '42.32%', '34.43%', '12.02%', '3.08%', { island: 4, battleRefs: ['noble:4'] }),
  hisuiHotspot('noble-avalugg', 'story', '雪原王戰場', '41.78%', '16.05%', '14.17%', '3.08%', { island: 5, battleRefs: ['noble:5'] }),
];

/** 洗翠黎明專用（10）；禁止 noble / gym ref */
export const HISUI_DAYBREAK_HOTSPOTS = [
  hisuiHotspot('region-1', 'island', '黑曜原野', '69.79%', '44.07%', '12.90%', '7.16%', { island: 1 }),
  hisuiHotspot('region-2', 'island', '紅蓮濕地', '22.42%', '68.48%', '15.29%', '7.16%', { island: 2, placement: 'bottom' }),
  hisuiHotspot('region-3', 'island', '群青海岸', '13.91%', '41.82%', '11.83%', '7.80%', { island: 3, placement: 'left' }),
  hisuiHotspot('region-4', 'island', '天冠山麓', '40.81%', '27.14%', '12.30%', '7.16%'),
  hisuiHotspot('region-5', 'island', '純白凍土', '41.29%', '7.82%', '12.12%', '7.16%'),
  hisuiHotspot('story-heights', 'story', '高崗營地', '73.81%', '29.65%', '11.84%', '3.08%', { island: 1, hint: '委託 95／96 起點' }),
  hisuiHotspot('story-rose', 'story', '玫瑰島', '2.00%', '30.00%', '8.29%', '3.08%', { island: 3, hint: '委託 95 調查地', placement: 'left' }),
  hisuiHotspot('story-ginkgo', 'story', '銀杏沙灘', '12.99%', '25.50%', '10.89%', '3.08%', {
    island: 3,
    hint: '98 勁敵；106 剛石的願望（102 後，見後段特殊對戰）',
    battleRefs: ['expansion:daybreak:1'],
    placement: 'left',
  }),
  hisuiHotspot('story-diamond', 'story', '金剛聚落', '25.39%', '57.17%', '11.12%', '3.08%', {
    island: 2,
    hint: '107 珠貝的願望',
    battleRefs: ['expansion:daybreak:3'],
  }),
  hisuiHotspot('story-hollow', 'story', '秘密小洞', '61.73%', '10.42%', '9.18%', '3.08%', { island: 5, hint: '委託 99 菇誘糰×10' }),
];

GUIDE_MAPS['hisui-main'] = {
  ...{
    src: './images/guides/hisui.png',
    alt: '洗翠地區地圖（本篇）',
    width: 1672,
    height: 941,
    caption: hisuiMapCaption,
  },
  hotspots: HISUI_MAIN_HOTSPOTS,
};

GUIDE_MAPS['hisui-daybreak'] = {
  ...{
    src: './images/guides/hisui.png',
    alt: '洗翠地區地圖（洗翠黎明）',
    width: 1672,
    height: 941,
    caption: hisuiMapCaption,
  },
  hotspots: HISUI_DAYBREAK_HOTSPOTS,
};

export const VERSION_MAP_ID = {
  'red-blue': 'kanto',
  yellow: 'kanto-yellow',
  'firered-leafgreen': 'kanto',
  'gold-silver': 'johto',
  crystal: 'johto',
  'ruby-sapphire': 'hoenn',
  emerald: 'hoenn',
  'legends-arceus': 'hisui-main',
};

export const EXPANSION_MAP_ID = {
  sevii: 'sevii',
  'battle-frontier': 'battle-frontier',
  daybreak: 'hisui-daybreak',
};

export function getGuideMap(versionId) {
  const mapId = VERSION_MAP_ID[versionId];
  return mapId ? GUIDE_MAPS[mapId] : null;
}

export function getExpansionMap(expansionId) {
  const mapId = EXPANSION_MAP_ID[expansionId];
  return mapId ? GUIDE_MAPS[mapId] : null;
}

export function getGymOrderForSlot(versionId, slot) {
  const orderMap = MAP_SLOT_GYM_ORDER[versionId];
  if (!orderMap || slot < 1 || slot > orderMap.length) return null;
  return orderMap[slot - 1];
}

/**
 * @param {number} sectionNumber
 * @param {{ sections?: object[] }} expansion
 */
export function resolveExpansionIslandSection(sectionNumber, expansion) {
  return expansion?.sections?.find(
    (s) => s.type === 'island' && s.number === sectionNumber,
  ) || null;
}

/** @deprecated 使用 resolveExpansionIslandSection */
export function resolveSeviiIslandSection(island, expansion) {
  return resolveExpansionIslandSection(island, expansion);
}

/**
 * @param {number} island
 * @param {string} placeName
 * @param {{ sections?: object[] }} expansion
 */
export function resolveSeviiPlace(island, placeName, expansion) {
  const section = resolveExpansionIslandSection(island, expansion);
  if (!section) return null;
  const place = section.places?.find((p) => p.name === placeName || p.name.includes(placeName));
  return place ? { section, place } : { section, place: null };
}
