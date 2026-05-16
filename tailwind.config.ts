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
        primary: "#0A0F1E",
        surface: "#0D1B2A",
        "surface-light": "#162032",
        "accent-cyan": "#00D4FF",
        "accent-green": "#00FF9F",
        "accent-red": "#FF4D6D",
        "accent-gold": "#FFD700",
      },
      fontFamily: {
        sans: ["Inter", "Cairo", "sans-serif"],
        arabic: ["Cairo", "Noto Kufi Arabic", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Crimson Pro", "serif"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "ecg": "ecg 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
