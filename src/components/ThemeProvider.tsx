
import { createContext, useContext, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "calligraphy-theme",
  ...props
}: ThemeProviderProps) {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    // Set default theme based on device
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (!storedTheme) {
      if (isMobile) {
        setTheme("dark");
      } else {
        setTheme(defaultTheme);
      }
    }
  }, [isMobile, defaultTheme, storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      
      // Add GSAP transition for theme change
      const elements = document.querySelectorAll("body, section, div, h1, h2, h3, p, button, a");
      
      gsap.to(elements, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setTheme(theme);
          gsap.to(elements, {
            opacity: 1,
            duration: 0.3,
            stagger: 0.01,
          });
        }
      });
    },
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
