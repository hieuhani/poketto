import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useWallet } from '@poketto/core';
import Alert from '@mui/material/Alert';

export const RevealMnemonicScreen: React.FunctionComponent = () => {
  const { oneTimeMnemonic, clearOneTimeMnemonic } = useWallet();
  const handleContinue = () => {
    clearOneTimeMnemonic();
  };

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
        <Typography variant="h5">Secret recovery phrase</Typography>

        <Alert severity="warning">
          This phrase is the only way to recover your wallet.
        </Alert>

        <Typography>{oneTimeMnemonic}</Typography>
      </Box>
      <Stack spacing={2}>
        <Button variant="contained" fullWidth onClick={handleContinue}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};
