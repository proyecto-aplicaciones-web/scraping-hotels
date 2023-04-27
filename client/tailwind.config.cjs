/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
			colors: {
				primary: "#536dfe"
			},
			fontFamily: {
				boogaloo: "'Boogaloo', cursive"
			}
		},
  },
  plugins: [],
};
