import { createContext, useContext, useState, type ReactNode } from "react";

interface ThemeContextProps {
  isDarkMode: boolean;
  toogleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toogleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode,
    toogleDarkMode,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme must be used within ThemeProvider");

  return context;
}
