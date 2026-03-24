import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { DEFAULT_THEME, THEMES } from './themes.js';

const STORAGE_KEY = 'mark-dev-portfolio-theme';
const LEGACY_STORAGE_KEYS = ['fallforyou-theme'];

const ThemeContext = createContext(null);

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function runThemeTransition(updateTheme) {
  if (
    typeof document === 'undefined' ||
    typeof document.startViewTransition !== 'function' ||
    prefersReducedMotion()
  ) {
    updateTheme();
    return;
  }

  document.startViewTransition(() => {
    flushSync(() => {
      updateTheme();
    });
  });
}

function getSystemTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? THEMES.light
    : THEMES.midnight;
}

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return { theme: DEFAULT_THEME, hasManualPreference: false };
  }

  const savedTheme =
    window.localStorage.getItem(STORAGE_KEY) ??
    LEGACY_STORAGE_KEYS
      .map((key) => window.localStorage.getItem(key))
      .find(Boolean);
  if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
    window.localStorage.setItem(STORAGE_KEY, savedTheme);
    return { theme: savedTheme, hasManualPreference: true };
  }

  return { theme: getSystemTheme(), hasManualPreference: false };
}

export function ThemeProvider({ children }) {
  const [{ theme, hasManualPreference }, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined' || hasManualPreference) return undefined;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const syncSystemTheme = (event) => {
      setThemeState((current) => (
        current.hasManualPreference
          ? current
          : {
              theme: event.matches ? THEMES.light : THEMES.midnight,
              hasManualPreference: false,
            }
      ));
    };

    mediaQuery.addEventListener('change', syncSystemTheme);
    return () => mediaQuery.removeEventListener('change', syncSystemTheme);
  }, [hasManualPreference]);

  const value = useMemo(() => ({
    theme,
    setTheme: (nextTheme) => {
      if (!Object.values(THEMES).includes(nextTheme)) return;
      runThemeTransition(() => {
        setThemeState({ theme: nextTheme, hasManualPreference: true });
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      });
    },
    toggleTheme: () => {
      runThemeTransition(() => {
        setThemeState((currentTheme) => {
          const nextTheme =
            currentTheme.theme === THEMES.midnight ? THEMES.light : THEMES.midnight;
          window.localStorage.setItem(STORAGE_KEY, nextTheme);
          return { theme: nextTheme, hasManualPreference: true };
        });
      });
    },
    isLightTheme: theme === THEMES.light,
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
