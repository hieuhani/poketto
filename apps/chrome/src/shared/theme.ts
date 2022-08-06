import { type Theme, createTheme } from '@mui/material/styles';

export const theme = (isDark: boolean): Theme => {
  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      common: { black: '#000000', white: '#FFFFFF' },
      primary: {
        main: '#1565c0',
        dark: '#1565c0',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'inherit',
            padding: '0.625rem 1rem',
            fontSize: '1rem',
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(5px)',
          },
        },
      },
    },
  });
};
