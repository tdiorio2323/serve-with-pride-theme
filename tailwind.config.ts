import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";

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
        'display': ['Bebas Neue', 'cursive'],
        'body': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      colors: {
        border: "#e5e7eb",
        input: "#f3f4f6",
        ring: "#2563eb",
        background: "#fff",
        foreground: "#222",
        primary: {
          DEFAULT: "#c1121f",
          foreground: "#fff",
        },
        secondary: {
          DEFAULT: "#22223b",
          foreground: "#fff",
        },
        destructive: {
          DEFAULT: "#b91c1c",
          foreground: "#fff",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#e5e7eb",
          foreground: "#222",
        },
        popover: {
          DEFAULT: "#fff",
          foreground: "#222",
        },
        card: {
          DEFAULT: "#fff",
          foreground: "#222",
        },
        brand: {
          red: "#c1121f",
          dark: "#22223b",
          navy: "#000000",
          gray: "#6b7280",
        },
        sidebar: {
          DEFAULT: "#22223b",
          foreground: "#fff",
          primary: "#c1121f",
          "primary-foreground": "#fff",
          accent: "#003049",
          "accent-foreground": "#fff",
          border: "#e5e7eb",
          ring: "#2563eb",
        },
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-red': 'var(--gradient-red)',
      },
      boxShadow: {
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
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
} satisfies Config;
