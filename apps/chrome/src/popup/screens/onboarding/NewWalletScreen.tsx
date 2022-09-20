import { useStackNavigation } from '../../../navigation';
import { useWallet } from '@poketto/core';
import { PasswordForm, PasswordFormState } from './components/PasswordForm';
import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';

export const NewWalletScreen: React.FunctionComponent = () => {
  const { goBack, navigate } = useStackNavigation();
  const { createNewAccount, state } = useWallet();

  const handlePasswordSubmitted = async (form: PasswordFormState) => {
    await createNewAccount(form.password);
    navigate('reveal_mnemonic');
  };

  return (
    <>
      <TitleHeader title="Create a password" goBack={goBack} />
      <Container>
        <PasswordForm
          onSubmit={handlePasswordSubmitted}
          loading={state === 'account:pending:createAccount'}
        />
      </Container>
    </>
  );
};
