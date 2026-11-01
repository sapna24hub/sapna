/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parlour: {
          50: '#fdf2f4',
          100: '#fbe8ec',
          200: '#f7d3da',
          300: '#f1b0bc',
          400: '#e78296',
          500: '#d95372',
          600: '#c23456',
          700: '#a32442',
          800: '#87213a',
          900: '#731f35',
          950: '#400c19',
        },
        gold: {
          50: '#fbf8eb',
          100: '#f6efcc',
          200: '#eedf9a',
          300: '#e5c961',
          400: '#dfb437',
          500: '#cf9b22',
          600: '#b27a19',
          700: '#8e5917',
          800: '#764819',
          900: '#643c19',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
