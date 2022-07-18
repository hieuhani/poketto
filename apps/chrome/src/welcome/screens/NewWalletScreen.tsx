import { useStackNavigation } from '~/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Input } from '~/ui/Input';
import { AptosAccount } from 'aptos';

export const NewWalletScreen: React.FunctionComponent = () => {
  const { goBack, navigate } = useStackNavigation();

  const handleCreateAccount = () => {
    const account = new AptosAccount();
    console.log(account);
  };
  return (
    <Box pb={4}>
      <Box py={1} px={2}>
        <IconButton aria-label="delete" onClick={goBack}>
          <IoArrowBackOutline />
        </IconButton>
      </Box>
      <Divider />
      <Box px={4} py={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5">Create a password</Typography>
          <Typography variant="subtitle1">
            Use this password to unlock your wallet
          </Typography>
        </Box>
      </Box>
      <Stack px={4} spacing={2}>
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm password" />
        <Button variant="contained" fullWidth onClick={handleCreateAccount}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};
