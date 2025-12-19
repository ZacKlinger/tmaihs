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
        serif: ["Crimson Pro", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        charcoal: {
          DEFAULT: "hsl(var(--charcoal))",
          foreground: "hsl(var(--charcoal-foreground))",
        },
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
        phoenix: {
          burgundy: "hsl(345 55% 28%)",
          ember: "hsl(18 75% 55%)",
          glow: "hsl(18 85% 65%)",
          cream: "hsl(40 45% 96%)",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "wing-spread": {
          "0%": { transform: "scaleX(0.8) rotate(-5deg)", opacity: "0.5" },
          "50%": { transform: "scaleX(1.05) rotate(0deg)", opacity: "1" },
          "100%": { transform: "scaleX(1) rotate(0deg)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        // Fish swimming animations
        "fish-swim": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(100vw + 200px))" },
        },
        "fish-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-8px)" },
          "75%": { transform: "translateY(8px)" },
        },
        "fish-undulate": {
          "0%, 100%": { transform: "scaleX(1) skewY(0deg)" },
          "25%": { transform: "scaleX(0.97) skewY(1deg)" },
          "50%": { transform: "scaleX(1.02) skewY(0deg)" },
          "75%": { transform: "scaleX(0.97) skewY(-1deg)" },
        },
        "fish-tail": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "33%": { transform: "rotate(2deg)" },
          "66%": { transform: "rotate(-2deg)" },
        },
        // Artscape drifting animations
        "drift-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(30px, -20px) scale(1.02)" },
          "50%": { transform: "translate(-20px, 30px) scale(0.98)" },
          "75%": { transform: "translate(-40px, -10px) scale(1.01)" },
        },
        "drift-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-40px, 20px) scale(1.03)" },
          "66%": { transform: "translate(30px, -30px) scale(0.97)" },
        },
        "drift-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(50px, 40px) scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-slow": "fade-in-slow 1s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "wing-spread": "wing-spread 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        // Fish animations
        "fish-bob": "fish-bob 2s ease-in-out infinite",
        "fish-undulate": "fish-undulate 0.8s ease-in-out infinite",
        "fish-tail": "fish-tail 0.4s ease-in-out infinite",
        // Artscape animations
        "drift-1": "drift-1 25s ease-in-out infinite",
        "drift-2": "drift-2 30s ease-in-out infinite",
        "drift-3": "drift-3 20s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
