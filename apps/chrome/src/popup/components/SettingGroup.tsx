import Paper from '@mui/material/Paper';
import { PropsWithChildren } from 'react';

export const SettingGroup: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <Paper
    sx={{
      backgroundColor: 'grey.900',
      borderRadius: 4,
      overflow: 'hidden',
    }}
  >
    {children}
  </Paper>
);
