/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 /* mode: 'jit',
 purge: [], */
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        ...colors,
        primaryDarkBg: "black",
        secondaryDarkBg: "#4d4d4d",
        thirdDarkBg: "#666666",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark","forest", "black", "luxury", "business", "coffee"],
  },
}
