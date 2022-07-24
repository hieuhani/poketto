export const makeShortAddress = (address: string): string =>
  `${address.slice(0, 6)}...${address.slice(address.length - 6)}`;
