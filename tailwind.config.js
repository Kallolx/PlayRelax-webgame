/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        'dark': {
          DEFAULT: '#13141f',
          'nav': '#1a1b26',
          'card': '#1f2937',
          'hover': '#2d3748'
        },
        'brand': {
          'purple': '#8b5cf6',
          'hover': '#7c3aed'
        }
      },
    },
  },
  plugins: [],
};
