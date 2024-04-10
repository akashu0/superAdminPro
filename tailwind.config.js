// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 2px 2px 2px rgba(0, 0, 0, 0.3)",
      }
    },
    fontFamily: {
      santoshi: ["Santoshi", "sans-serif"],
    },
  },
  plugins: [],
};
