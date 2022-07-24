import { AptosAccount, AptosClient, HexString, Types } from 'aptos';
import { useEffect, useState } from 'react';

export const useAccountResources = (
  client: AptosClient,
  account: AptosAccount | null
) => {
  const [resources, setResources] = useState<Types.AccountResource[]>([]);
  const fetchResources = async (address: HexString) => {
    const data = await client.getAccountResources(address);
    setResources(data);
  };
  useEffect(() => {
    if (account) {
      fetchResources(account.address());
    }
  }, [account]);
  return {
    data: resources,
  };
};
