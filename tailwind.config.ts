import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B4513",
          50: "#FDF8F3",
          100: "#F9EDE0",
          200: "#F0D4B8",
          300: "#E6BB90",
          400: "#D4A574",
          500: "#C08F58",
          600: "#A67C52",
          700: "#8B4513",
          800: "#6F3610",
          900: "#52280C",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#D2B48C",
          50: "#FAF7F2",
          100: "#F5EFE5",
          200: "#EBDCC7",
          300: "#E1C9A9",
          400: "#D7B68B",
          500: "#D2B48C",
          600: "#C5A373",
          700: "#B8925A",
          800: "#9A7A4A",
          900: "#7C623A",
          foreground: "#1F1F1F",
        },
        accent: {
          DEFAULT: "#DEB887",
          50: "#FBF9F5",
          100: "#F7F3EB",
          200: "#EFE7D3",
          300: "#E7DBBB",
          400: "#DFCFA3",
          500: "#DEB887",
          600: "#D4A96F",
          700: "#CA9A57",
          800: "#A67F47",
          900: "#826437",
          foreground: "#1F1F1F",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "rotate-3d": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        "pulse-3d": {
          "0%, 100%": { transform: "scale3d(1, 1, 1)" },
          "50%": { transform: "scale3d(1.05, 1.05, 1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        shine: {
          "0%": { backgroundPosition: "-200%" },
          "100%": { backgroundPosition: "200%" },
        },
        gradientY: {
          "0%, 100%": { backgroundPosition: "center top" },
          "50%": { backgroundPosition: "center bottom" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "rotate-3d": "rotate-3d 20s linear infinite",
        "pulse-3d": "pulse-3d 2s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "gradient-y": "gradientY 6s ease-in-out infinite",
        shine: "shine 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
