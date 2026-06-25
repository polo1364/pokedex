import './styles/main.css';
import { initGuidePage } from './ui/versionGuide.js';
import { initGuideChat } from './ui/guideChat.js';
import { initGuideBackToTop } from './ui/guideBackToTop.js';

initGuidePage();
initGuideChat();
initGuideBackToTop();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    reg.update();
  }).catch(() => {});
}
