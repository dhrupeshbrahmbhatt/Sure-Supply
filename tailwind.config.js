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
          // ... other shades
          900: '#064E3B',
        },
      },
    },
  },
  plugins: [],
}

