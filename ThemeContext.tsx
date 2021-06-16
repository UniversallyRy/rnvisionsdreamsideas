import React from 'react';

export const ThemesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});