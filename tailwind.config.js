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
        "canvas-dark": "#EDE6D3",
        ink: "#3E2C20",
        "ink-light": "#5C4A3C",
        gold: "#B8860B",
        "gold-light": "#D4A017",
        "gold-soft": "#E6C76A",
        terracotta: "#A0522D",
        "frame-dark": "#5C4033",
        "frame-light": "#8B6F47",
        "frame-mid": "#6F543A",
        parchment: "#F8F1DC",
        "parchment-dark": "#EFE2BE",
        archive: "#D9CEB2",
        "success-deep": "#2F5233",
        "error-deep": "#7A2E1F",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Lora"', 'Georgia', 'serif'],
      },
      boxShadow: {
        painting: "0 20px 60px -15px rgba(62, 44, 32, 0.5), 0 0 0 12px #5C4033, 0 0 0 16px #8B6F47",
        "painting-correct": "0 0 0 4px #D4A017, 0 20px 60px -15px rgba(212, 160, 23, 0.6), 0 0 0 12px #5C4033, 0 0 0 16px #8B6F47",
        "painting-wrong": "0 0 0 4px #A0522D, 0 20px 60px -15px rgba(160, 82, 45, 0.5), 0 0 0 12px #5C4033, 0 0 0 16px #8B6F47",
        "archive-card": "0 2px 0 rgba(62, 44, 32, 0.05), 0 10px 20px -8px rgba(62, 44, 32, 0.15)",
        "stamp": "inset 0 0 0 2px rgba(160, 82, 45, 0.4)",
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(ellipse at 15% 20%, rgba(184, 134, 11, 0.08) 0%, transparent 45%), radial-gradient(ellipse at 85% 75%, rgba(160, 82, 45, 0.06) 0%, transparent 50%), repeating-linear-gradient(0deg, rgba(62, 44, 32, 0.012) 0px, rgba(62, 44, 32, 0.012) 1px, transparent 1px, transparent 3px)",
        "file-card":
          "linear-gradient(135deg, #F8F1DC 0%, #EFE2BE 100%)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        curtainReveal: {
          "0%": { opacity: "0", filter: "blur(6px)", transform: "scale(0.98)" },
          "60%": { filter: "blur(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fileFlip: {
          "0%": { opacity: "0", transform: "rotateX(-90deg) translateY(-10px)", transformOrigin: "top" },
          "100%": { opacity: "1", transform: "rotateX(0) translateY(0)", transformOrigin: "top" },
        },
        typewriter: {
          "0%": { opacity: "0", letterSpacing: "0.3em" },
          "100%": { opacity: "1", letterSpacing: "normal" },
        },
        stampHit: {
          "0%": { opacity: "0", transform: "scale(2) rotate(-12deg)" },
          "60%": { opacity: "1", transform: "scale(0.9) rotate(0deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-2deg)" },
        },
        scorePop: {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.8)" },
          "50%": { opacity: "1", transform: "translateY(-8px) scale(1.15)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 160, 23, 0.6)" },
          "50%": { boxShadow: "0 0 0 12px rgba(212, 160, 23, 0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        badgeFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        fadeInScale: "fadeInScale 0.4s ease-out both",
        curtainReveal: "curtainReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        fileFlip: "fileFlip 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        typewriter: "typewriter 0.4s ease-out both",
        stampHit: "stampHit 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        scorePop: "scorePop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        glowPulse: "glowPulse 2s ease-in-out infinite",
        shake: "shake 0.4s ease-in-out",
        zoomIn: "zoomIn 0.3s ease-out both",
        badgeFloat: "badgeFloat 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
