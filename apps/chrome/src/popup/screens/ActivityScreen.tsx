import { useWallet } from '@poketto/core';

import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';
import { useEffect } from 'react';

export const ActivityScreen: React.FunctionComponent = () => {
  const { transactions, fetchTransactions } = useWallet();

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <>
      <TitleHeader title="Activities" />
      <Container className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={`deposit-${transaction.version}`}
            className="rounded-lg bg-slate-100 px-3 py-2"
          >
            <h3>+{transaction.amount}</h3>
          </div>
        ))}
      </Container>
    </>
  );
};
