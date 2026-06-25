import './styles/main.css';
import { initItemsPage } from './ui/itemsPage.js';
import { initItemsBackToTop } from './ui/backToTop.js';

initItemsPage();
initItemsBackToTop();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    reg.update();
  }).catch(() => {});
}
