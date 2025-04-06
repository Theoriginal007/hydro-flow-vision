
import { createContext, useContext, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: "light"; // Make this prop optional with default value
  storageKey?: string;    // Make this prop optional
};

type ThemeProviderState = {
  theme: "light";
};

const initialState: ThemeProviderState = {
  theme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light", // Default value if not provided
  storageKey = "theme",   // Default value if not provided
  ...props
}: ThemeProviderProps) {
  // Always light theme - the defaultTheme and storageKey props
  // are now accepted but not used in the current implementation
  const [theme] = useState<"light">("light");

  const value = {
    theme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
