/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
			colors: {
				primary: "#536dfe",
				secondary: "#3f51b5"
			},
			fontFamily: {
				boogaloo: "'Boogaloo', cursive"
			}
		},
  },
  plugins: [],
};
