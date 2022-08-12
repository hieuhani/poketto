import { AptosAccount, AptosClient, HexString, Types } from 'aptos';
import { useEffect, useRef, useState } from 'react';
import { useWallet } from './WalletContext';

export interface UseAccountResourcesOptions {
  refetchInterval?: number;
}
export const useAccountResources = (
  client: AptosClient,
  account: AptosAccount | null,
  { refetchInterval = undefined }: UseAccountResourcesOptions = {}
) => {
  const firstCalled = useRef(false);
  const [resources, setResources] = useState<Types.MoveResource[]>([]);
  const fetchResources = async (address: HexString) => {
    const data = await client.getAccountResources(address);
    setResources(data);
  };
  useEffect(() => {
    let intervalFetch: NodeJS.Timer | null = null;
    if (account) {
      if (refetchInterval) {
        if (!firstCalled.current) {
          firstCalled.current = true;
          fetchResources(account.address());
        }
        intervalFetch = setInterval(() => {
          fetchResources(account.address());
        }, refetchInterval);
      } else {
        fetchResources(account.address());
      }
    }
    return () => {
      if (refetchInterval && intervalFetch) {
        clearInterval(intervalFetch);
      }
    };
  }, [account, refetchInterval]);
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
