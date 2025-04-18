/**
 * color scheme mode
 * @typedef { 'auto' | 'dark' | 'light' } ColorSchemeMode
 */

const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');

function getSavedColorScheme() {
  return localStorage.getItem("color-scheme") || "auto";
}

/**
 * 主题下拉框切换事件，切换主题
 * @param { ColorSchemeMode } mode - 当前主题模式
 * @param { boolean } isInit - 是否是页面初始化
 */
function switchMode(mode, isInit = false) {
  try {
    const scheme = mode === "auto" ? "light dark" : mode;

    if (!document.startViewTransition) {
      setColorScheme();
      return;
    }

    function setColorScheme() {
      colorSchemeMeta.setAttribute("content", scheme);
      localStorage.setItem("color-scheme", mode);
      switchGiscusTheme(mode);
      switchIframeColorScheme(mode);
    }

    isInit
      ? setColorScheme()
      : document.startViewTransition(() => setColorScheme());
  } catch (err) {
    console.error(err);
  }
}

/**
 * 设置主题模式下拉框的值
 * @param { ColorSchemeMode } mode - 当前主题模式
 */
function setModeSelectValue(mode) {
  const modeSelect = document.querySelector("#lightdark");
  modeSelect && (modeSelect.value = mode);
}

function setBodyClass(mode) {
  // Set body class for color scheme
  if (document.body) {
    document.body.classList.remove("light", "dark");
    if (mode === "light" || mode === "dark") {
      document.body.classList.add(mode);
    }
  }
}

/**
 * 切换 Gitcus 的主题
 * @param { ColorSchemeMode } mode - 当前主题模式
 */
function switchGiscusTheme(mode) {
  const theme = {
    auto: "preferred_color_scheme",
    light: "light_high_contrast",
    dark: "dark_high_contrast",
  };

  try {
    // {@link https://github.com/giscus/giscus/issues/336}
    function sendMessage(message) {
      const iframe = document.querySelector("iframe.giscus-frame");
      if (!iframe) return;
      iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
    }

    sendMessage({
      setConfig: {
        theme: theme[mode],
      },
    });
  } catch (err) {
    console.error(err);
  }
}

/**
 * 切换页面所有 iframe 的 color-scheme
 * @param { ColorSchemeMode } mode - 当前主题模式
 */
function switchIframeColorScheme(mode) {
  const iframes = document.querySelectorAll("iframe");

  iframes.forEach((iframe) => {
    if (iframe.classList.contains("giscus-frame")) {
      return;
    }

    const setColorScheme = () => {
      try {
        const iframeDocument = iframe.contentWindow.document;
        if (iframeDocument) {
          iframeDocument.documentElement.style.colorScheme =
            mode === "auto" ? "light dark" : mode;
        }
      } catch (error) {
        console.warn(`Unable to set color-scheme for iframe:`, iframe, error);
      }
    };

    // 如果 iframe 已经加载完成，直接设置 color-scheme
    if (iframe.contentDocument?.readyState === "complete") {
      setColorScheme();
    } else {
      // 等待 iframe 加载完成再设置
      iframe.addEventListener("load", setColorScheme, { once: true });
    }
  });
}

/**
 * 初始化 Giscus 主题
 * @param { ColorSchemeMode } mode - 当前主题模式
 */
function initGiscusTheme(mode) {
  const interval = setInterval(() => {
    // 因为 giscus 是加载 script 后动态渲染，DOMContentLoaded 时可能还没能拿到，增加一定的定时等待
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.addEventListener("load", () => {
      // giscus 的主题也是通过 postMessage 的形式更新的，如果同时 sendMessage，可能这里执行的更早，就会导致设置的主题被覆盖，因此延后 postMessage 的时间
      setTimeout(() => switchGiscusTheme(mode), 200);
    });
    clearInterval(interval);
  }, 1000);
}

/**
 * 初始化主题
 */
function initColorScheme() {
  try {
    const savedMode = getSavedColorScheme();
    setModeSelectValue(savedMode);
    switchMode(savedMode, true);
  } catch (err) {
    console.error(err);
  }
}

// 马上执行，避免页面切换导致的闪烁
initColorScheme();

document.addEventListener("DOMContentLoaded", () => {
  const savedMode = getSavedColorScheme();
  initGiscusTheme(savedMode);
  setModeSelectValue(savedMode);
  setBodyClass(savedMode);
  requestAnimationFrame(() => switchIframeColorScheme(savedMode));
});