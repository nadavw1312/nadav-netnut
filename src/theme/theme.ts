'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray: true;
  }
}

let theme = createTheme({

});

theme = createTheme(theme,{
  palette: {
    gray: theme.palette.augmentColor({
      color: {
        main: 'hsl(231, 11%, 63%)',
      },
      name: 'gray',
    }),
    primary: {
      main: '#4B0082', // Marine blue
      light: 'hsl(228, 100%, 84%)', // Pastel blue
      dark: 'hsl(243, 100%, 62%)', // Purplish blue

    },
    secondary: {
      main: 'hsl(354, 84%, 57%)', // Strawberry red
    },
    background: {
      default: 'hsl(217, 100%, 97%)', // Magnolia
      paper: 'hsl(0, 0%, 100%)', // White
    },
    text: {
      primary: 'hsl(213, 96%, 18%)', // Marine blue
      secondary: 'hsl(231, 11%, 63%)', // Cool gray
    },
  },
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
