(() => {
  const storageKey = "robin-ai-map-theme";
  const root = document.documentElement;
  const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  }

  function preferredTheme() {
    return savedTheme() || (systemPreference.matches ? "dark" : "light");
  }

  function applyTheme(theme, persist = false) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    const themeColor = document.getElementById("themeColor");
    if (themeColor) themeColor.content = theme === "dark" ? "#0b1210" : "#f7f2ea";

    const button = document.getElementById("themeToggle");
    const label = document.getElementById("themeToggleLabel");
    if (button && label) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
      label.textContent = nextTheme === "dark" ? "Dark" : "Light";
    }

    if (persist) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The visual preference still applies when storage is unavailable.
      }
    }

    window.dispatchEvent(new CustomEvent("map-theme-change", { detail: { theme } }));
  }

  applyTheme(preferredTheme());

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(root.dataset.theme || preferredTheme());
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  });

  systemPreference.addEventListener?.("change", () => {
    if (!savedTheme()) applyTheme(preferredTheme());
  });
})();
