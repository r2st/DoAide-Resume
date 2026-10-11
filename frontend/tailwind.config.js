/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F172A',
          primary: '#0D9488',
          'primary-hover': '#0F766E',
          card: '#F8FFFE',
          border: '#E2E8F0',
          muted: '#64748B',
        },
      },
    },
  },
  plugins: [],
}
