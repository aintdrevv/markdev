import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_THEME, THEMES } from './themes.js';

const STORAGE_KEY = 'fallforyou-theme';

const ThemeContext = createContext(null);

function getInitialTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
    return savedTheme;
  }

  return DEFAULT_THEME;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => {
      setTheme((currentTheme) => (
        currentTheme === THEMES.midnight ? THEMES.light : THEMES.midnight
      ));
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
