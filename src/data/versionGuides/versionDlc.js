/**
 * 各版本擴充內容暫位（僅列有實際 DLC／擴充地區／大型後日談的版本）
 * 書籤文字預設使用 title；尚無道館資料時切換顯示「準備中」
 * @typedef {{ id: string, title: string, tabLabel?: string, placeholderMessage?: string }} VersionDlcEntry
 */

/** @type {Record<string, VersionDlcEntry[]>} */
export const VERSION_DLC_PLACEHOLDERS = {
  'firered-leafgreen': [{ id: 'sevii', title: '七之島' }],

  emerald: [{ id: 'battle-frontier', title: '戰鬥開拓區' }],

  'diamond-pearl': [{ id: 'battle-zone', title: '戰鬥區' }],
  platinum: [
    { id: 'distortion-world', title: '反轉世界' },
    { id: 'battle-frontier', title: '戰鬥開拓區' },
  ],
  'heartgold-soulsilver': [{ id: 'kanto', title: '關都' }],

  'omega-ruby-alpha-sapphire': [{ id: 'delta-episode', title: 'Δ篇章' }],

  'ultra-sun-ultra-moon': [{ id: 'ultra-wormhole', title: '究極空間' }],

  'sword-shield': [
    { id: 'isle-of-armor', title: '鎧之孤島' },
    { id: 'crown-tundra', title: '冠之雪原' },
  ],

  'legends-arceus': [{ id: 'daybreak', title: '洗翠黎明' }],

  'scarlet-violet': [
    { id: 'teal-mask', title: '碧綠掩面' },
    { id: 'indigo-disk', title: '藍之圓盤' },
  ],
};
