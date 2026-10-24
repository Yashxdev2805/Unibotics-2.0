import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--color-primary, #9312FF)",
          hover: "var(--color-primary-start, #A020FF)",
          contrast: "#FFFFFF",
          light: "#17132A",
        },
        ink: {
          DEFAULT: "var(--color-text, #F7F7F8)",
          muted: "var(--color-text-muted, #8B8988)",
          subtle: "#7468A0",
        },
        surface: {
          DEFAULT: "#000000",
          panel: "#0D0B14",
          raised: "#17132A",
          sunken: "#08060E",
          border: "#2A2342",
        },
        violet: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C9A3FF",
          500: "#A020FF",
          600: "#9312FF",
          700: "#7A1CF8",
          800: "#5B11B8",
          900: "#3B077A",
          950: "#17132A",
          border: "#2A2342",
          input: "#7468A0",
        },
        state: {
          success: "#45B558",
          warning: "#F59E0B",
          danger: "#F03B2A",
          focus: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "Space Grotesk", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Space Grotesk", "monospace"],
      },
      borderRadius: {
        DEFAULT: "8px",
        md: "8px",
        lg: "10px",
        xl: "14px",
        "2xl": "18px",
        full: "9999px",
      },
      maxWidth: {
        container: "1200px",
        "container-wide": "1400px",
        stage: "1672px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(147, 18, 255, 0.35)",
        "glow-lg": "0 0 40px rgba(160, 32, 255, 0.5)",
        "glow-edge": "0 -1px 12px rgba(160, 32, 255, 0.7)",
        card: "0 4px 20px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
