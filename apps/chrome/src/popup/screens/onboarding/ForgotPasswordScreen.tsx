import { useStackNavigation } from '../../../navigation';
import { useWallet } from '@poketto/core';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  ForgotPasswordForm,
  ForgotPasswordFormState,
} from './components/ForgotPasswordForm';
import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';

export const ForgotPasswordScreen: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { importAccount, state } = useWallet();
  const handleImportWallet = async (form: ForgotPasswordFormState) => {
    importAccount(form.mnemonic, form.password);
  };
  useEffect(() => {
    if (state === 'account:rejected:importAccount') {
      toast.error('Invalid mnemonic or the account is not found');
    }
  }, [state]);
  return (
    <>
      <TitleHeader title="Forgot password" goBack={goBack} />
      <Container>
        <ForgotPasswordForm
          loading={state === 'account:pending:importAccount'}
          onSubmit={handleImportWallet}
        />
      </Container>
    </>
  );
};
