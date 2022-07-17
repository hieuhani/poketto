import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren } from 'react';

export const Bootstrap: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};
