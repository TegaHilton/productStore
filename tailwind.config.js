/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#06143E",
        deepPurple: "#473E66",
        softPink: "#F5D7DB",
        brightPink: "#BD83B8",
        warmOrange: "#F1916D",
      },
      spacing: {
        128: "32rem", // You can add custom values here
        144: "36rem", // For example, gap-128 and gap-144
        160: "40rem",
        150: "50rem", // And so on
      },
    },
  },
  plugins: [],
};
