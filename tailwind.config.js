/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#6b1023",
          dark: "#3f0a17",
          light: "#8a1a32",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#f3d78a",
          dark: "#a9832a",
        },
        cream: "#fff8ec",
        ink: "#2b1810",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      backgroundImage: {
        "radial-maroon": "radial-gradient(circle at 50% 30%, #8a1a32 0%, #3f0a17 70%)",
        "gold-gradient": "linear-gradient(135deg, #f3d78a 0%, #d4af37 45%, #a9832a 100%)",
      },
      boxShadow: {
        gold: "0 8px 30px rgba(212, 175, 55, 0.35)",
        card: "0 10px 40px rgba(63, 10, 23, 0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(4deg)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        spinSlowReverse: {
          to: { transform: "rotate(-360deg)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        petalFall: {
          "0%": { transform: "translateY(-10vh) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translateY(110vh) translateX(40px) rotate(360deg)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ghungrooSway: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-6px) scale(1.08)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.55)" },
          "70%": { boxShadow: "0 0 0 14px rgba(212,175,55,0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spinSlow 40s linear infinite",
        "spin-slow-reverse": "spinSlowReverse 55s linear infinite",
        "bounce-soft": "bounceSoft 1.6s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        marquee: "marquee 22s linear infinite",
        "pulse-glow": "pulseGlow 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
