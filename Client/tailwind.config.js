/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      placeholderColor: theme => theme('colors'),
    },
  },
  plugins: [],
}

