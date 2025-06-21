/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter",'sans-serif'],
        dm: ["DM Serif Text", 'serif'],
        playfair: ["Playfair Display", 'serif'],
      },
      colors: {
        primary: '#000000',
        secondary: '#111111',
      },
    },
  },
  plugins: [],
}

