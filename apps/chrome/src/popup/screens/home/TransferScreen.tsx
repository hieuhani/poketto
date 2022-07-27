import Box from '@mui/material/Box';
import { IoArrowBackOutline } from 'react-icons/io5';
import IconButton from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import { useStackNavigation } from '../../../navigation';
import { useWallet, useCheckAddress, TransactionPayload } from '@poketto/core';
import { makeShortAddress } from '~/popup/helpers/address';
import InputBase from '@mui/material/InputBase';
import { useForm } from 'react-hook-form';
import { useDebounce } from '~/popup/hooks/use-debounce';
import { useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';

export const STATIC_GAS_AMOUNT = 150;

const StyledInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    position: 'relative',
    padding: '8px 10px',
    backgroundColor: 'rgb(18 18 18 / 50%)',
    borderRadius: '4px',
    fontSize: 16,
    marginBottom: 2,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export interface TransferFormState {
  toAddress: string;
  amount: string;
}

export const TransferScreen: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { account, state, resources, coins, submitTransaction } = useWallet();
  console.log(resources);
  const balance = coins.reduce((acc, coin) => acc + coin.balance, 0);
  const { check: checkAddress, status: addressStatus } = useCheckAddress();
  const { register, watch, handleSubmit } = useForm({
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
        return (
          <Typography variant="caption">
            Address is valid.{' '}
            <MuiLink
              href={`https://explorer.devnet.aptos.dev/account/${toAddress}`}
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              View on explorer
            </MuiLink>
          </Typography>
        );
      case 'checking':
        return <Typography variant="caption">Checking address...</Typography>;
      case 'invalid':
        return <Typography variant="caption">Address is invalid</Typography>;
      default:
        return null;
    }
  }, [addressStatus]);

  const onFormSubmit = async (data: TransferFormState) => {
    const payload: TransactionPayload = {
      arguments: [data.toAddress, data.amount],
      function: '0x1::coin::transfer',
      type: 'script_function_payload',
      type_arguments: ['0x1::test_coin::TestCoin'],
    };
    const txtHash = await submitTransaction(payload);
    console.log(txtHash);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
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
            <MuiLink
              href={`https://explorer.devnet.aptos.dev/account/${account
                .address()
                .hex()}`}
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              View on explorer
            </MuiLink>
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
            placeholder="Wallet address"
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
        <Paper sx={{ px: 2, pt: 2, paddingBottom: 3 }}>
          <Typography
            fontWeight="600"
            fontSize="small"
            textTransform="uppercase"
            marginBottom={1}
          >
            Amount
          </Typography>
          <StyledInput
            fullWidth
            placeholder="Transfer amount"
            required
            type="number"
            min={0}
            inputMode="decimal"
            {...register('amount')}
          />
        </Paper>
        <Paper sx={{ px: 2, py: 2 }}>
          <Typography
            fontWeight="600"
            fontSize="small"
            textTransform="uppercase"
          >
            Gas fee
          </Typography>
          <Typography>{STATIC_GAS_AMOUNT} TestCoin</Typography>
        </Paper>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={
            addressStatus !== 'valid' ||
            (amount || 0) === 0 ||
            STATIC_GAS_AMOUNT + parseFloat(amount) > balance
          }
        >
          Send
        </Button>
      </Stack>
    </form>
  );
};
