// @type {import('tailwindcss').Config} 

const pxToRem = (value) => (
  `${value / 16}rem`
);
const muiBasedUnit = (value) => (
  `${value * 8}px`
);

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      sans: ['Public Sans', 'sans-serif'],
    },
    colors: {
      primary: {
        lighter: '#C8FACD',
        light: '#5BE584',
        DEFAULT: '#00AB55',
        dark: '#007B55',
        darker: '#005249',
        contrastText: '#fff',
      },
      secondary: {
        lighter: '#D6E4FF',
        light: '#84A9FF',
        DEFAULT: '#3366FF',
        dark: '#1939B7',
        darker: '#091A7A',
        contrastColor: '#fff',
      },
      grey: {
        0: '#FFFFFF',
        100: '#F9FAFB',
        200: '#F4F6F8',
        300: '#DFE3E8',
        DEFAULT: '#C4CDD5',
        500: '#919EAB',
        600: '#637381',
        700: '#454F5B',
        800: '#212B36',
        900: '#161C24',
      },
      info: {
        lighter: '#CAFDF5',
        light: '#61F3F3',
        DEFAULT: '#00B8D9',
        dark: '#006C9C',
        darker: '#003768',
        contrastText: '#fff',
      },
      success: {
        lighter: '#D8FBDE',
        light: '#86E8AB',
        DEFAULT: '#36B37E',
        dark: '#1B806A',
        darker: '#0A5554',
        contrastText: '#212B36', // grey.800
      },
      warning: {
        lighter: '#FFF5CC',
        light: '#FFD666',
        DEFAULT: '#FFAB00',
        dark: '#B76E00',
        darker: '#7A4100',
        contrastText: '#212B36', // grey.800
      },
      error: {
        lighter: '#FFE9D5',
        light: '#FFAC82',
        DEFAULT: '#FF5630',
        dark: '#B71D18',
        darker: '#7A0916',
        contrastText: '#fff',
      },
    },
    fontSize: {
      h1: '4rem',
      h2: [pxToRem(32), muiBasedUnit(64 / 48)],
      h3: [pxToRem(24), muiBasedUnit(1.5)],
      h4: [pxToRem(20), muiBasedUnit(1.5)],
      h5: [pxToRem(18), muiBasedUnit(1.5)],
      h6: [pxToRem(17), muiBasedUnit(28 / 18)],
      subtitle1: [pxToRem(16), muiBasedUnit(1.5)],
      subtitle2: [pxToRem(14), muiBasedUnit(22 / 14)],
      body1: [pxToRem(14), muiBasedUnit(1.5)],
      body2: [pxToRem(14), muiBasedUnit(22 / 14)],
      caption: [pxToRem(12), muiBasedUnit(1.5)],
      btn: [pxToRem(14), muiBasedUnit(24 / 16)],
    },
    boxShadow: {
      z1: `0 1px 2px 0 rgba(145,158,171,0.16)`,
      z4: `0 4px 8px 0 rgba(145,158,171,0.16)`,
      z8: `0 8px 16px 0 rgba(145,158,171,0.16)`,
      z12: `0 12px 24px -4px rgba(145,158,171,0.16)`,
      z16: `0 16px 32px -4px rgba(145,158,171,0.16)`,
      z20: `0 20px 40px -4px rgba(145,158,171,0.16)`,
      z24: `0 24px 48px 0 rgba(145,158,171,0.16)`,
      //
      primary: `0 8px 16px 0 rgba(0,171,85,0.24)`,
      info: `0 8px 16px 0 rgba(0,184,217,0.24)`,
      secondary: `0 8px 16px 0 rgba(51,102,255,0.24)`,
      success: `0 8px 16px 0 rgba(54,179,126,0.24)`,
      warning: `0 8px 16px 0 rgba(255,171,0,0.24)`,
      error: `0 8px 16px 0 rgba(255,86,48,0.24)`,
      //
      card: `0 0 2px 0 rgba(145,158,171,0.2), 0 12px 24px -4px rgba(145,158,171,0.12)`,
      dialog: `-40px 40px 80px -8px rgba(145,158,171,0.24)`,
      dropdown: `0 0 2px 0 rgba(145,158,171,0.24), -20px 20px 40px -4px rgba(145,158,171,0.24)`, 
    },
    extend: [],
  },
  plugins: [],
}
