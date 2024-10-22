/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
      text: '#e5f0f3',
      background: '#05090a',
      primary: '#a2c6d3',
      secondary: '#4e3269',
      accent: '#b066b6',
    },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

