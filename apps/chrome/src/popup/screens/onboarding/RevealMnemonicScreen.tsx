import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useWallet } from '@poketto/core';
import { MnemonicView } from './components/MnemonicView';

export const RevealMnemonicScreen: React.FunctionComponent = () => {
  const { oneTimeMnemonic, clearOneTimeMnemonic } = useWallet();
  const handleContinue = () => {
    clearOneTimeMnemonic();
  };

  return (
    <Box px={4} py={4}>
      <Typography variant="h5" marginBottom={1}>
        Secret recovery phrase
      </Typography>
      <Typography variant="subtitle1" color="grey.400" marginBottom={4}>
        This phrase is the only way to recover your wallet. Please keep it's
        safe.
      </Typography>

      {oneTimeMnemonic && <MnemonicView mnemonic={oneTimeMnemonic} />}

      <Stack spacing={2}>
        <Button variant="contained" fullWidth onClick={handleContinue}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};
