export const makeShortAddress = (address: string, partialLength = 6): string =>
  `${address.slice(0, partialLength)}...${address.slice(
    address.length - partialLength
  )}`;
