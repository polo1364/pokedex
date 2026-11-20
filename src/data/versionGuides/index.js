/**
 * 全部版本的攻略（同步取得）。伺服器的 AI 問答、測試與工具腳本使用。
 * 攻略頁請改用 guideLoader.js，只下載正在看的那個版本。
 */
import { assembleGuide, composeScarletViolet, composeLegendsZa } from './guideCore.js';
import { pokemmoGuide } from './pokemmo/index.js';
import { redBlueGuide } from './gen1-red-blue.js';
import { yellowGuide } from './gen1-yellow.js';
import { fireredLeafgreenGuide } from './gen1-firered-leafgreen.js';
import { goldSilverGuide } from './gen2-gold-silver.js';
import { crystalGuide } from './gen2-crystal.js';
import { rubySapphireGuide } from './gen3-ruby-sapphire.js';
import { emeraldGuide } from './gen3-emerald.js';
import { diamondPearlGuide } from './gen4-diamond-pearl.js';
import { platinumGuide } from './gen4-platinum.js';
import { heartgoldSoulsilverGuide } from './gen4-heartgold-soulsilver.js';
import { blackWhiteGuide } from './gen5-black-white.js';
import { black2White2Guide } from './gen5-black-2-white-2.js';
import { xyGuide } from './gen6-x-y.js';
import { omegaRubyAlphaSapphireGuide } from './gen6-omega-ruby-alpha-sapphire.js';
import { sunMoonGuide } from './gen7-sun-moon.js';
import { ultraSunUltraMoonGuide } from './gen7-ultra-sun-ultra-moon.js';
import { swordShieldGuide } from './gen8-sword-shield.js';
import { brilliantDiamondShiningPearlGuide } from './gen8-brilliant-diamond-shining-pearl.js';
import { scarletVioletGuide } from './gen9-scarlet-violet.js';
import { legendsArceusGuide } from './gen8-legends-arceus.js';

import { goldSilverKantoExpansion, crystalKantoExpansion } from './gen2-kanto.js';
import { diamondPearlBattleZoneExpansion } from './gen4-diamond-pearl-battle-zone.js';
import { platinumDistortionWorldExpansion } from './gen4-platinum-distortion-world.js';
import { platinumBattleFrontierExpansion } from './gen4-platinum-battle-frontier.js';
import { heartgoldSoulsilverKantoExpansion } from './gen4-heartgold-soulsilver-kanto.js';
import { omegaRubyAlphaSapphireDeltaEpisodeExpansion } from './gen6-omega-ruby-alpha-sapphire-delta-episode.js';
import { ultraSunUltraMoonUltraWormholeExpansion } from './gen7-ultra-sun-ultra-moon-ultra-wormhole.js';
import { brilliantDiamondShiningPearlBattleZoneExpansion } from './gen8-brilliant-diamond-shining-pearl-battle-zone.js';
import { isleOfArmorExpansion } from './gen8-sword-shield-isle-of-armor.js';
import { crownTundraExpansion } from './gen8-sword-shield-crown-tundra.js';
import { tealMaskExpansion } from './gen9-scarlet-violet-teal-mask.js';
import { indigoDiskExpansion } from './gen9-scarlet-violet-indigo-disk.js';
import { scarletVioletStory } from './gen9-scarlet-violet-story.js';
import { legendsZaGuide } from './gen9-legends-za.js';

const ADDITIONAL_EXPANSIONS = {
  'gold-silver': [goldSilverKantoExpansion],
  crystal: [crystalKantoExpansion],
  'diamond-pearl': [diamondPearlBattleZoneExpansion],
  platinum: [platinumDistortionWorldExpansion, platinumBattleFrontierExpansion],
  'heartgold-soulsilver': [heartgoldSoulsilverKantoExpansion],
  'omega-ruby-alpha-sapphire': [omegaRubyAlphaSapphireDeltaEpisodeExpansion],
  'ultra-sun-ultra-moon': [ultraSunUltraMoonUltraWormholeExpansion],
  'brilliant-diamond-shining-pearl': [brilliantDiamondShiningPearlBattleZoneExpansion],
  'sword-shield': [isleOfArmorExpansion, crownTundraExpansion],
  'scarlet-violet': [tealMaskExpansion, indigoDiskExpansion],
};

/** @type {Record<string, object>} */
const COMPLETE_GUIDES = {
  pokemmo: pokemmoGuide,
  'red-blue': redBlueGuide,
  yellow: yellowGuide,
  'firered-leafgreen': fireredLeafgreenGuide,
  'gold-silver': goldSilverGuide,
  crystal: crystalGuide,
  'ruby-sapphire': rubySapphireGuide,
  emerald: emeraldGuide,
  'diamond-pearl': diamondPearlGuide,
  platinum: platinumGuide,
  'heartgold-soulsilver': heartgoldSoulsilverGuide,
  'black-white': blackWhiteGuide,
  'black-2-white-2': black2White2Guide,
  'x-y': xyGuide,
  'omega-ruby-alpha-sapphire': omegaRubyAlphaSapphireGuide,
  'sun-moon': sunMoonGuide,
  'ultra-sun-ultra-moon': ultraSunUltraMoonGuide,
  'sword-shield': swordShieldGuide,
  'brilliant-diamond-shining-pearl': brilliantDiamondShiningPearlGuide,
  'scarlet-violet': composeScarletViolet(scarletVioletGuide, scarletVioletStory),
  'legends-za': composeLegendsZa(legendsZaGuide),
  'legends-arceus': legendsArceusGuide,
};

export function getVersionGuide(versionId) {
  return assembleGuide(versionId, COMPLETE_GUIDES[versionId] || null, ADDITIONAL_EXPANSIONS[versionId] || []);
}

/** 各版本的資料來源（guideLoader.js 的動態載入表必須與此一致，由測試把關）。 */
export const GUIDE_VERSION_IDS_WITH_DATA = Object.keys(COMPLETE_GUIDES);

export {
  GUIDE_VERSIONS, getAllGuideVersions, isPlaceholder, getVersionMeta, resolveBattle, getLeagueOpponents,
  hasMainGuideContent, hasExpansionContent, getGuidePartTabs, getGuideExpansion,
} from './guideCore.js';
