/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
      'sm': '640px',
      'lg': '1024px',
      'xl': '1280px',
      'ancient': '420px',
    },
    extend: {
      colors: {
        'regal-blue': '#73d7ff',
      },
    },
  },
  plugins: [require("daisyui")],
}
