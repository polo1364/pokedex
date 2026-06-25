/** @typedef {'complete'|'placeholder'} GuideStatus */

/**
 * @typedef {object} GuideVersionMeta
 * @property {string} id
 * @property {string} title
 * @property {number} displayGeneration
 * @property {GuideStatus} status
 */

/** @type {GuideVersionMeta[]} */
export const GUIDE_VERSIONS = [
  { id: 'red-blue', title: '寶可夢 紅／藍', displayGeneration: 1, status: 'complete' },
  { id: 'yellow', title: '寶可夢 黃', displayGeneration: 1, status: 'complete' },
  { id: 'firered-leafgreen', title: '寶可夢 火紅／葉綠', displayGeneration: 1, status: 'complete' },

  { id: 'gold-silver', title: '寶可夢 金／銀', displayGeneration: 2, status: 'complete' },
  { id: 'crystal', title: '寶可夢 水晶', displayGeneration: 2, status: 'complete' },

  { id: 'ruby-sapphire', title: '寶可夢 紅寶石／藍寶石', displayGeneration: 3, status: 'complete' },
  { id: 'emerald', title: '寶可夢 綠寶石', displayGeneration: 3, status: 'complete' },

  { id: 'diamond-pearl', title: '寶可夢 鑽石／珍珠', displayGeneration: 4, status: 'complete' },
  { id: 'platinum', title: '寶可夢 白金', displayGeneration: 4, status: 'complete' },
  { id: 'heartgold-soulsilver', title: '寶可夢 心金／魂銀', displayGeneration: 4, status: 'complete' },

  { id: 'black-white', title: '寶可夢 黑／白', displayGeneration: 5, status: 'complete' },
  { id: 'black-2-white-2', title: '寶可夢 黑2／白2', displayGeneration: 5, status: 'complete' },

  { id: 'x-y', title: '寶可夢 X／Y', displayGeneration: 6, status: 'complete' },
  { id: 'omega-ruby-alpha-sapphire', title: '寶可夢 終極紅寶石／始源藍寶石', displayGeneration: 6, status: 'complete' },

  { id: 'sun-moon', title: '寶可夢 太陽／月亮', displayGeneration: 7, status: 'complete' },
  { id: 'ultra-sun-ultra-moon', title: '寶可夢 究極之日／究極之月', displayGeneration: 7, status: 'complete' },

  { id: 'sword-shield', title: '寶可夢 劍／盾', displayGeneration: 8, status: 'complete' },
  { id: 'brilliant-diamond-shining-pearl', title: '寶可夢 晶燦鑽石／明亮珍珠', displayGeneration: 8, status: 'complete' },
  { id: 'legends-arceus', title: '寶可夢傳說 阿爾宙斯', displayGeneration: 8, status: 'complete' },

  { id: 'scarlet-violet', title: '寶可夢 朱／紫', displayGeneration: 9, status: 'complete' },
  { id: 'legends-za', title: '寶可夢傳說 Z-A', displayGeneration: 9, status: 'placeholder' },
];
