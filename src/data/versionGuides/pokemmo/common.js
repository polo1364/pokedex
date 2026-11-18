// PokeMMO facts are authored independently from the cartridge-version guides.
export const checkedOn = '2026-10-11';
export const sources = {
  story: { title: 'PokeMMO 論壇：五地區完整流程', url: 'https://forums.pokemmo.com/index.php?/topic/76529-storyline-guide-kanto-johto-hoenn-sinnoh-unova-complete-walkthrough-all-items-hidden-items/' },
  encounters: { title: 'PokeMMO 論壇：各地區遭遇索引', url: 'https://forums.pokemmo.com/index.php?/topic/145374-pokemon-encounter-index-for-pokemmo/' },
  travel: { title: '官方支援：跨地區旅行', url: 'https://support.pokemmo.com/knowledgebase/article/traveling-system' },
  gtl: { title: '官方支援：GTL 交易', url: 'https://support.pokemmo.com/knowledgebase/article/the-gtl-system' },
  rematches: { title: '官方支援：訓練家與道館再戰條件', url: 'https://support.pokemmo.com/knowledgebase/article/trainer-and-gym-leader-rematches' },
  pvp: { title: 'PokeMMO 官方論壇：競技公告與分級討論', url: 'https://forums.pokemmo.com/index.php?/forum/23-competition-alley/' },
  red: { title: 'PokeMMO 論壇：赤紅與鳳王終盤前置討論（舊獎勵不採用）', url: 'https://forums.pokemmo.com/index.php?/topic/174060-red-reward/' },
  breeding: { title: 'PokeMMO 論壇：繁殖規則', url: 'https://forums.pokemmo.com/index.php?/topic/49440-the-breeding-guide/' },
  money: { title: 'PokeMMO 論壇：賺錢方法與成本', url: 'https://forums.pokemmo.com/index.php?/topic/106650-in-depth-money-making-guide-multiple-methods-2nd-edition/' },
  ev: { title: 'PokeMMO 論壇：群聚努力值訓練', url: 'https://forums.pokemmo.com/index.php?/topic/77490-simple-ev-training-leveling-guide-using-horde/' },
  roaming: { title: 'PokeMMO 論壇：遊走傳說 FAQ', url: 'https://forums.pokemmo.com/index.php?/topic/160729-roaming-legendaries-faq/' },
};

export function references(...keys) {
  return keys.map(key => ({ ...sources[key], checkedOn, title: `${sources[key].title}（查核 ${checkedOn}）` }));
}

export function chapter(number, title, intro, flows, tips = [], mapPlaces = []) {
  return { type: 'island', number, title, intro, flows, tips, places: [], mapPlaces };
}

export function teammate(name, types, obtain, moveNote) {
  return { name, types, obtain, moveNote };
}

export const partyNote = '尚未核實此場現行完整隊伍、等級及配招；不以原作資料補齊。以下為配隊與操作建議，並非保證勝利的固定腳本。';

export function fight(order, name, location, specialty, summary, tips, pokemon, options = {}) {
  return {
    order, name, location, specialty, role: 'trainer', party: [], partyNote,
    notes: partyNote,
    strategy: {
      level: '依目前訓練家卡顯示的地區等級上限培養，勿使用超限隊員。',
      summary, tips,
    },
    recommendedTeams: [{
      label: '可取得的主力與替代選擇',
      reason: '依御三家與已捕捉隊友選用；不必全部購入。招式先查遊戲內圖鑑及目前招式表，取得前不視為可用。',
      pokemon,
    }],
    checkedOn,
    ...options,
  };
}

export function region(id, title, sections, gyms) {
  return {
    id, title, tabLabel: title, chapterNavigation: true,
    battleSectionTitle: '道館、劇情戰與首次聯盟', battleSequenceMode: 'suggested',
    notes: `資料查核：${checkedOn}。主線與再戰分開；實際等級上限以訓練家卡為準。`,
    prerequisites: [{ title: `${title}出發前`, rows: [
      { label: '進入方式', value: '建立角色時選擇此區；已有角色則依入門頁的四徽章及港口規則跨區。' },
      { label: '隊伍', value: '進入新區先確認等級上限。準備符合上限的隊員；其他地區的高等隊不能直接沿用。' },
      { label: '閱讀方式', value: '章節按首次通關順序排列；戰鬥卡的道館編號與劇情順序不同，依章節決定下一場。' },
      { label: '資料邊界', value: partyNote },
    ] }],
    sections, gyms, sources: references('story', 'encounters', 'travel'),
  };
}
