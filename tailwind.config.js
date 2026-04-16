/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**",
    "!./server/**",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          850: '#1C2536',
          900: '#111820',
          950: '#05070A',
        },
        eclipse: {
          bg: '#05070A',
          card: '#0C1117',
          surface: '#111820',
          border: '#1C2536',
          accent: '#6BA3FF',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: [],
};
