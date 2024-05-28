import type { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    background: '#121212',
    headerBg: '#181818',
    footerBg: '#181818',
    scoreBg: '#ffffffef',
    primaryText: '#F5F5F5',
    altText: '#CCCCCC',
    primary: '#47fe90',
    primaryDarker: '#33dd77',
    onPrimary: '#F5F5F5',
    scrollbarBg: '#303030',
    btnText: '#181818',
  },
  fonts: {
    headersFont: 'Poppins',
    textFont: 'Roboto',
    altFont: 'Work Sans',
    btnFont: 'Poppins',
  },
  fontSizes: {
    xsmall: '1.0rem',
    small: '1.2rem',
    medium: '1.5rem',
    large: '3.0rem',
    xlarge: '4.5rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700,
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    largeDevice: '1200px',
  },
};

export default darkTheme;
