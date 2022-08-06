import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HotToast } from '../ui/HotToast';
import { theme } from './theme';

export const Bootstrap: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme(true)}>
      <CssBaseline />
      <HotToast />
      {children}
    </ThemeProvider>
  );
};
