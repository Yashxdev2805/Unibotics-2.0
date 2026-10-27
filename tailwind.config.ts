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
          DEFAULT: "var(--color-primary, #F97316)",
          hover: "#FB923C",
          contrast: "#0F1115",
          light: "#212530",
        },
        ink: {
          DEFAULT: "var(--color-text, #F8FAFC)",
          muted: "var(--color-text-muted, #94A3B8)",
          subtle: "#64748B",
        },
        surface: {
          DEFAULT: "#0F1115",
          panel: "#161920",
          raised: "#212530",
          sunken: "#0A0C0E",
          border: "#2F3545",
        },
        cyan: {
          50:  "#F0FDFE",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          950: "#082F49",
        },
        orange: {
          50:  "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        slate: {
          850: "#212530",
          900: "#161920",
          950: "#0F1115",
        },
        state: {
          success: "#10B981",
          warning: "#F59E0B",
          danger:  "#EF4444",
          focus:   "#F97316",
        },
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "Space Grotesk", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        DEFAULT: "8px",
        md:  "8px",
        lg:  "12px",
        xl:  "16px",
        "2xl": "20px",
        full: "9999px",
      },
      boxShadow: {
        glow: "0 0 24px rgba(249, 115, 22, 0.4), 0 0 8px rgba(234, 88, 12, 0.2)",
        "glow-lg": "0 0 40px rgba(249, 115, 22, 0.5), 0 0 16px rgba(234, 88, 12, 0.3)",
        "glow-orange": "0 0 24px rgba(249, 115, 22, 0.45)",
      },
      maxWidth: {
        stage: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
