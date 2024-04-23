import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          '2xl': '10.5rem',
        },
      },
      screens: {
        xs: { max: '480px' },
        md: { max: '768px' },
      },
      opacity: {
        '6': '0.06',
        '12': '0.12',
        '16': '0.16',
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        10.5: '2.625rem',
        12.5: '3.125rem',
        13: '3.25rem',
        14.5: '3.625rem',
        15: '3.75rem',
        15.5: '3.875rem',
        17: '4.25rem',
        18: '4.5rem',
        20.5: '5.125rem',
        21.5: '5.375rem',
        25: '6.25rem',
        25.5: '6.375rem',
        26: '6.5rem',
        27: '6.75rem',
        27.5: '6.875rem',
        30: '7.5rem',
        31: '7.75rem',
        31.5: '7.875rem',
        35: '8.75rem',
        45: '11.25rem',
        57.5: '14.375rem',
        58.5: '14.625rem',
        70: '17.5rem',
        90: '22.5rem',
        93: '23.25rem',
        100: '25rem',
      },
      colors: {
        legendary: '#FFAA2C',
        epic: '#FB8E01',
        rare: '#7638FF',
        uncommon: '#14752D',
        common: '#606374',
        green: {
          500: '#64AB85',
          DEFAULT: '#1EDB8C',
          700: '#A9FF54',
        },
        blue: {
          300: '#4383FF',
          DEFAULT: '#43BBFF',
        },
        yellow: {
          DEFAULT: '#FFE7AB',
        },
        red: {
          500: '#F55D70',
          DEFAULT: '#FF2358',
          600: '#FB1E1E',
        },
        gray: {
          300: '#A5A6AB',
          DEFAULT: '#4E4E50',
          500: '#434851',
          550: '#3D444B',
          600: '#6F7784',
          700: '#111111',
          750: '#141414',
          800: '#15130F',
        },
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(180deg, #FFFFDA 6.62%, #FFE7B6 44.37%, #CE9658 81.62%)',
        'gradient-green': 'linear-gradient(180deg, #1E6744 5%, #388657 50%, #499467 99%)',
        'gradient-red': 'linear-gradient(180deg, #8C2329 5%, #B03B42 50%, #C03840 99%)',
        'gradient-yellow': 'linear-gradient(#aa7000 0%, #4a2800 57.58%, #1f0d00 100%)',
        'gradient-yellow-dark': 'linear-gradient(#AA7000 -10%, #4A2800 59.09%, #1F0D00 110%)',
        'gradient-yellow-light': 'linear-gradient(#E2A300 0%, #894200 57.58%, #4B1F00 100%)',
        'gradient-chart-yellow': 'linear-gradient(180deg, #FF9F77 0%, #FFD600 100%)',
        'gradient-process': 'linear-gradient(180deg, #4B1700 0%, #341600 57.58%, #1D0900 100%)',
        'gradient-process-content': 'linear-gradient(180deg,#F2A000 2.78%, #7D4400 57.15%, #632900 97.22%)',
        'content-border': 'url("/img/border.webp")',
        'gradient-percent-red': 'linear-gradient(180deg,#F97045 -10.71%, #9E1616 110.71%)',
        'gradient-percent-yellow':
          'linear-gradient(180deg,rgba(246, 192, 87, 0.80) 0%, rgba(255, 194, 77, 0.80) 0.01%, rgba(239, 145, 36, 0.80) 100%)',
        'gradient-percent-blue': 'linear-gradient(180deg,#3CB3F6 -10.71%, #134CBA 110.71%)',
        'gradient-orange': 'linear-gradient(#F1870B -10.71%, #9E0000 57.47%, #3E0000 110.71%)',
      },
      lineHeight: {
        3.5: '.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        10.5: '2.625rem',
        11: '2.75rem',
        12: '3rem',
      },
      backdropBlur: {
        unset: 'unset',
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
      },
      keyframes: {
        collapsed: {
          '0%': {
            display: 'none',
            opacity: '0%',
          },
          '99%': {
            display: 'none',
            opacity: '0%',
          },
          '100%': {
            display: 'inline-block',
            opacity: '100%',
          },
        },
      },
      animation: {
        collapsed: 'collapsed .2s ease-in',
      },
    },
  },
  plugins: [],
};
export default config;
