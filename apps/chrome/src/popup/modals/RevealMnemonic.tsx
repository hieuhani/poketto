import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MnemonicView } from '../screens/onboarding/components/MnemonicView';
import { useWallet } from '@poketto/core';

interface Props {
  mnemonic: string;
  close: () => void;
}
export const RevealMnemonic: React.FunctionComponent<Props> = ({
  mnemonic,
  close,
}) => {
  const { changeDefaultAccountIndex, totalWalletAccount } = useWallet();
  const handleContinue = () => {
    close();
    changeDefaultAccountIndex(totalWalletAccount - 1);
  };
  return (
    <Box width="260px">
      <Typography variant="h5" marginBottom={1}>
        New account created
      </Typography>
      <Typography variant="subtitle1" color="grey.400" marginBottom={4}>
        This is your recovery seed phrase. Please keep it's safe.
      </Typography>
      <MnemonicView mnemonic={mnemonic} />
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: 4 }}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </Box>
  );
};
