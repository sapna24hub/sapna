/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cozy: {
          50: '#FDFCF7',
          100: '#FAF5EC',
          200: '#F2E8D7',
          300: '#E6D7BD',
          400: '#D5BE9B',
          500: '#BD9E73',
          600: '#9E7A50',
          700: '#7B5A34',
          800: '#5A3D20',
          900: '#3D2512',
          950: '#231307',
        },
        wood: {
          light: '#D7BA89',
          amber: '#B88241',
          medium: '#8C5628',
          deep: '#5B3314',
          darkest: '#2B1607',
        },
        espresso: {
          50: '#F5ECE5',
          100: '#EBDCCE',
          300: '#C29F84',
          500: '#8A5836',
          700: '#522F18',
          900: '#2E170A',
        },
        parchment: '#F5EEDB',
        bookwarm: '#EFE6D5',
        creamaura: '#FFFDF9',
        accentgold: '#C99342',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'warm': '0 10px 25px -5px rgba(90, 61, 32, 0.1), 0 8px 10px -6px rgba(90, 61, 32, 0.08)',
        'warm-lg': '0 20px 30px -10px rgba(90, 61, 32, 0.16), 0 10px 15px -5px rgba(90, 61, 32, 0.1)',
        'wood': '0 4px 20px rgba(43, 22, 7, 0.15)',
        'glow': '0 0 25px rgba(186, 130, 65, 0.25)',
      },
      backgroundImage: {
        'paper-grain': "radial-gradient(#d6c2a8 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
