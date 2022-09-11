import { AptosAccount } from 'aptos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Logo } from '../../components/Logo';
import { useWallet } from '@poketto/core';
import { useCallback, useMemo, useState } from 'react';
import { getBrowserApi } from './browserApi';

interface Props {
  account: AptosAccount | null;
  origin: string;
  request: any;
  tabId?: string;
}
export const CreateNFTCollectionScreen: React.FunctionComponent<Props> = ({
  account,
  origin,
  request,
  tabId,
}) => {
  const { accounts, accountTrustedOrigins, addTrustedOrigin } = useWallet();
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();



  const handleConnect = async () => {
    if (!selectedAddress) {
      throw new Error('selectedAddress is undefined');
    }
    await addTrustedOrigin(selectedAddress, origin);

    const browser = await getBrowserApi();
    await browser.runtime.sendMessage({
      channel: 'background',
      method: 'createNFTCollection',
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
        <Typography variant="h5">Approve Request</Typography>
        <Typography variant="subtitle1">{origin}</Typography>
      </Stack>
      <Typography variant="subtitle1">Transaction Details:</Typography>
      <Typography variant="subtitle1">Collection Name</Typography>
      <Stack marginTop={2} spacing={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleConnect}
          disabled={!account}
        >
          Approve
        </Button>
        <Button fullWidth onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
