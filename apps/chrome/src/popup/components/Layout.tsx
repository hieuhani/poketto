import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

export const Layout: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        maxWidth: 420,
        marginX: 'auto',
        height: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr 60px',
        backgroundColor: 'grey.900',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        width={272}
        height={272}
        sx={{
          position: 'absolute',
          left: -130,
          top: -92,
          borderRadius: 136,
          filter: 'blur(200px)',
          backgroundColor: '#1e88e5',
        }}
      />
      <Box zIndex={1000}>{children}</Box>
    </Box>
  );
};
