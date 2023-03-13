import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      background: string;
      headerBg: string;
      footerBg: string;
      scoreBg: string;
      primaryText: string;
      altText: string;
      primary: string;
      primaryDarker: string;
      onPrimary: string;
      scrollbarBg: string;
      btnText: string;
    };
    fonts: {
      headersFont: 'Poppins';
      textFont: 'Roboto';
      altFont: 'Work Sans';
      btnFont: 'Poppins';
    };
    fontSizes: {
      xsmall: '1.0rem';
      small: '1.2rem';
      medium: '1.5rem';
      large: '3.0rem';
      xlarge: '4.5rem';
    };
    fontWeights: {
      light: 300;
      normal: 400;
      bold: 700;
    };
    breakpoints: {
      mobile: '576px';
      tablet: '768px';
      laptop: '992px';
      largeDevice: '1200px';
    };
  }
}
