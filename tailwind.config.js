/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F2F0EA",
        "paper-2": "#E9E6DD",
        "paper-3": "#DFDBCF",
        ink: "#1C1B18",
        "ink-soft": "#3A382F",
        muted: "#6E6A5F",
        hairline: "#D6D2C6",
        olive: "#34402C",
        "olive-2": "#2A3323",
        "olive-soft": "#4A573D",
        clay: "#A9612F",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      maxWidth: {
        site: "1440px",
      },
      animation: {
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--duration, 40s) linear infinite",
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
