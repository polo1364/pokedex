import { metaPrerequisites, metaSectionsBefore, metaSectionsAfter } from './meta.js';
import { section1to30 } from './main-1-30.js';
import { section31to60 } from './main-31-60.js';
import { section61to88 } from './main-61-88.js';
import { section89to94 } from './postgame-89-94.js';
import { section95to107 } from './daybreak-95-107.js';
import { section108to122 } from './path-108-122.js';

function interleaveSection(section) {
  return [section.island, ...section.requests];
}

const requestSections = [
  section1to30,
  section31to60,
  section61to88,
  section89to94,
  section95to107,
  section108to122,
].flatMap(interleaveSection);

export const requestsExpansion = {
  id: 'requests',
  title: '所有委託攻略',
  tabLabel: '所有委託攻略',
  usePrepLegend: true,
  legendHint: '移至標示詞可查看說明',
  notes:
    '以下以委託編號為主整理。中文名稱不同版本或攻略站可能略有差異，遊戲內用編號＋委託目標對照最準。範圍：本體一般委託 1～88、破關後／傳說 89～94、洗翠黎明 95～122。',
  prerequisites: metaPrerequisites,
  sections: [
    ...metaSectionsBefore,
    ...requestSections,
    ...metaSectionsAfter,
  ],
};
