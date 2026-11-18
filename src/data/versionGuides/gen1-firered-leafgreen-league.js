import { pm, cov, mup, mv } from './helpers.js';
import { redBlueLeague } from './gen1-red-blue-league.js';

/** 首次聯盟使用第三世代規則；不包含通關後強化再戰。 */
export const frlgLeague = {
  ...redBlueLeague,
  intro:
    '本頁為火紅／葉綠首次聯盟，連續五場不能回中心或換隊。建議主力約 Lv.55～60，冠軍最高 Lv.63。使用第三世代特性與招式規則，不能直接沿用初代地震打耿鬼的做法。',
  coverage: redBlueLeague.coverage.map((row) =>
    row.attackType === 'ground' ? cov('ground', '地面', '阿柏怪、冠軍火系；耿鬼／鬼斯通有飄浮而免疫') : row,
  ),
  recommendedTeams: redBlueLeague.recommendedTeams.map((team) => ({
    ...team,
    pokemon: team.pokemon.map((pokemon) => pokemon.name === '拉普拉斯'
      ? { ...pokemon, obtain: '西爾佛公司 7F 職員贈送 Lv.25，需再培養。' }
      : pokemon),
  })),
  battles: {
    ...redBlueLeague.battles,
    'eliteFour:3': {
      intro: '菊子全隊帶毒，弱超能力；耿鬼與鬼斯通有飄浮特性，地震與挖洞無效。',
      tips: [
        '引夢貘人用精神強念打毒屬性，但要防耿鬼的暗影球、催眠與混亂。',
        '卡比獸的一般招仍打不到幽靈；可使用 TM30 暗影球，第三世代此招屬物理攻擊。',
        '大嘴蝠弱電兩倍；阿柏怪可用地面或超能力招。',
      ],
      matchups: [
        mup('耿鬼', '引夢貘人精神強念／卡比獸暗影球'),
        mup('大嘴蝠', '雷伊布電招'),
        mup('鬼斯通', '引夢貘人精神強念／卡比獸暗影球'),
        mup('阿柏怪', '引夢貘人／三地鼠'),
        mup('第二隻耿鬼', '引夢貘人／卡比獸暗影球'),
      ],
    },
    champion: {
      intro: '依玩家御三家分為三隊；以下是首次挑戰的完整隊伍與等級，不是通關後強化再戰。',
      variants: [
        {
          ...redBlueLeague.battles.champion.variants[0],
          id: 'bulbasaur',
          party: [
            pm('大比鳥', ['normal', 'flying'], 59),
            pm('胡地', ['psychic'], 57),
            pm('鑽角犀獸', ['ground', 'rock'], 59),
            pm('椰蛋樹', ['grass', 'psychic'], 59),
            pm('暴鯉龍', ['water', 'flying'], 61),
            pm('噴火龍', ['fire', 'flying'], 63),
          ],
        },
        {
          ...redBlueLeague.battles.champion.variants[1],
          id: 'charmander',
          party: [
            pm('大比鳥', ['normal', 'flying'], 59),
            pm('胡地', ['psychic'], 57),
            pm('鑽角犀獸', ['ground', 'rock'], 59),
            pm('風速狗', ['fire'], 59),
            pm('椰蛋樹', ['grass', 'psychic'], 61),
            pm('水箭龜', ['water'], 63),
          ],
        },
        {
          ...redBlueLeague.battles.champion.variants[2],
          id: 'squirtle',
          party: [
            pm('大比鳥', ['normal', 'flying'], 59),
            pm('胡地', ['psychic'], 57),
            pm('鑽角犀獸', ['ground', 'rock'], 59),
            pm('暴鯉龍', ['water', 'flying'], 59),
            pm('風速狗', ['fire'], 61),
            pm('妙蛙花', ['grass', 'poison'], 63),
          ],
        },
      ],
    },
  },
  battleOrder: redBlueLeague.battleOrder.map((row) =>
    row.battle === '菊子'
      ? { battle: '菊子', leads: '引夢貘人／卡比獸暗影球', backup: '雷伊布打大嘴蝠；地面招只用來打阿柏怪' }
      : row,
  ),
  moveSets: [
    {
      pokemon: '拉普拉斯',
      role: '水／冰主力',
      moves: [
        mv('衝浪', '狩獵地帶取得；打岩石、地面、火系', 'hm', 'HM03'),
        mv('冰凍光束', 'Lv.31；打哈克龍與快龍', 'level'),
        mv('泰山壓頂', 'Lv.13；一般物攻', 'level'),
        mv('奇異之光', 'Lv.19；輔助混亂', 'level'),
      ],
      note: '西爾佛公司 7F 贈送 Lv.25；保留泰山壓頂，不需消耗教學機會。',
    },
    {
      pokemon: '雷伊布',
      role: '電系主力',
      moves: [
        mv('十萬伏特', '玉虹遊戲城以代幣兌換', 'tm', 'TM24'),
        mv('電磁波', 'Lv.42；控速', 'level'),
        mv('二連踢', 'Lv.30；備用物攻', 'level'),
        mv('高速移動', 'Lv.47；提升速度', 'level'),
      ],
      note: '本作馬志士給 TM34 電擊波，十萬伏特需要另買 TM24；不是紅／藍的取得方式。',
    },
    {
      pokemon: '引夢貘人',
      role: '超能力主力',
      moves: [
        mv('精神強念', 'Lv.35；打格鬥與毒', 'level'),
        mv('催眠術', '保留催眠貘初始招式；命中有風險', 'level'),
        mv('頭錘', 'Lv.17；一般物攻備用', 'level'),
        mv('定身法', 'Lv.7；限制對手招式', 'level'),
      ],
      note: '不能學自己再生；對幽靈仍要防暗影球，不能單憑剋屬硬換入。',
    },
    {
      pokemon: '卡比獸',
      role: '物攻；暗影球可打超能力與幽靈',
      moves: [
        mv('泰山壓頂', 'Lv.33；一般主攻', 'level'),
        mv('暗影球', '玉虹遊戲城兌換；本世代為物理招式', 'tm', 'TM30'),
        mv('地震', '坂木贈送；不能命中飄浮的耿鬼', 'tm', 'TM26'),
        mv('睡覺', 'Lv.25；保留捕捉時招式', 'level'),
      ],
      note: '本作破壞光線即使擊倒對手，下一回合仍需休息；此配招以暗影球替代。',
    },
    {
      pokemon: '三地鼠',
      role: '高速地面補位',
      moves: [
        mv('地震', 'Lv.51；打阿柏怪與火系', 'level'),
        mv('劈開', 'Lv.38；一般物攻', 'level'),
        mv('挖洞', 'Lv.17；備用地面招', 'level'),
        mv('岩崩', '冠軍之路的一次性招式教學', 'tutor'),
      ],
      note: '把 TM26 留給卡比獸；菊子的耿鬼／鬼斯通與大嘴蝠都免疫地面招。',
    },
  ],
  pitfalls: [
    '本頁僅首次聯盟；通關後再戰隊伍與等級不同。',
    '地面招無法命中飄浮特性，包含耿鬼、鬼斯通、瓦斯彈與雙彈瓦斯。',
    '第三世代依屬性決定物理／特殊；暗影球為物理。',
    'TM 使用後消失，但遊戲城 TM24、TM30 可再次兌換；TM26 與岩崩教學需分配給指定成員。',
    '入場前補滿 HP 與 PP，並保留沿途取得的 PP 回復道具。',
  ],
};
