import { PropsWithChildren } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HotToast } from '../ui/HotToast';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const Bootstrap: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HotToast />
      {children}
    </ThemeProvider>
  );
};
