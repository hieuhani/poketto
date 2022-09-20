import { useStackNavigation } from '../../../navigation';
import { useWallet, useCheckAddress, TransactionPayload } from '@poketto/core';
import { useForm } from 'react-hook-form';
import { useDebounce } from '../../hooks/use-debounce';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { HexAddress } from '../../../ui/HexAddress';
import { formatMoney } from '../../helpers/number';
import { SimulatedTransaction } from '@poketto/core';
import { useModalNavigation } from '../../../navigation/ModalNavigation';
import { Input } from '@ui/Input';
import { Button } from '@ui/Button';
import { TitleHeader } from '../../components/TitleHeader';

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
          <p>
            Address is verified.{' '}
            <a
              href={`https://explorer.devnet.aptos.dev/account/${toAddress}`}
              target="_blank"
            >
              View on explorer
            </a>
          </p>
        );
      case 'checking':
        return <p>Checking address...</p>;
      case 'invalid':
        return <p>Address is invalid</p>;
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
    <div>
      <TitleHeader title="Send coin" goBack={goBack} />
      <form>
        <div className="space-y-2 px-3">
          {account && (
            <div className="rounded-lg bg-slate-100 p-3">
              <HexAddress address={account.address().hex()} />
              {coins[0] && <p>Balance: {formatMoney(coins[0].balance)}</p>}
            </div>
          )}

          <Input
            label="Receive address"
            type="text"
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

          <Input
            label="Amount"
            placeholder="Transfer amount"
            required
            type="number"
            min={0}
            inputMode="decimal"
            {...register('amount')}
          />
          {simulatedTransaction && !simulatedTransaction.success && (
            <div>
              Insufficient balance. Gas fee: {simulatedTransaction.gasUsed}
            </div>
          )}

          <Button
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
        </div>
      </form>
    </div>
  );
};
