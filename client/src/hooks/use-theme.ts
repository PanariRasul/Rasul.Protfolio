import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "theme";
const EVENT = "theme-change";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

/** Theme hook — every component using it stays in sync (same tab and across tabs). */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const onChange = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "dark" || e.newValue === "light")) apply(e.newValue);
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return { theme, setTheme: apply };
}

function apply(value: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(value);
  try { localStorage.setItem(STORAGE_KEY, value); } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}
