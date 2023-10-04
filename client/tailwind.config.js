/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        pro1: '0 2px 8px 0px rgba(0, 0, 0, 0.2)',
        pro2: '0 5px 20px 0px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        gpink: {
          100:"#f38fb1"
        },
        ggrey: {
          100:"#8E8E8E",
          200:"#E1E2E1",
        }
      }
    },
  },
  plugins: [],
};
