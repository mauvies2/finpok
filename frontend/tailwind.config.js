/* eslint-disable global-require */

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {
    minWidth: {
      40: '10rem',
      60: '15rem',
      80: '20rem',
      100: '25rem',
    },
    maxWidth: {
      120: '30rem',
      160: '40rem',
      200: '50rem',
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary-light': '#ff4a71',
        'base-100': '#ffffff',
        'primary-dark': '#ff1245',
        'light-gray': '#FAFAFA',
        dark: '#1a1d21',
        'dark-text': '#d2d2d2',
        'dark-line': '#323232',
        'dark-modal': '#222529',
      },
      boxShadow: {
        input: '0 0 0px 0px #ffdbe3',
        button: ['0px 0px 0px 2px #1a1d21', '0px 0px 0px 4px #ff325e'],
        'dark-button': ['0px 0px 0px 2px #1a1d21', '0px 0px 0px 3px #ff325e'],
      },
      keyframes: {
        nav: {
          '0%': { top: '-80px' },
          '100%': { top: '0' },
        },
        navMobileMenu: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        modal: {
          '0%': { transform: 'translateY(50vh)' },
          '100%': { transform: 'translateY(0)' },
        },
        modalBg: {
          '0%': { backgroundColor: 'transparent' },
          '100%': { backgroundColor: 'rgb(0, 0, 0, 0.2)' },
        },
      },
      animation: {
        nav: 'nav .5s ease-in-out',
        navMobileMenu: 'navMobileMenu .15s linear',
        modal: 'modal .2s linear',
        modalBg: 'modalBg .1s linear',
      },
    },
  },
  variants: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#ff325e',
          secondary: '#2d185c',
          'base-100': '#ffffff',
          'primary-dark': '#ff2151',
          'primary-dark-hover': '#303d50',
          'light-gray': '#FAFAFA',
        },
      },
      'emerald',
    ],
  },
}
