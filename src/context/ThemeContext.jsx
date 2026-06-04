import { createContext, useCallback, useMemo, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  isDarkMode: false,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Context lets nested components read and update the current app theme.
  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const isDarkMode = theme === 'dark';

  // The provider shares theme values without passing props through every screen.
  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDarkMode,
    }),
    [isDarkMode, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
