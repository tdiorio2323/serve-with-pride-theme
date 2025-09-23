"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "dark" | "light"; // The resolved theme (system resolves to actual)
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  actualTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "truth-matters-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<"dark" | "light">("light");

  // Load theme from localStorage after mount
  useEffect(() => {
    const storedTheme = localStorage?.getItem(storageKey) as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    let resolvedTheme: "dark" | "light" = "light";

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      resolvedTheme = systemTheme;
    } else {
      resolvedTheme = theme;
    }

    root.classList.add(resolvedTheme);
    setActualTheme(resolvedTheme);

    // Set custom CSS properties for patriotic theme variations
    if (resolvedTheme === "dark") {
      root.style.setProperty("--hero-bg", "var(--gradient-tactical)");
      root.style.setProperty("--card-texture", "rgba(26, 26, 26, 0.95)");
    } else {
      root.style.setProperty("--hero-bg", "var(--gradient-hero)");
      root.style.setProperty("--card-texture", "rgba(255, 255, 255, 0.95)");
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage?.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    actualTheme,
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

// Patriotic theme utilities
export const usePatrioticTheme = () => {
  const { actualTheme } = useTheme();
  
  return {
    // Patriotic color variants based on theme
    colors: {
      heroBackground: actualTheme === "dark" 
        ? "linear-gradient(135deg, rgba(11,18,32,0.95) 0%, rgba(26,26,26,0.9) 100%)"
        : "var(--gradient-hero)",
      cardBackground: actualTheme === "dark"
        ? "rgba(26, 26, 26, 0.95)"
        : "rgba(255, 255, 255, 0.95)",
      textPrimary: actualTheme === "dark" 
        ? "hsl(var(--brand-white))" 
        : "hsl(var(--brand-primary))",
      textSecondary: actualTheme === "dark"
        ? "hsl(var(--grunge-concrete))"
        : "hsl(var(--patriot-gray))",
      accent: "hsl(var(--brand-accent))",
      gold: "hsl(var(--brand-gold))",
    },
    
    // Theme-aware CSS classes
    classes: {
      heroSection: actualTheme === "dark"
        ? "bg-gradient-to-br from-brand-primary via-brand-black to-brand-primary"
        : "hero-grunge",
      cardBase: actualTheme === "dark"
        ? "bg-card border-border/20 text-card-foreground"
        : "product-card-grunge",
      buttonPrimary: actualTheme === "dark"
        ? "btn-tactical"
        : "btn-patriot",
      textAccent: "text-brand-accent font-military",
      textGold: "text-brand-gold font-tactical",
    },
    
    // Theme state
    isDark: actualTheme === "dark",
    isLight: actualTheme === "light",
  };
};

// Hook for theme-aware animations
export const usePatrioticAnimations = () => {
  const { actualTheme } = useTheme();
  
  return {
    // Pulse animations for urgency badges
    urgentPulse: actualTheme === "dark" 
      ? "animate-pulse" 
      : "animate-pulse-patriot",
    
    // Marching text for promo bar
    march: "animate-march",
    
    // Fade in animations
    fadeIn: "animate-fade-in-up",
    
    // Theme-specific hover effects
    cardHover: actualTheme === "dark"
      ? "hover:bg-card/80 hover:border-brand-accent/50"
      : "hover:shadow-tactical hover:scale-[1.02]",
  };
};