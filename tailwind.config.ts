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
        ink: "#11100f",
        coal: "#181614",
        cream: "#f1e7d3",
        paper: "#f7f0e3",
        terracotta: "#a94736",
        turquoise: "#55bfc0",
        mustard: "#d8a431",
        bottle: "#1f4c3d",
      },
      boxShadow: {
        soft: "0 24px 60px rgba(0,0,0,.18)",
      },
      backgroundImage: {
        grain: "radial-gradient(rgba(255,255,255,.045) 1px, transparent 1px)",
      },
      animation: {
        "slow-pulse": "pulse 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
