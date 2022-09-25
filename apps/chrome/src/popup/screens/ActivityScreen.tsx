import { Transaction, useWallet } from '@poketto/core';

import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';
import { useEffect } from 'react';
import { TransactionRow } from '../components/TransactionRow';
import { formatDate } from '../helpers/date';

export const ActivityScreen: React.FunctionComponent = () => {
  const { transactions, fetchTransactions } = useWallet();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const byDayTransactions = transactions.reduce((prev, current) => {
    const date = current.createdAt.toISOString().split('T')[0];
    return {
      ...prev,
      [date]: [...(prev[date] || []), current],
    };
  }, {} as Record<string, Transaction[]>);
  const days = Object.keys(byDayTransactions).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <>
      <TitleHeader title="Activities" />
      <Container className="space-y-3">
        {days.length === 0 && <p>No transaction</p>}
        {days.map((day) => (
          <div key={day}>
            <h3 className="mb-3 text-center font-medium">
              {formatDate(new Date(day), {
                timeStyle: undefined,
              })}
            </h3>
            <div className="space-y-3">
              {byDayTransactions[day].map((transaction) => (
                <TransactionRow
                  key={transaction.version}
                  transaction={transaction}
                />
              ))}
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};
