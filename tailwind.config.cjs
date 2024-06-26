/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./src/content/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',],
	theme: {
		extend: {

			colors: {
				'bg-gray': '#36393F',
				'dg-greenDM': '#1DD762',
				'dg-green': '#198900',
			},
			typography: {
				DEFAULT: {
					css: {
						blockquote: {
							fontStyle: 'normal',
						},
						'blockquote p:first-of-type::before': {
							content: 'none',
						},
						'blockquote p:last-of-type::after': {
							content: 'none',
						},
					}
				}
			}
		},
	},
	variants: {
		fill: ['disabled', 'hover', 'focus'],
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(function ({ addBase, addComponents, addUtilities, theme }) {
			addComponents({
				'.faq': {
					fontSize: "md:24px",
					margin: "4px 0px 4px 0px",
					fontWeight: "bold",

				},
				'.answer': {
					fontSize: "16px",
					margin: "0px 0px 16px 0px"
				},
				'.faq-block': {
					margin: "0px 0px 32px 0px"
				}
			})
		})
	],
	darkMode: 'class',
}
