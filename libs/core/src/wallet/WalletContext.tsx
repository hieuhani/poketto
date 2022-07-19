import { AptosAccount } from 'aptos';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { createContext } from 'react';
import { getAccountFromStorage, saveStorageWallet } from '..';

interface WalletContextState {
  account: AptosAccount | null;
  updateAccount: (account: AptosAccount) => void;
}
const WalletContext = createContext<WalletContextState>({
  account: null,
  updateAccount: (account: AptosAccount) => {
    throw new Error('unimplemented');
  },
});

export const WalletProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [stateAccount, setAccount] = useState<AptosAccount | null>(() =>
    getAccountFromStorage()
  );

  const updateAccount = (account: AptosAccount) => {
    setAccount(account);
    saveStorageWallet({ account: account.toPrivateKeyObject() });
  };
  return (
    <WalletContext.Provider
      value={{
        account: stateAccount,
        updateAccount,
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
