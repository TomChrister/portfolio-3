import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#080B11",
        surface: "#1A2230",
        surface2: "#25303F",
        border: "#3E4C5D",
        ink: "#E8ECEF",
        muted: "#8B97A3",
        accent: "#5EEAD4",
        accentTint: "rgba(94,234,212,0.12)",
        amber: "#F5B759",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Manrope", "sans-serif"],
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
        pulse2: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        pulse2: "pulse2 2s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
