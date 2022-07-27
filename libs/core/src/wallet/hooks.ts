import { AptosAccount, AptosClient, HexString, Types } from 'aptos';
import { useEffect, useState } from 'react';
import { useWallet } from './WalletContext';

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

export type CheckAddressStatus = 'initial' | 'checking' | 'valid' | 'invalid';
export const useCheckAddress = () => {
  const { aptosClient } = useWallet();
  const [status, setStatus] = useState<CheckAddressStatus>('initial');
  const check = async (address: string): Promise<string> => {
    if (!address) {
      setStatus('initial');
      return 'initial';
    }
    setStatus('checking');
    try {
      const account = await aptosClient.getAccount(address);
      const accountStatus = !!account ? 'valid' : 'invalid';
      setStatus(accountStatus);
      return accountStatus;
    } catch (e: unknown) {
      console.error(e);
      setStatus('invalid');
      return 'invalid';
    }
  };
  return { check, status };
};
