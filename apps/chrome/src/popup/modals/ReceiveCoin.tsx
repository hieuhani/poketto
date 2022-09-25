import { QRCodeSVG } from 'qrcode.react';
import { HexAddress } from '../../ui/HexAddress';
import { useWallet } from '@poketto/core';
import toast from 'react-hot-toast';
import { Button } from '@ui/Button';

interface Props {
  accountAddress: string;
  close: () => void;
}
export const ReceiveCoin: React.FunctionComponent<Props> = ({
  accountAddress,
  close,
}) => {
  const { fundAccountWithFaucet, state } = useWallet();
  const loading = state === 'account:pending:faucetFundAccount';

  const handleFaucet = async () => {
    await fundAccountWithFaucet(100000000);

    close();
    toast.success('0.01 Aptos Coins have been added to your account');
  };
  return (
    <div>
      {accountAddress && (
        <div className="mb-4 flex flex-col items-center space-y-3 py-4">
          <div>
            <QRCodeSVG value={accountAddress} />
          </div>
          <HexAddress address={accountAddress} takeLeft={6} takeRight={6} />
        </div>
      )}
      <Button fullWidth onClick={handleFaucet} disabled={loading}>
        Faucet Aptos Coin
      </Button>
    </div>
  );
};
