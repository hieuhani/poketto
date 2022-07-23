import { AptosAccount } from 'aptos';
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createContext } from 'react';
import { generateMnemonic } from '../mnemonic';
import { createAccount, loadAccount } from '../account';
import { readWallet, storeWallet } from './storage';

type WalletState =
  | 'pending:createNewAccount'
  | 'pending:loadAccount'
  | 'fulfilled:noAccount'
  | 'fulfilled:accountLoaded'
  | 'rejected:createNewAccount';

interface WalletContextState {
  account: AptosAccount | null;
  createNewAccount: (password: string) => void;
  state: WalletState;
}

const WalletContext = createContext<WalletContextState>({
  account: null,
  createNewAccount: (password: string) => {
    throw new Error('unimplemented');
  },
  state: 'pending:loadAccount',
});

export const WalletProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [stateAccount, setAccount] = useState<AptosAccount | null>(null);
  const [state, setState] = useState<WalletState>('pending:loadAccount');
  const loadWallet = async () => {
    const wallet = await readWallet();
    if (!wallet) {
      setState('fulfilled:noAccount');
    } else {
      const { encryptedMnemonic } = wallet;
      const account = await loadAccount('password', encryptedMnemonic);
      setAccount(account);
      setState('fulfilled:accountLoaded');
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const createNewAccount = async (password: string) => {
    try {
      setState('pending:createNewAccount');
      const mnemonic = generateMnemonic();
      const { account, encryptedMnemonic, encryptedPrivateKey } =
        await createAccount({ mnemonic, password });

      await storeWallet({
        encryptedMnemonic,
        encryptedPrivateKey,
      });
      // TODO: fund account here

      setAccount(account);
      setState('fulfilled:accountLoaded');
    } catch (e) {
      console.error(e);
      setState('rejected:createNewAccount');
    }
  };
  return (
    <WalletContext.Provider
      value={{
        account: stateAccount,
        state,
        createNewAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
