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
        bg: {
          primary: "#09090b",
          card: "#111113",
          elevated: "#18181b",
          hover: "#1c1c1f",
          sidebar: "#0c0c0e",
        },
        accent: "#a3e635",
        "accent-muted": "rgba(163, 230, 53, 0.08)",
        "accent-subtle": "rgba(163, 230, 53, 0.15)",
        border: {
          DEFAULT: "#27272a",
          subtle: "#1f1f23",
          hover: "#3f3f46",
        },
        text: {
          primary: "#fafafa",
          secondary: "#a1a1aa",
          muted: "#71717a",
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
