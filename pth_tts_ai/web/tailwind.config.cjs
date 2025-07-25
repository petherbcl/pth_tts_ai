/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
	theme: {
		extend: {
			colors: {
				colors: {
					"range-orange": "#facc15"
				}
			},
			dropShadow: {
				red: "0 0 0.5rem crimson",
			},
		},
	},
	plugins: [],
};
