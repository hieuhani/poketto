import { useStackNavigation } from '../../../navigation';
import { IoArrowBackOutline } from 'react-icons/io5';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';
import { useWallet } from '@poketto/core';

import { PasswordForm, PasswordFormState } from './components/PasswordForm';

export const NewWalletScreen: React.FunctionComponent = () => {
  const { goBack, navigate } = useStackNavigation();
  const { createNewAccount, state } = useWallet();

  const handlePasswordSubmitted = async (form: PasswordFormState) => {
    await createNewAccount(form.password);
    navigate('reveal_mnemonic');
  };

  return (
    <Box pb={4}>
      <Box py={1} px={2}>
        <IconButton onClick={goBack}>
          <IoArrowBackOutline />
        </IconButton>
      </Box>
      <Divider />
      <PasswordForm
        onSubmit={handlePasswordSubmitted}
        loading={state === 'account:pending:createAccount'}
      />
    </Box>
  );
};
