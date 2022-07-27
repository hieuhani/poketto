import Box from '@mui/material/Box';
import { IoArrowBackOutline } from 'react-icons/io5';
import IconButton from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useStackNavigation } from '../../../navigation';
import { useWallet, useCheckAddress } from '@poketto/core';
import { makeShortAddress } from '~/popup/helpers/address';
import InputBase from '@mui/material/InputBase';
import { useForm } from 'react-hook-form';
import { useDebounce } from '~/popup/hooks/use-debounce';
import { useEffect, useMemo } from 'react';

const StyledInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    position: 'relative',
    padding: '8px 10px',
    backgroundColor: 'rgb(18 18 18 / 50%)',
    borderRadius: '4px',
    fontSize: 16,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const TransferScreen: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { account, state, resources, coins } = useWallet();
  const { check: checkAddress, status: addressStatus } = useCheckAddress();
  const { register, watch } = useForm({
    defaultValues: {
      toAddress: '',
      amount: '',
    },
  });
  const toAddress: string = watch('toAddress');

  const amount: string = watch('amount');

  const {
    onChange: addressOnChange,
    ref: toAddressRef,
    ...toAddressRest
  } = { ...register('toAddress') };

  const debouncedAddressOnChange = useDebounce(toAddress, 500);

  useEffect(() => {
    if (debouncedAddressOnChange.length >= 60 && length <= 70) {
      checkAddress(debouncedAddressOnChange);
    }
  }, [debouncedAddressOnChange]);

  const addressNote = useMemo(() => {
    switch (addressStatus) {
      case 'valid':
        return 'Address is invalid';
      case 'checking':
        return 'Checking address...';
      case 'invalid':
        return 'Address is invalid';
      default:
        return null;
    }
  }, [addressStatus]);

  return (
    <Box>
      <Box py={1} px={2} display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <IoArrowBackOutline />
        </IconButton>
        <Typography variant="h6">Send coins</Typography>
      </Box>
      <Stack px={2} spacing={2}>
        {account && (
          <Paper sx={{ px: 2, py: 2 }}>
            <Typography
              fontWeight="600"
              fontSize="small"
              textTransform="uppercase"
            >
              From
            </Typography>
            <Typography>
              Wallet 1: {makeShortAddress(account.address().hex(), 12)}
            </Typography>
          </Paper>
        )}
        {coins[0] && (
          <Paper sx={{ px: 2, py: 2 }}>
            <Typography
              fontWeight="600"
              fontSize="small"
              textTransform="uppercase"
            >
              Coin
            </Typography>
            <Typography>
              {coins[0].balance} {coins[0].name}
            </Typography>
          </Paper>
        )}
        <Paper sx={{ px: 2, pt: 2, paddingBottom: 3 }}>
          <Typography
            fontWeight="600"
            fontSize="small"
            textTransform="uppercase"
            marginBottom={1}
          >
            To
          </Typography>
          <StyledInput
            fullWidth
            placeholder="Aptos wallet address"
            required
            onChange={addressOnChange}
            autoComplete="off"
            ref={(e) => {
              toAddressRef(e);
            }}
            {...toAddressRest}
          />
          {addressNote}
        </Paper>
      </Stack>
    </Box>
  );
};
