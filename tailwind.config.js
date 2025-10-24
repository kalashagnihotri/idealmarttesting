/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				Quicksand: ['Quicksand', 'sans-serif'],
			},
			screens: {
				'below-400w-800h': { raw: '(max-width: 400px) and (max-height: 800px)' },
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				'idl-green': '#378157',
				'idl-yellow': '#f8c636',
				'smoke-white': '#f7f7f7',
				'idl-red': '#e23d21',
				'frost-white': '#E8F2EE',
				'idl-text': '#161925'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				glow: {
					'0%': {
						borderColor: '#29b8cd', // Blue
						boxShadow: '0 0 8px #29b8cd, 0 0 16px #29b8cd',
					},
					'50%': {
						borderColor: '#00f2a6', // Purple
						boxShadow: '0 0 12px #00f2a6, 0 0 24px #00f2a6',
					},
					'100%': {
						borderColor: '#fedf30', // Pink
						boxShadow: '0 0 8px #fedf30, 0 0 16px #fedf30',
					},
				},
				perspective: {
					'1000': '1000px',
				},
				fadeIn: {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				bounce: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				fadeIn: 'fadeIn 0.5s ease-in-out',
				bounce: 'bounce 1s infinite',
				glow: 'glow 1.5s infinite',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('tailwindcss-3d'),
	],
}