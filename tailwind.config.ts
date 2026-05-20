import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          card: "var(--bg-card)",
          elevated: "var(--bg-elevated)",
          hover: "var(--bg-hover)",
          sidebar: "var(--bg-sidebar)",
        },
        accent: "var(--accent)",
        "accent-muted": "var(--accent-muted)",
        border: {
          DEFAULT: "var(--border)",
          subtle: "var(--border-subtle)",
          hover: "var(--border-hover)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        green: { DEFAULT: "#4ade80", muted: "rgba(74, 222, 128, 0.1)" },
        yellow: { DEFAULT: "#facc15", muted: "rgba(250, 204, 21, 0.1)" },
        red: { DEFAULT: "#f87171", muted: "rgba(248, 113, 113, 0.1)" },
        blue: { DEFAULT: "#60a5fa", muted: "rgba(96, 165, 250, 0.1)" },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        heading: ['"Space Grotesk"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
