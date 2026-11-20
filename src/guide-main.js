import './styles/main.css';
import './styles/guide-light.css';
import { initGuidePage } from './ui/versionGuide.js';
import { initGuideChat } from './ui/guideChat.js';
import { initGuideBackToTop } from './ui/guideBackToTop.js';
import { initGuideTheme } from './ui/guideTheme.js';

initGuideTheme();
initGuidePage();
initGuideChat();
initGuideBackToTop();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    reg.update();
  }).catch(() => {});
}
