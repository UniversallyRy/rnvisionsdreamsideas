import React from 'react';

export const ThemesContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});