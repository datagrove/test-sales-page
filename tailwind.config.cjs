/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			
			colors: {
			'bg-gray': '#36393F',
		}
	},
	},
	variants: {
		fill: ['disabled', 'hover', 'focus'],
	},
	plugins: [],
	darkMode: 'class',
}
