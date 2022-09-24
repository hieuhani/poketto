import { AptosAccount } from 'aptos';
import { Logo } from '../../components/Logo';
import { SelectWallet } from './components/SelectWallet';
import { useWallet } from '@poketto/core';
import { useCallback, useMemo, useState } from 'react';
import { getBrowserApi } from './browserApi';
import { Button } from '@ui/Button';

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
    <div className="px-3 py-2">
      <div className="mb-3 flex flex-col items-center space-y-3 text-center">
        <Logo width={50} />
        <h3>Connect with Poketto</h3>
        <p>{origin}</p>
      </div>
      <div className="h-16">
        {selectedAddress && <div>Only connect with sites you trust!</div>}
      </div>
      {account && (
        <SelectWallet
          accounts={accounts}
          selectedAddress={selectedAddress}
          onSelectAccount={onSelectAccount}
          checkIsConnectedOrigin={checkIsConnectedOrigin}
        />
      )}

      <div className="space-x-2">
        <Button fullWidth onClick={handleConnect} disabled={!selectedAddress}>
          {connected ? 'Continue connect' : 'Approve connect'}
        </Button>
        <Button fullWidth onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
