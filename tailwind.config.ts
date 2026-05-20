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
        background: {
          main: "#0D0F12",
          card: "#13151A",
          sidebar: "#0A0C0F",
        },
        accent: {
          lime: "#C6FF80",
          "lime-dim": "#C6FF8033",
        },
        status: {
          active: "#C6FF80",
          low: "#FFCC66",
          out: "#FF8080",
        },
        border: {
          DEFAULT: "#1E2028",
          hover: "#2A2D36",
        },
        text: {
          primary: "#F0F0F0",
          secondary: "#8A8F9A",
          muted: "#5A5F6A",
        },
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};

export default config;
