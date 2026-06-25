import './styles/main.css';
import { initMachineLearnersModal } from './ui/machineLearnersModal.js';
import { initMachinesPage } from './ui/machinesPage.js';
import { initMachinesBackToTop } from './ui/backToTop.js';

initMachineLearnersModal();
initMachinesPage();
initMachinesBackToTop();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    reg.update();
  }).catch(() => {});
}
