import { pm, rec, mup, mv } from './helpers.js';
import { redBlueLeague } from './gen1-red-blue-league.js';

/** 黃版：初代規則；依勁敵伊布進化分支顯示完整冠軍隊伍。 */
export const yellowLeague = {
  ...redBlueLeague,
  intro:
    '聯盟連續五場，建議主力約 Lv.55～60 並備足回復道具；冠軍最高 Lv.65。皮卡丘可擔任電系核心，但不是必須留在隊伍。冠軍依前期勁敵戰結果有三種分支。',
  recommendedTeams: [
    rec(
      '皮卡丘核心免交換範例',
      '皮卡丘打水／飛行，拉普拉斯打水／冰弱點，引夢貘人打格鬥／毒，卡比獸打胡地，三地鼠補地面；第六格選已培養的贈送御三家。',
      [
        { ...pm('皮卡丘', ['electric']), obtain: '開局取得，Lv.26 學十萬伏特。' },
        ...redBlueLeague.recommendedTeams[0].pokemon.filter(
          (p) => !['雷伊布', '你的御三家'].includes(p.name),
        ),
        {
          ...pm('已培養的贈送御三家', []),
          obtain: '妙蛙種子：華藍市親密度事件；小火龍：24 號道路；傑尼龜：擊敗馬志士後在枯葉市領取。',
        },
      ],
    ),
  ],
  battles: {
    ...redBlueLeague.battles,
    'eliteFour:1': {
      ...redBlueLeague.battles['eliteFour:1'],
      tips: [
        '皮卡丘用電招打四隻水系；迷唇姐交給卡比獸物攻。',
        '刺甲貝、拉普拉斯受到冰招僅四分之一傷害；皮卡丘較脆，上場前補好血。',
      ],
      matchups: [
        mup('白海獅', '皮卡丘'),
        mup('刺甲貝', '皮卡丘'),
        mup('呆殼獸', '皮卡丘'),
        mup('迷唇姐', '卡比獸'),
        mup('拉普拉斯', '皮卡丘'),
      ],
    },
    'eliteFour:3': {
      ...redBlueLeague.battles['eliteFour:3'],
      matchups: redBlueLeague.battles['eliteFour:3'].matchups.map((m) => ({
        ...m,
        counters: m.counters.replaceAll('雷伊布', '皮卡丘'),
      })),
    },
    'eliteFour:4': {
      ...redBlueLeague.battles['eliteFour:4'],
      tips: [
        '保留電招打暴鯉龍、冰凍光束打龍系；化石翼龍可用衝浪或電招。',
        '黃版其中一隻哈克龍帶十萬伏特，快龍帶打雷。拉普拉斯弱電，避免直接換入吃招，先補好血量。',
      ],
      matchups: redBlueLeague.battles['eliteFour:4'].matchups.map((m) => ({
        ...m,
        counters: m.counters.replaceAll('雷伊布', '皮卡丘'),
      })),
    },
    champion: {
      intro: '依你目前看到的勁敵伊布進化形態選擇分支。穿山王、胡地、椰蛋樹相同，後三格的種類或等級會變動。',
      variants: [
        {
          id: 'jolteon',
          label: '勁敵：雷伊布',
          subtitle: '刺甲貝 Lv.61／九尾 Lv.63',
          party: [
            pm('穿山王', ['ground'], 61),
            pm('胡地', ['psychic'], 59),
            pm('椰蛋樹', ['grass', 'psychic'], 61),
            pm('刺甲貝', ['water', 'ice'], 61),
            pm('九尾', ['fire'], 63),
            pm('雷伊布', ['electric'], 65),
          ],
          tips: ['分支條件：研究所首戰獲勝，且首次 22 號道路勁敵戰也獲勝。', '用三地鼠地面招處理雷伊布；刺甲貝用電招，冰招只有四分之一效果。'],
          matchups: [
            mup('穿山王', '拉普拉斯衝浪'),
            mup('胡地', '卡比獸物攻'),
            mup('椰蛋樹', '火招／拉普拉斯冰招'),
            mup('刺甲貝', '皮卡丘電招'),
            mup('九尾', '拉普拉斯衝浪'),
            mup('雷伊布', '三地鼠地震'),
          ],
        },
        {
          id: 'flareon',
          label: '勁敵：火伊布',
          subtitle: '三合一磁怪 Lv.61／刺甲貝 Lv.63',
          party: [
            pm('穿山王', ['ground'], 61),
            pm('胡地', ['psychic'], 59),
            pm('椰蛋樹', ['grass', 'psychic'], 61),
            pm('三合一磁怪', ['electric'], 61),
            pm('刺甲貝', ['water', 'ice'], 63),
            pm('火伊布', ['fire'], 65),
          ],
          tips: ['分支條件：研究所首戰獲勝，但首次 22 號道路勁敵戰落敗或跳過。', '初代三合一磁怪是純電系，地面招兩倍；火伊布交給衝浪。'],
          matchups: [
            mup('穿山王', '拉普拉斯衝浪'),
            mup('胡地', '卡比獸物攻'),
            mup('椰蛋樹', '火招／拉普拉斯冰招'),
            mup('三合一磁怪', '三地鼠地震'),
            mup('刺甲貝', '皮卡丘電招'),
            mup('火伊布', '拉普拉斯衝浪'),
          ],
        },
        {
          id: 'vaporeon',
          label: '勁敵：水伊布',
          subtitle: '九尾 Lv.61／三合一磁怪 Lv.63',
          party: [
            pm('穿山王', ['ground'], 61),
            pm('胡地', ['psychic'], 59),
            pm('椰蛋樹', ['grass', 'psychic'], 61),
            pm('九尾', ['fire'], 61),
            pm('三合一磁怪', ['electric'], 63),
            pm('水伊布', ['water'], 65),
          ],
          tips: ['分支條件：研究所首戰落敗；不論首次 22 號道路勁敵戰勝敗或是否挑戰，都維持此分支。', '水伊布用電招，九尾用水招，三合一磁怪用地面招。'],
          matchups: [
            mup('穿山王', '拉普拉斯衝浪'),
            mup('胡地', '卡比獸物攻'),
            mup('椰蛋樹', '火招／拉普拉斯冰招'),
            mup('九尾', '拉普拉斯衝浪'),
            mup('三合一磁怪', '三地鼠地震'),
            mup('水伊布', '皮卡丘電招'),
          ],
        },
      ],
    },
  },
  battleOrder: [
    { battle: '科拿', leads: '皮卡丘', backup: '卡比獸打迷唇姐' },
    { battle: '希巴', leads: '拉普拉斯', backup: '引夢貘人打格鬥系' },
    { battle: '菊子', leads: '引夢貘人', backup: '皮卡丘打大嘴蝠' },
    { battle: '渡', leads: '皮卡丘', backup: '拉普拉斯冰招' },
    { battle: '冠軍', leads: '拉普拉斯打穿山王', backup: '依伊布進化分支輪換' },
  ],
  starterLineups: undefined,
  moveSets: [
    {
      pokemon: '皮卡丘',
      role: '電系主力',
      moves: [
        mv('十萬伏特', 'Lv.26；打水系與飛行系', 'level'),
        mv('電磁波', 'Lv.8；控速', 'level'),
        mv('電光一閃', 'Lv.11；收尾', 'level'),
        mv('光牆', 'Lv.50；減輕特殊攻擊傷害', 'level'),
      ],
      note: '保留早期招式；不需把唯一 TM24 用在已學會十萬伏特的皮卡丘上。',
    },
    ...redBlueLeague.moveSets.filter((set) => set.pokemon !== '雷伊布'),
  ],
  conclusion:
    '水、冰、電、超能力先備齊；冠軍不是固定雷伊布隊。依分支保留地面或電招的 PP，皮卡丘血量不足時先回復再上場。',
};
