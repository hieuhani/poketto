import { MnemonicView } from '../screens/onboarding/components/MnemonicView';
import { useWallet } from '@poketto/core';
import { Button } from '@ui/Button';

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
    <div className="space-y-3">
      <h5 className="text-xl font-medium">New account created</h5>
      <p>This is your recovery seed phrase. Please keep it's safe.</p>
      <MnemonicView mnemonic={mnemonic} />
      <Button fullWidth onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
};
