/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a0a0a',
          gold: '#F0B429',
          'gold-hover': '#D4A017',
          card: '#141414',
          border: '#2a2a2a',
          muted: '#888888',
        },
      },
    },
  },
  plugins: [],
}
