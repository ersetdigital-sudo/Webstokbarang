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
        "bg-main": "#0D0F12",
        "bg-card": "#13151A",
        "bg-sidebar": "#0A0C0F",
        "accent-lime": "#C6FF80",
        "accent-lime-dim": "rgba(198, 255, 128, 0.1)",
        "status-active": "#C6FF80",
        "status-low": "#FFCC66",
        "status-out": "#FF8080",
        "border-main": "#1E2028",
        "border-hover": "#2A2D36",
        "txt-primary": "#F0F0F0",
        "txt-secondary": "#8A8F9A",
        "txt-muted": "#5A5F6A",
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
