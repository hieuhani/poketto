export const makeShortAddress = (
  address: string,
  takeLeft = 4,
  takeRight = 4
): string =>
  `${address.slice(0, takeLeft)}...${address.slice(
    address.length - takeRight
  )}`;
