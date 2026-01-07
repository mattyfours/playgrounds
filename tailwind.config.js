/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './playgrounds/**/*.{js,ts,jsx,tsx,liquid,html,css}',
    './**/*.ts',
    './**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
