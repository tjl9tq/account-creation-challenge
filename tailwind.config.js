/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/frontend/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wealthfront: '#463fa6',
      },
      boxShadow: {
        card: '0 2px 6px #0000001a',
      },
    },
  },
  plugins: [],
};
