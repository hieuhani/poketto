import { useStackNavigation } from '../../../navigation';
import { useWallet } from '@poketto/core';
import {
  ImportWalletForm,
  ImportWalletFormState,
} from './components/ImportWalletForm';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';

export const ImportWalletScreen: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { importAccount, state } = useWallet();
  const handleImportWallet = async (form: ImportWalletFormState) => {
    importAccount(form.mnemonic, form.password);
  };
  useEffect(() => {
    if (state === 'account:rejected:importAccount') {
      toast.error('Invalid mnemonic or the account is not found');
    }
  }, [state]);
  return (
    <>
      <TitleHeader title="Import wallet" goBack={goBack} />
      <Container>
        <ImportWalletForm
          loading={state === 'account:pending:importAccount'}
          onSubmit={handleImportWallet}
        />
      </Container>
    </>
  );
};
