/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: {
          50:  '#f0f7f0',
          100: '#d4ead9',
          200: '#a8d5b5',
          300: '#7cbd93',
          400: '#6db88a',
          500: '#4fa372',
          600: '#3d7a5a',
          700: '#2d5c43',
          800: '#1e3d2d',
          900: '#0f1f17',
        },
        text: {
          primary: '#2d4a3e',
          muted:   '#7a9e8e',
        },
        aws:        '#ff9900',
        cloudflare: '#f48120',
      },
      fontFamily: {
        sans:  ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl:  '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        card:  '0 4px 20px rgba(61, 122, 90, 0.08)',
        hover: '0 8px 30px rgba(61, 122, 90, 0.15)',
      },
    },
  },
  plugins: [],
}