import { AptosClient, Types } from 'aptos';
import { useState, useEffect, useMemo } from 'react';
import get from 'lodash.get';
import { Transaction } from '../types';

export const useGetTransactions = (
  aptosClient: AptosClient,
  resources: Types.MoveResource[],
  address?: string,
  runOnUseEffect = false
) => {
  const [rawTransactions, setTransactions] = useState<Types.Transaction[]>([]);
  const transactions = useMemo<Transaction[]>(
    () =>
      rawTransactions.flat().map((tx: Types.Transaction) => {
        const func = get(tx, 'payload.function', '');
        const functionType = func.split('::').pop();
        const sender = get(tx, 'sender');
        const modules = get(tx, 'payload.modules');
        const timestamp = get(tx, 'timestamp');
        const success = get(tx, 'success', false);
        const destination = get(tx, 'payload.arguments.0');
        const type =
          functionType === 'mint'
            ? 'MINT'
            : sender !== address
            ? 'RECEIVED'
            : func === '0x1::coin::transfer'
            ? 'SENT'
            : modules
            ? 'PUBLISH'
            : func
            ? 'FUNCTION'
            : 'UNKNOWN';
        if (type === 'FUNCTION') {
          console.log(tx);
        }
        return {
          version: get(tx, 'version'),
          gasUsed: get(tx, 'gas_used'),
          vmStatus: get(tx, 'vm_status'),
          amount: get(tx, 'payload.arguments[1]'),
          timestamp,
          type,
          createdAt: new Date(parseInt(timestamp.slice(0, -3))),
          success,
          hash: tx.hash,
          destination,
          sender,
          functionType,
        };
      }),
    [rawTransactions]
  );

  const fetchDepositTransactions = async (coin: Types.MoveResource) => {
    const counter = (coin?.data as any).deposit_events.counter;
    const data = await aptosClient.getEventsByEventHandle(
      address!,
      coin.type,
      'deposit_events',
      { start: counter <= BigInt(25) ? BigInt(0) : counter - BigInt(25) }
    );

    const versions = data.map((event) => get(event, 'version')).filter(Boolean);
    return Promise.all(
      versions.map((version) => aptosClient.getTransactionByVersion(version))
    );
  };

  const fetchSendTransactions = async (sequenceNumber: string) => {
    const sequence = BigInt(sequenceNumber);

    return aptosClient.getAccountTransactions(
      address!,
      sequence <= BigInt(25)
        ? undefined
        : { start: sequence - BigInt(25), limit: 25 }
    );
  };

  const fetchAllTransactions = async (
    promises: Promise<Types.Transaction[]>[]
  ) => {
    const combinedTransactions = await Promise.all(promises);

    setTransactions(combinedTransactions.flat());
  };

  const fetchTransactions = () => {
    if (address && resources.length > 0) {
      const promises: Promise<Types.Transaction[]>[] = [];
      const account = resources.find(
        (resource) => resource.type === '0x1::account::Account'
      );
      if (account) {
        promises.push(
          fetchSendTransactions(get(account, 'data.sequence_number'))
        );
      }

      const coin = resources.find((resource) =>
        resource.type.startsWith('0x1::coin::CoinStore')
      );

      if (coin) {
        promises.push(fetchDepositTransactions(coin));
      }
      if (promises.length > 0) {
        fetchAllTransactions(promises);
      }
    }
  };

  useEffect(() => {
    if (runOnUseEffect) {
      fetchTransactions();
    }
  }, [resources, address]);
  return { transactions, fetchTransactions };
};
