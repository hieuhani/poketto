import Box from '@mui/material/Box';
import { useWallet } from '@poketto/core';
import { useEffect, useState } from 'react';
import { Types } from 'aptos';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { TitleHeader } from '../components/TitleHeader';

interface DepositTransaction {
  amount: number;
  type: string;
  sequenceNumber: string;
}
export const ActivityScreen: React.FunctionComponent = () => {
  const { account, resources, aptosClient } = useWallet();
  const [depositTransactions, setDepositTransactions] = useState<
    DepositTransaction[]
  >([]);

  const fetchDepositTransactions = async (coin: Types.AccountResource) => {
    const counter = (coin?.data as any).deposit_events.counter;
    const data = await aptosClient.getEventsByEventHandle(
      account!.address().toString(),
      coin.type,
      'deposit_events',
      { start: counter <= 25 ? 0 : counter - 25 }
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
    const sequence = parseInt(currentAccount.sequence_number);
    const data = await aptosClient.getAccountTransactions(
      currentAddress,
      sequence <= 25 ? undefined : { start: sequence - 25, limit: 25 }
    );
    console.log(data);
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
      <Box px={2}>
        <TitleHeader title="Activities" />
      </Box>
      <List>
        {depositTransactions.map((transaction) => (
          <ListItem key={transaction.sequenceNumber}>
            <ListItemButton>
              <ListItemText
                primary={transaction.type}
                secondary={`+${transaction.amount}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
