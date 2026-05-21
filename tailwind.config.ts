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
        neo: {
          bg: "#0e0e11",
          card: "#18181b",
          border: "#27272a",
          "border-hover": "#3f3f46",
          primary: "#1856FF",
          secondary: "#3A344E",
          success: "#07CA6B",
          warning: "#E89558",
          danger: "#EA2143",
          text: "#f4f4f5",
          muted: "#71717a",
          subtle: "#a1a1aa",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "-apple-system", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        neo: "16px",
        "neo-sm": "12px",
        "neo-xs": "8px",
      },
      boxShadow: {
        neo: "4px 4px 0px 0px #27272a",
        "neo-sm": "3px 3px 0px 0px #27272a",
        "neo-hover": "1px 1px 0px 0px #27272a",
        "neo-primary": "4px 4px 0px 0px rgba(24,86,255,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
