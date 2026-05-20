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
        surface: {
          primary: "#0D0F12",
          secondary: "#13151A",
          tertiary: "#181B21",
          sidebar: "#0A0C0F",
        },
        lime: {
          accent: "#C6FF80",
          dim: "rgba(198, 255, 128, 0.08)",
          glow: "rgba(198, 255, 128, 0.15)",
        },
        state: {
          success: "#C6FF80",
          warning: "#FFCC66",
          danger: "#FF8080",
          info: "#80D4FF",
        },
        line: {
          primary: "#1E2028",
          secondary: "#282B33",
          hover: "#32363F",
        },
        content: {
          primary: "#F5F5F5",
          secondary: "#9CA3AF",
          tertiary: "#6B7280",
          inverse: "#0D0F12",
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
