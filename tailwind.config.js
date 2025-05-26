/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ff9f',
          dark: '#00cc7f',
        },
        secondary: {
          DEFAULT: '#00ffff',
          dark: '#00cccc',
        },
        dark: {
          DEFAULT: '#0a0a0f',
          light: '#1a1a1f',
        },
        gray: {
          DEFAULT: '#b3b3b3',
          dark: '#808080',
        }
      },
      animation: {
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-[#00ff9f]',
    'bg-[#00ffff]',
    'text-[#00ff9f]',
    'text-[#00ffff]',
    'from-[#00ff9f]',
    'to-[#00ffff]',
    'hover:bg-[#00ff9f]',
    'hover:bg-[#00ffff]',
    'hover:text-[#00ff9f]',
    'hover:text-[#00ffff]'
  ]
} 