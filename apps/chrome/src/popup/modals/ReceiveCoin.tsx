import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { QRCodeSVG } from 'qrcode.react';
import CircularProgress from '@mui/material/CircularProgress';

import { HexAddress } from '../../ui/HexAddress';
import { useWallet } from '@poketto/core';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface Props {
  accountAddress: string;
}
export const ReceiveCoin: React.FunctionComponent<Props> = ({
  accountAddress,
}) => {
  const { fundAccountWithFaucet, state } = useWallet();
  const loading = state === 'account:pending:faucetFundAccount';
  useEffect(() => {
    if (state === 'account:fulfilled:faucetFundAccount') {
      toast.success('5000 Aptos Coins have been added to your account');
    }
  }, [state]);
  return (
    <Box width="240px" paddingY={4}>
      {accountAddress && (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          marginBottom={4}
        >
          <Box
            padding={2}
            borderRadius={4}
            marginBottom={2}
            sx={{ backgroundColor: 'white' }}
          >
            <QRCodeSVG value={accountAddress} />
          </Box>
          <HexAddress
            address={accountAddress}
            takeLeft={6}
            takeRight={6}
            addressSx={{ fontSize: 16 }}
          />
        </Box>
      )}
      <Button
        fullWidth
        variant="contained"
        sx={{ borderRadius: 4 }}
        size="small"
        onClick={() => fundAccountWithFaucet(5000)}
        disabled={loading}
        endIcon={loading ? <CircularProgress size={20} color="info" /> : null}
      >
        Faucet Aptos Coin
      </Button>
    </Box>
  );
};
