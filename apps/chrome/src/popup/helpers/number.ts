export const formatMoney = (amount: number) => {
  const balanceDesc = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  return balanceDesc.substring(1);
};

export const formatBalance = (balance: bigint) => {
  // Martian implementation
  //   return (balance / Math.pow(10, 8)).toLocaleString('en-US', {
  //     maximumFractionDigits: 8,
  //   });
  const balanceStr = balance.toString();

  if (balanceStr === '0') {
    return '0';
  }

  const balanceLength = balanceStr.length;
  if (balanceLength <= 8) {
    return '0.' + '0'.repeat(8 - balanceLength) + balanceStr;
  }

  const wholeNumber = BigInt(
    balanceStr.slice(0, balanceLength - 8)
  ).toLocaleString('en-US');
  let decimalPart = balanceStr.slice(balanceLength - 8);
  if (BigInt(decimalPart) == BigInt(0)) return wholeNumber;
  for (; decimalPart.endsWith('0'); ) decimalPart = decimalPart.slice(0, -1);
  return wholeNumber + '.' + decimalPart;
};
