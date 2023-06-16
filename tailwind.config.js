/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,js,css} ",
    "./views/*.ejs",
  
  ], // Update this array with the paths to your EJS template files
  theme: {
    extend: {},
  },
  plugins: [],
};
