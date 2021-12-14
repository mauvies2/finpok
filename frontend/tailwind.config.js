
module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {
    minWidth: {
      '40': '10rem',
      '60': '15rem',
      '80': '20rem',
      '100': '25rem',
    },
    maxWidth: {
      '120': '30rem',
      '160': '40rem',
      '200': '50rem',
    },
		extend: {
			colors: {
				'primary-green': '#49cc68',
				'primary-dark': '#202936',
				'primary-dark-hover': '#303d50',
				'light-gray': '#FAFAFA'
			},
			boxShadow: {
        input:'0 0 0 4px rgb(230, 240, 255)'
			},
			keyframes: {
				nav: {
					'0%': { top: '-80px' },
					'100%': { top: '0' },
				},
				navMobileMenu: {
					'0%': { top: '-250px' },
					'100%': { top: '0' },
				}
			 },
			animation: {
				nav: 'nav .5s ease-in-out',
				navMobileMenu: 'navMobileMenu .2s ease-in-out',
			 }
		},
  },
  variants: {},
  plugins: [
    require('daisyui'),
		require('tailwind-scrollbar-hide')
  ],
  daisyui: {
    themes: [
      'emerald'
    ],
  }
}
