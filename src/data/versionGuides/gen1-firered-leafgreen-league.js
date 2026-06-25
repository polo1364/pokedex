import { redBlueLeague } from './gen1-red-blue-league.js';

/** 火紅／葉綠聯盟攻略（與紅藍結構相同，等級略低） */
export const frlgLeague = {
  ...redBlueLeague,
  intro:
    redBlueLeague.intro
    + ' 火紅／葉綠四天王等級略低於紅／藍，建議隊伍 55 級以上再挑戰。',
};
