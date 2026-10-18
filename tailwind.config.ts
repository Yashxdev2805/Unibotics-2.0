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
          DEFAULT: "var(--brand, #1D4ED8)",
          hover: "var(--brand-hover, #1E40AF)",
          contrast: "var(--brand-contrast, #FFFFFF)",
          light: "#EFF6FF",
        },
        ink: {
          DEFAULT: "var(--ink, #090D16)",
          muted: "var(--ink-muted, #475569)",
          subtle: "#64748B",
        },
        surface: {
          DEFAULT: "var(--surface, #F8FAFC)",
          raised: "var(--surface-raised, #FFFFFF)",
          sunken: "#F1F5F9",
          border: "var(--line, #E2E8F0)",
        },
        state: {
          success: "#16A34A",
          warning: "#D97706",
          danger: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Space Grotesk", "monospace"],
      },
      borderRadius: {
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      maxWidth: {
        container: "1200px",
        "container-wide": "1400px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        card: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        raised: "0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
