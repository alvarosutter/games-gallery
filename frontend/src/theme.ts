import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    background: '#121212',
    headerBg: '#181818',
    footerBg: '#181818',
    inputBg: '#282828',
    primaryText: '#F5F5F5',
    altText: '#CCCCCC',
    primary: '#47fe90',
    primaryDarker: '#33dd77',
    onPrimary: '#181818',
    secondary: '#fe4790',
    onSecondary: '#F5F5F5',
    button: '#3874cd',
    onButton: '#F5F5F5',
    danger: '#C62828',
    onDanger: '#F5F5F5',
    scrollbarBg: '#303030',
    itemShadow: '#333333',
  },
  fonts: {
    headersFont: 'Poppins',
    textFont: 'Roboto',
    altFont: 'Work Sans',
    btnFont: 'Poppins',
  },
  fontSizes: {
    xsmall: '0.8rem',
    small: '1.0rem',
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
