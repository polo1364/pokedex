import './styles/main.css';
import { initMoveCatalogPage } from './ui/moveCatalogPage.js';

initMoveCatalogPage();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    reg.update();
  }).catch(() => {});
}
