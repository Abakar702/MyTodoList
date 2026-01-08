/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#f0f4ff',
          100: '#d9e2ff',
          200: '#bccaff',
          300: '#8da5ff',
          400: '#5a75ff',
          500: '#4361ee', // Main brand color
          600: '#3a49cc',
          700: '#2d37a8',
          800: '#232a85',
          900: '#1c2269',
        },
        'accent': {
          50: '#fff0f7',
          100: '#ffe2f2',
          200: '#ffc5e6',
          300: '#ff98d1',
          400: '#ff58b1',
          500: '#f72585', // Accent color
          600: '#d0166a',
          700: '#a60e52',
          800: '#850d43',
          900: '#700f3c',
        },
        'surface': {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b', // Dark surface
          950: '#09090b',
        }
      },
      fontFamily: {
        'sans': ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
        'premium-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 8px 15px -3px rgba(0, 0, 0, 0.1)',
        'glass-light': 'inset 0 0 0 1px rgba(255, 255, 255, 0.4), 0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-dark': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'subtle-pulse': 'subtle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'reveal': 'reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        reveal: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
}