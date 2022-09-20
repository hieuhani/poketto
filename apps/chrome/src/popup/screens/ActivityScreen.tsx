import { useWallet } from '@poketto/core';
import { useEffect, useState } from 'react';
import { Types } from 'aptos';
import get from 'lodash.get';
import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';

interface DepositTransaction {
  amount: number;
  type: string;
  sequenceNumber: string;
}
interface SendTransaction {
  version: string;
  vmStatus: string;
  gasUsed: string;
  amount: string;
}

export const ActivityScreen: React.FunctionComponent = () => {
  const { account, resources, aptosClient } = useWallet();
  const [depositTransactions, setDepositTransactions] = useState<
    DepositTransaction[]
  >([]);

  const [sentTransactions, setSendTransactions] = useState<SendTransaction[]>(
    []
  );

  const fetchDepositTransactions = async (coin: Types.MoveResource) => {
    const counter = (coin?.data as any).deposit_events.counter;
    const data = await aptosClient.getEventsByEventHandle(
      account!.address().toString(),
      coin.type,
      'deposit_events',
      { start: counter <= BigInt(25) ? BigInt(0) : counter - BigInt(25) }
    );
    setDepositTransactions(
      data.map((event) => ({
        amount: event.data.amount,
        sequenceNumber: event.sequence_number,
        type: event.type,
      }))
    );
  };

  const fetchSendTransactions = async () => {
    const currentAddress = account!.address().toString();
    const currentAccount = await aptosClient.getAccount(currentAddress);
    const sequence = BigInt(currentAccount.sequence_number);
    const data = await aptosClient.getAccountTransactions(
      currentAddress,
      sequence <= BigInt(25)
        ? undefined
        : { start: sequence - BigInt(25), limit: 25 }
    );
    setSendTransactions(
      data.map((event: any) => ({
        version: event.version,
        gasUsed: event.gas_used,
        vmStatus: event.vm_status,
        amount: get(event, 'payload.arguments[1]'),
      }))
    );
  };

  useEffect(() => {
    const coin = resources.find((resource) =>
      resource.type.startsWith('0x1::coin::CoinStore')
    );
    fetchSendTransactions();
    if (coin) {
      fetchDepositTransactions(coin);
    }
  }, [resources]);
  return (
    <>
      <TitleHeader title="Activities" />
      <Container className="space-y-3">
        {depositTransactions.map((transaction) => (
          <div
            key={`deposit-${transaction.sequenceNumber}`}
            className="rounded-lg bg-slate-100 px-3 py-2"
          >
            <h3>+{transaction.amount}</h3>
          </div>
        ))}
        {sentTransactions.map((transaction) => (
          <div
            key={`send-${transaction.version}`}
            className="rounded-lg bg-slate-100 px-3 py-2"
          >
            <h3>-{transaction.amount}</h3>
          </div>
        ))}
      </Container>
    </>
  );
};
