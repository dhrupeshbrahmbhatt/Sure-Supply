/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        luxury: {
          primary: '#10B981',
          secondary: '#34D399',
          dark: '#064E3B',
          light: '#D1FAE5',
          cream: '#F5EEE6',
          pearl: '#F8F9FA',
        }
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'pearl-gradient': 'linear-gradient(120deg, #F8F9FA 0%, #E2E8F0 100%)',
      },
      boxShadow: {
        'luxury': '0 0 20px rgba(16, 185, 129, 0.15)',
        'luxury-hover': '0 0 30px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}

