import { useWallet } from '@poketto/core';
import { MnemonicView } from './components/MnemonicView';
import { Button } from '@ui/Button';
import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';

export const RevealMnemonicScreen: React.FunctionComponent = () => {
  const { oneTimeMnemonic, clearOneTimeMnemonic } = useWallet();
  const handleContinue = () => {
    clearOneTimeMnemonic();
  };

  return (
    <>
      <TitleHeader title="Secret recovery phrase" />
      <Container>
        <h3 className="mb-3">
          This phrase is the only way to recover your wallet. Please keep it's
          safe.
        </h3>

        <div className="mb-3">
          {oneTimeMnemonic && <MnemonicView mnemonic={oneTimeMnemonic} />}
        </div>

        <Button fullWidth onClick={handleContinue}>
          Continue
        </Button>
      </Container>
    </>
  );
};
