import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Grunge/Military inspired fonts
        'military': ['Oswald', 'Impact', 'Arial Black', 'sans-serif'],
        'tactical': ['Rajdhani', 'Orbitron', 'sans-serif'],
        'grunge': ['Bebas Neue', 'Anton', 'sans-serif'],
        'display': ['Bebas Neue', 'cursive'],
        'body': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        // Truth Matters Brand - Grunge Patriotic
        brand: {
          primary: "#0B1220", // Deep Navy
          accent: "#C41E3A", // Patriot Red
          gold: "#DAA520", // Honor Gold
          silver: "#8B8680", // Weathered Silver
          black: "#1A1A1A", // Tactical Black
          white: "#F5F5F5", // Off White
        },
        // Patriotic Core Colors
        patriot: {
          red: "#BF0A30", // Flag Red
          blue: "#002868", // Flag Blue  
          navy: "#0B1426", // Deep Navy
          gray: "#5A5A5A", // Battle Gray
        },
        // First Responder Colors
        responder: {
          fire: "#FF6B35", // Fire Orange
          police: "#1E3A8A", // Police Blue
          ems: "#059669", // EMS Green
          military: "#6B7280", // Military Gray
        },
        // Grunge accents
        grunge: {
          rust: "#B7472A",
          concrete: "#95A5A6",
          steel: "#566573",
          worn: "#7D6608",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1', fontWeight: '900' }],
        'display': ['3rem', { lineHeight: '1.1', fontWeight: '800' }],
        'headline': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'tactical': ['1.125rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.025em' }],
      },
      backgroundImage: {
        'hero-grunge': "linear-gradient(135deg, rgba(11,18,32,0.95) 0%, rgba(26,26,26,0.85) 100%), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><filter id=\"noise\"><feTurbulence baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/><feColorMatrix values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0\"/></filter></defs><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\"/></svg>')",
        'gradient-patriot': 'linear-gradient(135deg, #BF0A30 0%, #002868 100%)',
        'gradient-tactical': 'linear-gradient(135deg, #0B1220 0%, #1A1A1A 100%)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-red': 'var(--gradient-red)',
        'texture-concrete': "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23000000\" fill-opacity=\"0.03\"><circle cx=\"7\" cy=\"7\" r=\"1\"/><circle cx=\"50\" cy=\"20\" r=\"1\"/><circle cx=\"20\" cy=\"50\" r=\"1\"/><circle cx=\"40\" cy=\"40\" r=\"1\"/></g></g></svg>')",
      },
      boxShadow: {
        'tactical': '0 4px 20px rgba(11, 18, 32, 0.5)',
        'patriot': '0 4px 15px rgba(191, 10, 48, 0.3)',
        'grunge': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.5)',
        'card': 'var(--shadow-card)',
        'button': 'var(--shadow-button)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-patriot": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(191, 10, 48, 0.7)" },
          "50%": { boxShadow: "0 0 0 15px rgba(191, 10, 48, 0)" },
        },
        "march": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "pulse-patriot": "pulse-patriot 2s infinite",
        "march": "march 3s linear infinite",
      },
      textShadow: {
        'tactical': '2px 2px 4px rgba(0,0,0,0.8)',
        'grunge': '1px 1px 2px rgba(0,0,0,0.7)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-shadow-tactical': {
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        },
        '.text-shadow-grunge': {
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
        },
        '.bg-texture-concrete': {
          backgroundImage: "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23000000\" fill-opacity=\"0.03\"><circle cx=\"7\" cy=\"7\" r=\"1\"/><circle cx=\"50\" cy=\"20\" r=\"1\"/><circle cx=\"20\" cy=\"50\" r=\"1\"/><circle cx=\"40\" cy=\"40\" r=\"1\"/></g></g></svg>')",
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
