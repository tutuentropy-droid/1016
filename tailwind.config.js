/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        canvas: "#F5F1E8",
        ink: "#3E2C20",
        gold: "#B8860B",
        "gold-light": "#D4A017",
        terracotta: "#A0522D",
        "frame-dark": "#5C4033",
        "frame-light": "#8B6F47",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Lora"', 'Georgia', 'serif'],
      },
      boxShadow: {
        painting: "0 20px 60px -15px rgba(62, 44, 32, 0.5), 0 0 0 12px #5C4033, 0 0 0 16px #8B6F47",
      },
    },
  },
  plugins: [],
};
