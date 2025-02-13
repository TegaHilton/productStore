/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#06143E",
        deepPurple: "#473E66",
        softPink: "#F5D7DB",
        brightPink: "#BD83B8",
        warmOrange: "#F1916D",
      },
    },
  },
  plugins: [],
}
