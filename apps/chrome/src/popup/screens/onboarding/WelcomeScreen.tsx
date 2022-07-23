import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useStackNavigation } from '~/navigation';

export const WelcomeScreen: React.FunctionComponent = () => {
  const { navigate } = useStackNavigation();

  return (
    <Box px={4} py={4}>
      <Box
        sx={{
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          width={120}
          height={120}
          sx={{ backgroundColor: 'grey.400' }}
          borderRadius="50%"
          marginBottom={6}
        />
        <Typography variant="h5">Welcome to Poketto Wallet</Typography>
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
    </Box>
  );
};
