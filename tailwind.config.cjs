/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        edit: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(2deg)" },
          "20%": { transform: "rotate(-2deg)" },
          "30%": { transform: "rotate(2deg)" },
          "40%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(-2deg)" },
        },
      },
      animation: {
        edit: "edit 2s  infinite",
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("@tailwindcss/forms"),
  ],
};
