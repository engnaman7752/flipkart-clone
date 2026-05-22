/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'flipkart-blue': '#2874f0',
        'flipkart-yellow': '#ffe11b',
        'flipkart-light': '#f1f3f6',
        flipkart: {
          blue: '#2874f0',
          yellow: '#ffe11b',
          light: '#f1f3f6',
          text: '#212121',
          muted: '#878787',
          green: '#388e3c',
          orange: '#fb641b',
          amber: '#ff9f00',
        },
        'fk-yellow-shelf': '#ffe11b',
        'fk-teal-shelf': '#006B54',
        'fk-deal-green': '#008c45',
      },
      maxWidth: {
        fk: '1248px',
      },
    },
  },
  plugins: [],
}
