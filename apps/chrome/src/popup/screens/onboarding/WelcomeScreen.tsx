import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useStackNavigation } from '../../../navigation';
import { Logo } from '../../components/Logo';

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
        <Logo />
        <Typography marginTop={4} variant="h5">
          Welcome to Poketto Wallet
        </Typography>
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
        <Button fullWidth onClick={() => navigate('import_wallet')}>
          Import my existing wallet
        </Button>
      </Stack>
    </Box>
  );
};
