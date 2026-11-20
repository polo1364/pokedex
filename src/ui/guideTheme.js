/**
 * 攻略頁的淺色閱讀模式：切換 <html> 上的 guide-light 類別並記住選擇。
 * 實際的配色在 main.css（html.guide-light）；guide.html 開頭的小段指令會在畫面出現前先套用，避免閃一下深色。
 */
export const GUIDE_THEME_KEY = 'pokedex_guide_theme';
const LIGHT_CLASS = 'guide-light';

function readTheme() {
  try {
    return localStorage.getItem(GUIDE_THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function applyTheme(theme, button) {
  const light = theme === 'light';
  document.documentElement.classList.toggle(LIGHT_CLASS, light);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f0f0dc' : '#0f0f23');
  if (button) {
    button.setAttribute('aria-pressed', String(light));
    button.textContent = light ? '🌙 深色' : '☀ 淺色閱讀';
    button.title = light ? '切回深色' : '改用淺色底，長時間閱讀比較不吃力';
  }
}

export function initGuideTheme() {
  const button = document.getElementById('guideThemeToggle');
  applyTheme(readTheme(), button);
  button?.addEventListener('click', () => {
    const next = document.documentElement.classList.contains(LIGHT_CLASS) ? 'dark' : 'light';
    try {
      localStorage.setItem(GUIDE_THEME_KEY, next);
    } catch {
      // 無法儲存（例如隱私模式）時，這次瀏覽仍然可以切換
    }
    applyTheme(next, button);
  });
}
