import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useStackNavigation } from '~/navigation';
import { useWallet } from '@poketto/core';

export const WelcomeScreen: React.FunctionComponent = () => {
  const { navigate } = useStackNavigation();
  const { account } = useWallet();

  return (
    <Box px={4} py={4}>
      {account ? (
        <>Thanks for using ABC Wallet!</>
      ) : (
        <>
          <Box sx={{ textAlign: 'center', marginBottom: 8 }}>
            <Typography variant="h5">Welcome to APTOS Wallet</Typography>
            <Typography variant="subtitle1">
              Secured store for your digital assets
            </Typography>
          </Box>
          <Stack spacing={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate('new_wallet')}
            >
              Create a new wallet
            </Button>
            <Button fullWidth>Import my existing wallet</Button>
          </Stack>
        </>
      )}
    </Box>
  );
};
