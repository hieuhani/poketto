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
import InputBase from '@mui/material/InputBase';
import { useForm } from 'react-hook-form';
import { useDebounce } from '../../hooks/use-debounce';
import { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import Alert from '@mui/material/Alert';
import { HexAddress } from '../../../ui/HexAddress';
import { formatMoney } from '../../helpers/number';
import { SimulatedTransaction } from '@poketto/core';
import { useModalNavigation } from '../../../navigation/ModalNavigation';

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
  const { account, state, coins, submitTransaction, simulateTransaction } =
    useWallet();
  const { openModal } = useModalNavigation();
  const [simulatedTransaction, setSimulatedTransaction] =
    useState<SimulatedTransaction | null>(null);
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
  const debouncedAmountOnChange = useDebounce(amount, 500);
  useEffect(() => {
    if (debouncedAddressOnChange.length >= 60 && length <= 70) {
      checkAddress(debouncedAddressOnChange);
    }
  }, [debouncedAddressOnChange]);

  useEffect(() => {
    const executeSimulateTransaction = async (payload: TransactionPayload) => {
      const result = await simulateTransaction(payload);
      setSimulatedTransaction(result);
    };
    if (debouncedAmountOnChange && toAddress) {
      const payload: TransactionPayload = {
        arguments: [toAddress, BigInt(debouncedAmountOnChange)],
        function: '0x1::coin::transfer',
        type: 'script_function_payload',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      };
      executeSimulateTransaction(payload);
    }
  }, [debouncedAmountOnChange, toAddress]);

  const addressNote = useMemo(() => {
    switch (addressStatus) {
      case 'valid':
        return (
          <Typography variant="caption">
            Address is verified.{' '}
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

  const onSendTransaction = async () => {
    try {
      const payload: TransactionPayload = {
        arguments: [toAddress, BigInt(amount)],
        function: '0x1::coin::transfer',
        type: 'script_function_payload',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
      };
      await submitTransaction(payload);
      goBack();
      toast.success('Transaction sent');
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const handlePreviewTransaction = () => {
    openModal('ConfirmSendTransaction', {
      onSendTransaction,
      fromAddress: account?.address().hex() || '',
      toAddress: toAddress,
      amount: parseInt(amount, 10),
      gasFee: simulatedTransaction?.gasUsed || 0,
    });
  };

  return (
    <form>
      <Box py={1} px={1} display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <IoArrowBackOutline />
        </IconButton>
        <Typography variant="h6">Send coins</Typography>
      </Box>
      <Stack px={1} spacing={2}>
        {account && (
          <Paper sx={{ px: 2, py: 2 }}>
            <HexAddress
              address={account.address().hex()}
              AddressProps={{ variant: 'body1', color: 'white' }}
            />
            {coins[0] && (
              <Typography variant="caption" color="grey.400">
                Balance: {formatMoney(coins[0].balance)}
              </Typography>
            )}
          </Paper>
        )}

        <Paper sx={{ px: 2, py: 2 }}>
          <Typography
            component="div"
            variant="caption"
            color="grey.400"
            marginBottom={1}
          >
            Receive address
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
        <Paper sx={{ px: 2, py: 2 }}>
          <Typography
            component="div"
            variant="caption"
            color="grey.400"
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
        {simulatedTransaction && !simulatedTransaction.success && (
          <Alert severity="error">
            Insufficient balance. Gas fee: {simulatedTransaction.gasUsed}
          </Alert>
        )}

        <Button
          variant="contained"
          type="button"
          onClick={handlePreviewTransaction}
          fullWidth
          disabled={
            [
              'account:pending:submitTransaction',
              'account:pending:simulateTransaction',
            ].includes(state) ||
            !simulatedTransaction ||
            (simulatedTransaction && !simulatedTransaction.success) ||
            addressStatus !== 'valid' ||
            (amount || 0) === 0 ||
            parseFloat(amount) > balance
          }
        >
          Preview
        </Button>
      </Stack>
    </form>
  );
};
