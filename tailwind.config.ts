import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        10.5: '2.625rem',
        12.5: '3.125rem',
        13: '3.25rem',
        14.5: '3.625rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        20.5: '5.125rem',
        21.5: '5.375rem',
        25: '6.25rem',
        25.5: '6.375rem',
        27.5: '6.875rem',
        30: '7.5rem',
        31: '7.75rem',
        31.5: '7.875rem',
        35: '8.75rem',
        70: '17.5rem',
        90: '22.5rem',
        93: '23.25rem',
        100: '25rem',
      },
      colors: {
        legendary: '#FFAA2C',
        green: {
          500: '#64AB85',
          DEFAULT: '#1EDB8C',
        },
        blue: {
          DEFAULT: '#43BBFF',
        },
        yellow: {
          DEFAULT: '#FFE7AB',
        },
        red: {
          500: '#F55D70',
          DEFAULT: '#FF2358',
        },
        gray: {
          300: '#A5A6AB',
          DEFAULT: '#4E4E50',
          500: '#434851',
          550: '#3D444B',
          600: '#6F7784',
        },
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(180deg, #1E6744 5%, #388657 50%, #499467 99%)',
        'gradient-red': 'linear-gradient(180deg, #8C2329 5%, #B03B42 50%, #C03840 99%)',
        'content-border': 'url("/img/border.webp")',
      },
      lineHeight: {
        3.5: '.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        10.5: '2.625rem',
        12: '3rem',
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
