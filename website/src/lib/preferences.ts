import { useCallback, useSyncExternalStore } from "react";

// Small localStorage-backed stores. Every access is guarded: storage can be unavailable
// (private windows, blocked site data), and the site must still work without it.

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: keep the in-memory value only */
  }
}

function createStore<T>(key: string, fallback: T) {
  let value = readJson(key, fallback);
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set(next: T) {
      value = next;
      writeJson(key, next);
      listeners.forEach((l) => l());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// ---------- reading progress ----------
const progressStore = createStore<number[]>("ti-completed-chapters", []);

export function useProgress() {
  const completed = useSyncExternalStore(progressStore.subscribe, progressStore.get);
  const isComplete = useCallback((num: number) => completed.includes(num), [completed]);
  const toggle = useCallback((num: number) => {
    const current = progressStore.get();
    progressStore.set(current.includes(num) ? current.filter((n) => n !== num) : [...current, num].sort((a, b) => a - b));
  }, []);
  return { completed, isComplete, toggle };
}

const lastVisitedStore = createStore<number | null>("ti-last-chapter", null);
export const rememberChapter = (num: number) => lastVisitedStore.set(num);
export const useLastChapter = () => useSyncExternalStore(lastVisitedStore.subscribe, lastVisitedStore.get);

// ---------- theme ----------
// index.html applies the saved theme before first paint (key "ti-theme"); this store
// mirrors <html data-theme> so components can react to changes.
type Theme = "light" | "dark";
const themeListeners = new Set<() => void>();
const currentTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const subscribeTheme = (listener: () => void) => {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
};

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme);
  const toggleTheme = useCallback(() => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ti-theme", next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    themeListeners.forEach((l) => l());
  }, []);
  return { theme, toggleTheme };
}
