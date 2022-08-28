import { AptosAccount } from 'aptos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { Logo } from '../../components/Logo';
import { SelectWallet } from './components/SelectWallet';
import { useWallet } from '@poketto/core';
import { useCallback, useMemo, useState } from 'react';
import { getBrowserApi } from './browserApi';

interface Props {
  account: AptosAccount | null;
  origin: string;
  request: any;
  tabId?: string;
}
export const ReviewRequestScreen: React.FunctionComponent<Props> = ({
  account,
  origin,
  request,
  tabId,
}) => {
  const { accounts, accountTrustedOrigins, addTrustedOrigin } = useWallet();
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();

  const onSelectAccount = (address: string) => {
    setSelectedAddress(address);
  };

  const checkIsConnectedOrigin = useCallback(
    (address: string) => {
      return (accountTrustedOrigins[address] || []).includes(origin);
    },
    [accountTrustedOrigins]
  );

  const handleConnect = async () => {
    if (!selectedAddress) {
      throw new Error('selectedAddress is undefined');
    }
    await addTrustedOrigin(selectedAddress, origin);

    const browser = await getBrowserApi();
    await browser.runtime.sendMessage({
      channel: 'background',
      method: 'connected',
      payload: {
        origin,
        address: selectedAddress,
      },
      requestId: request?.requestId ?? -1,
      tabId,
    });
    window.close();
  };

  const handleCancel = () => {
    window.close();
  };

  const connected = useMemo(() => {
    if (!selectedAddress) {
      return false;
    }
    return checkIsConnectedOrigin(selectedAddress);
  }, [checkIsConnectedOrigin, selectedAddress]);

  return (
    <Box px={4} py={4}>
      <Stack
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        spacing={1}
        marginBottom={4}
      >
        <Logo width={50} />
        <Typography variant="h5">Connect with Poketto</Typography>
        <Typography variant="subtitle1">{origin}</Typography>
      </Stack>
      <Box height={48} marginY={2}>
        {selectedAddress && (
          <Alert severity="warning">Only connect with sites you trust!</Alert>
        )}
      </Box>
      {account && (
        <SelectWallet
          accounts={accounts}
          selectedAddress={selectedAddress}
          onSelectAccount={onSelectAccount}
          checkIsConnectedOrigin={checkIsConnectedOrigin}
        />
      )}

      <Stack marginTop={2} spacing={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleConnect}
          disabled={!selectedAddress}
        >
          {connected ? 'Continue connect' : 'Approve connect'}
        </Button>
        <Button fullWidth onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
