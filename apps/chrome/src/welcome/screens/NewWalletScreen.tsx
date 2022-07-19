import { useStackNavigation } from '~/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Input } from '~/ui/Input';
import { createNewAccount, useWallet } from '@poketto/core';
import { CredentialLine } from './components/CredentialLine';
import { useMemo } from 'react';

export const NewWalletScreen: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { account, updateAccount } = useWallet();
  const handleCreateAccount = () => {
    const newAccount = createNewAccount();
    updateAccount(newAccount);
  };

  const handleOpenWallet = () => {
    console.log('handleOpenWallet');
  };
  const rawAccount = useMemo(() => {
    if (account) {
      return account.toPrivateKeyObject();
    }
  }, [account]);
  return (
    <Box pb={4}>
      <Box py={1} px={2}>
        <IconButton aria-label="delete" onClick={goBack}>
          <IoArrowBackOutline />
        </IconButton>
      </Box>
      <Divider />
      {account ? (
        <>
          <Box px={4} py={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5">Congratulations!</Typography>
              <Typography variant="subtitle1">
                Your wallet has been created.
              </Typography>
            </Box>
          </Box>
          {rawAccount && (
            <Box px={4}>
              <Typography marginBottom={2}>
                This is your wallet credentials. Please keep it safe.
              </Typography>
              <Stack spacing={2}>
                <CredentialLine
                  title="Private key"
                  content={rawAccount.privateKeyHex}
                />
                <CredentialLine
                  title="Public key"
                  content={rawAccount.publicKeyHex}
                />
                <CredentialLine title="Address" content={rawAccount.address} />
              </Stack>
            </Box>
          )}
          <Box px={4} mt={2}>
            <Button variant="contained" fullWidth onClick={handleOpenWallet}>
              Open your wallet
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box px={4} py={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5">Create a password</Typography>
              <Typography variant="subtitle1">
                Use this password to unlock your wallet
              </Typography>
            </Box>
          </Box>
          <Stack px={4} spacing={2}>
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm password" />
            <Button variant="contained" fullWidth onClick={handleCreateAccount}>
              Continue
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};
