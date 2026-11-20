/**
 * 攻略頁用的按需載入：只下載正在看的那個版本（含它的擴充內容），載過的會留在記憶體。
 * 內容必須與 index.js 的同步版本一致，由 tests/guide-loader.test.js 逐一比對。
 */
import { assembleGuide, composeScarletViolet, composeLegendsZa } from './guideCore.js';

/** 版本代碼 → 載入該版本資料的函式（每個 import() 會被打包成獨立區塊）。 */
const LOADERS = {
  'pokemmo': async () => {
    const [m0] = await Promise.all([import('./pokemmo/index.js')]);
    return { base: m0.pokemmoGuide, expansions: [] };
  },
  'red-blue': async () => {
    const [m0] = await Promise.all([import('./gen1-red-blue.js')]);
    return { base: m0.redBlueGuide, expansions: [] };
  },
  'yellow': async () => {
    const [m0] = await Promise.all([import('./gen1-yellow.js')]);
    return { base: m0.yellowGuide, expansions: [] };
  },
  'firered-leafgreen': async () => {
    const [m0] = await Promise.all([import('./gen1-firered-leafgreen.js')]);
    return { base: m0.fireredLeafgreenGuide, expansions: [] };
  },
  'gold-silver': async () => {
    const [m0, m1] = await Promise.all([import('./gen2-gold-silver.js'), import('./gen2-kanto.js')]);
    return { base: m0.goldSilverGuide, expansions: [m1.goldSilverKantoExpansion] };
  },
  'crystal': async () => {
    const [m0, m1] = await Promise.all([import('./gen2-crystal.js'), import('./gen2-kanto.js')]);
    return { base: m0.crystalGuide, expansions: [m1.crystalKantoExpansion] };
  },
  'ruby-sapphire': async () => {
    const [m0] = await Promise.all([import('./gen3-ruby-sapphire.js')]);
    return { base: m0.rubySapphireGuide, expansions: [] };
  },
  'emerald': async () => {
    const [m0] = await Promise.all([import('./gen3-emerald.js')]);
    return { base: m0.emeraldGuide, expansions: [] };
  },
  'diamond-pearl': async () => {
    const [m0, m1] = await Promise.all([import('./gen4-diamond-pearl.js'), import('./gen4-diamond-pearl-battle-zone.js')]);
    return { base: m0.diamondPearlGuide, expansions: [m1.diamondPearlBattleZoneExpansion] };
  },
  'platinum': async () => {
    const [m0, m1, m2] = await Promise.all([import('./gen4-platinum.js'), import('./gen4-platinum-distortion-world.js'), import('./gen4-platinum-battle-frontier.js')]);
    return { base: m0.platinumGuide, expansions: [m1.platinumDistortionWorldExpansion, m2.platinumBattleFrontierExpansion] };
  },
  'heartgold-soulsilver': async () => {
    const [m0, m1] = await Promise.all([import('./gen4-heartgold-soulsilver.js'), import('./gen4-heartgold-soulsilver-kanto.js')]);
    return { base: m0.heartgoldSoulsilverGuide, expansions: [m1.heartgoldSoulsilverKantoExpansion] };
  },
  'black-white': async () => {
    const [m0] = await Promise.all([import('./gen5-black-white.js')]);
    return { base: m0.blackWhiteGuide, expansions: [] };
  },
  'black-2-white-2': async () => {
    const [m0] = await Promise.all([import('./gen5-black-2-white-2.js')]);
    return { base: m0.black2White2Guide, expansions: [] };
  },
  'x-y': async () => {
    const [m0] = await Promise.all([import('./gen6-x-y.js')]);
    return { base: m0.xyGuide, expansions: [] };
  },
  'omega-ruby-alpha-sapphire': async () => {
    const [m0, m1] = await Promise.all([import('./gen6-omega-ruby-alpha-sapphire.js'), import('./gen6-omega-ruby-alpha-sapphire-delta-episode.js')]);
    return { base: m0.omegaRubyAlphaSapphireGuide, expansions: [m1.omegaRubyAlphaSapphireDeltaEpisodeExpansion] };
  },
  'sun-moon': async () => {
    const [m0] = await Promise.all([import('./gen7-sun-moon.js')]);
    return { base: m0.sunMoonGuide, expansions: [] };
  },
  'ultra-sun-ultra-moon': async () => {
    const [m0, m1] = await Promise.all([import('./gen7-ultra-sun-ultra-moon.js'), import('./gen7-ultra-sun-ultra-moon-ultra-wormhole.js')]);
    return { base: m0.ultraSunUltraMoonGuide, expansions: [m1.ultraSunUltraMoonUltraWormholeExpansion] };
  },
  'sword-shield': async () => {
    const [m0, m1, m2] = await Promise.all([import('./gen8-sword-shield.js'), import('./gen8-sword-shield-isle-of-armor.js'), import('./gen8-sword-shield-crown-tundra.js')]);
    return { base: m0.swordShieldGuide, expansions: [m1.isleOfArmorExpansion, m2.crownTundraExpansion] };
  },
  'brilliant-diamond-shining-pearl': async () => {
    const [m0, m1] = await Promise.all([import('./gen8-brilliant-diamond-shining-pearl.js'), import('./gen8-brilliant-diamond-shining-pearl-battle-zone.js')]);
    return { base: m0.brilliantDiamondShiningPearlGuide, expansions: [m1.brilliantDiamondShiningPearlBattleZoneExpansion] };
  },
  'scarlet-violet': async () => {
    const [m0, m1, m2, m3] = await Promise.all([import('./gen9-scarlet-violet.js'), import('./gen9-scarlet-violet-story.js'), import('./gen9-scarlet-violet-teal-mask.js'), import('./gen9-scarlet-violet-indigo-disk.js')]);
    return { base: composeScarletViolet(m0.scarletVioletGuide, m1.scarletVioletStory), expansions: [m2.tealMaskExpansion, m3.indigoDiskExpansion] };
  },
  'legends-za': async () => {
    const [m0] = await Promise.all([import('./gen9-legends-za.js')]);
    return { base: composeLegendsZa(m0.legendsZaGuide), expansions: [] };
  },
  'legends-arceus': async () => {
    const [m0] = await Promise.all([import('./gen8-legends-arceus.js')]);
    return { base: m0.legendsArceusGuide, expansions: [] };
  },
};

const cache = new Map();

/** 有攻略資料的版本代碼。 */
export const LOADABLE_GUIDE_IDS = Object.keys(LOADERS);

/**
 * @param {string} versionId
 * @returns {Promise<object|null>} 與 index.js 的 getVersionGuide 相同的攻略物件
 */
export function loadVersionGuide(versionId) {
  if (!cache.has(versionId)) {
    const loader = LOADERS[versionId];
    const promise = loader
      ? loader().then(({ base, expansions }) => assembleGuide(versionId, base, expansions))
      : Promise.resolve(assembleGuide(versionId, null, []));
    // 下載失敗時不留在快取裡，下次可以重試
    cache.set(versionId, promise.catch((error) => {
      cache.delete(versionId);
      throw error;
    }));
  }
  return cache.get(versionId);
}
