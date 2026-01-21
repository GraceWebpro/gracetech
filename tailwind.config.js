/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7d52fd",
        primarySoft: "#9d8bff",
        dark: "#151022",
      },
      fontFamily: {
        display: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
};

