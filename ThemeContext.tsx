import { createContext } from 'react';

interface ContextState {
  // set the type of state you want to handle with context e.g.
  theme: string;
  toggleTheme: () => void;
}

export const ThemesContext = createContext<ContextState>({
  theme: 'light',
  toggleTheme: () => { },
});
