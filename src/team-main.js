import './styles/main.css';
import { initTeamPage } from './ui/teamPage.js';

initTeamPage();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    reg.update();
  }).catch(() => {});
}
