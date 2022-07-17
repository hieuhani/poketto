import { Bootstrap } from '~/shared/Bootstrap';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const App: React.FunctionComponent = () => {
  return (
    <Bootstrap>
      <Paper
        sx={{
          width: 420,
          marginX: 'auto',
          marginTop: '50vh',
          transform: 'translateY(-50%)',
        }}
      >
        <Box px={4} py={4}>
          <Box sx={{ textAlign: 'center', marginBottom: 8 }}>
            <Typography variant="h5">Welcome to APTOS Wallet</Typography>
            <Typography variant="subtitle1">
              Secured store for your digital assets
            </Typography>
          </Box>
          <Stack spacing={2}>
            <Button variant="contained" fullWidth>
              Create a new wallet
            </Button>
            <Button fullWidth>Import my existing wallet</Button>
          </Stack>
        </Box>
      </Paper>
    </Bootstrap>
  );
};
