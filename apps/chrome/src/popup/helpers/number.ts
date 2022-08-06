export const formatMoney = (amount: number) => {
  const balanceDesc = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  return balanceDesc.substring(1);
};
