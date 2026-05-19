/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ableton: {
          bg: '#141311',
          'bg-light': '#211f1b',
          surface: '#27231d',
          'surface-light': '#373025',
          border: '#4b4131',
          'border-light': '#68573d',
          text: '#f2eadb',
          'text-dim': '#b7aa93',
          'text-muted': '#766c5c',
          'text-secondary': '#b7aa93',
          accent: '#d8903f',
          'accent-hover': '#efaa5c',
          'accent-dim': '#a76b2e',
          orange: '#d8903f',
          green: '#5c9b76',
          'green-dim': '#447a5c',
          yellow: '#cfb35d',
          red: '#b96254',
          'key-white': '#eadfc9',
          'key-white-hover': '#f3ead9',
          'key-black': '#1b1917',
          'key-black-hover': '#2b2722',
        },
      },
      fontFamily: {
        mono: ['SF Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        sans: [
          'Avenir Next',
          'Geist',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'key-active': '0 8px 24px rgba(216, 144, 63, 0.32), inset 0 1px 0 rgba(255,255,255,0.22)',
        'knob': '0 8px 18px rgba(11, 10, 8, 0.42), inset 0 1px 0 rgba(255,255,255,0.1)',
        'module': '0 18px 42px rgba(10, 9, 7, 0.28)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 118, 77, 0.3)' },
          '50%': { boxShadow: '0 0 15px rgba(255, 118, 77, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
