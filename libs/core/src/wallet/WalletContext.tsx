import { AptosAccount, AptosClient, FaucetClient, Types } from 'aptos';
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createContext } from 'react';
import { generateMnemonic } from '../mnemonic';
import { createAccount, loadAccount } from '../account';
import {
  addWalletAccount,
  defaultWalletPreference,
  deleteWallet,
  readWalletAccounts,
  readWalletPreference,
  WalletPreference,
  writeWalletAccounts,
} from './storage';
import { NetworkConfig, networkConfigs, NetworkProfile } from '../network';
import { useAccountResources } from './hooks';
import { Coin } from '../resource';
import { decrypt, encrypt } from '../password';

export interface SimulatedTransaction {
  success: boolean;
  gasUsed: number;
  vmStatus: string;
}
export type TransactionPayload = Types.TransactionPayload;
export type AccountResource = Types.MoveResource;
export type WalletState =
  | 'account:pending:createAccount'
  | 'account:pending:loadAccount'
  | 'account:fulfilled:noAccount'
  | 'account:fulfilled:activeAccount'
  | 'account:rejected:createAccount'
  | 'account:pending:faucetFundAccount'
  | 'account:fulfilled:faucetFundAccount'
  | 'account:rejected:faucetFundAccount'
  | 'account:pending:importAccount'
  | 'account:fulfilled:importAccount'
  | 'account:rejected:importAccount'
  | 'account:pending:logout'
  | 'account:fulfilled:logout'
  | 'account:rejected:logout'
  | 'account:pending:revealSeedPhrase'
  | 'account:fulfilled:revealSeedPhrase'
  | 'account:rejected:revealSeedPhrase'
  | 'account:pending:changePassword'
  | 'account:fulfilled:changePassword'
  | 'account:rejected:changePassword'
  | 'account:pending:createNewSiblingAccount'
  | 'account:fulfilled:createNewSiblingAccount'
  | 'account:rejected:createNewSiblingAccount'
  | 'account:pending:simulateTransaction'
  | 'account:fulfilled:simulateTransaction'
  | 'account:rejected:simulateTransaction'
  | 'account:pending:submitTransaction'
  | 'account:fulfilled:submitTransaction'
  | 'account:rejected:submitTransaction';

export interface WalletContextState {
  account: AptosAccount | null;
  accounts: AptosAccount[];
  state: WalletState;
  network: NetworkConfig;
  aptosClient: AptosClient;
  resources: Types.MoveResource[];
  coins: Coin[];
  oneTimeMnemonic: string | null;
  password: string;
  passwordError: string | null;
  walletPreference: WalletPreference;
  totalWalletAccount: number;
  changeDefaultAccountIndex: (index: number) => void;
  updatePassword: (password: string) => void;
  createNewAccount: (password: string) => Promise<void>;
  createNewSiblingAccount: () => Promise<string | undefined>;
  importAccount: (mnemonic: string, password: string) => Promise<void>;
  fundAccountWithFaucet: (amount: number) => void;
  submitTransaction: (
    payload: TransactionPayload,
    fromAccount?: AptosAccount
  ) => Promise<string>;
  simulateTransaction: (
    payload: TransactionPayload,
    fromAccount?: AptosAccount
  ) => Promise<SimulatedTransaction>;
  clearOneTimeMnemonic: () => void;
  logout: () => void;
  lockWallet: () => void;
  revealSeedPhrase: (password: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => void;
}

const WalletContext = createContext<WalletContextState>({
  account: null,
  accounts: [],
  state: 'account:pending:loadAccount',
  network: networkConfigs.devnet,
  aptosClient: new AptosClient(networkConfigs.devnet.aptos),
  resources: [],
  coins: [],
  password: '',
  passwordError: null,
  oneTimeMnemonic: null,
  walletPreference: defaultWalletPreference,
  totalWalletAccount: 0,
  changeDefaultAccountIndex: (index: number) => {
    throw new Error('unimplemented');
  },
  updatePassword: (password: string) => {
    throw new Error('unimplemented');
  },
  createNewSiblingAccount: () => {
    throw new Error('unimplemented');
  },
  createNewAccount: (password: string) => {
    throw new Error('unimplemented');
  },
  importAccount: (mnemonic: string, password: string) => {
    throw new Error('unimplemented');
  },
  fundAccountWithFaucet: (amount: number) => {
    throw new Error('unimplemented');
  },
  submitTransaction: (
    payload: Types.TransactionPayload,
    fromAccount?: AptosAccount
  ) => {
    throw new Error('unimplemented');
  },
  simulateTransaction: (
    payload: Types.TransactionPayload,
    fromAccount?: AptosAccount
  ) => {
    throw new Error('unimplemented');
  },
  clearOneTimeMnemonic: () => {
    throw new Error('unimplemented');
  },
  logout: () => {
    throw new Error('unimplemented');
  },
  lockWallet: () => {
    throw new Error('unimplemented');
  },
  revealSeedPhrase: (password: string) => {
    throw new Error('unimplemented');
  },
  changePassword: (currentPassword: string, newPassword: string) => {
    throw new Error('unimplemented');
  },
});

export const WalletProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<AptosAccount[]>([]);
  const [oneTimeMnemonic, setOneTimeMnemonic] = useState<string | null>(null);
  const [walletPreference, setWalletPreference] = useState<WalletPreference>(
    defaultWalletPreference
  );
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [state, setState] = useState<WalletState>(
    'account:pending:loadAccount'
  );
  const [networkProfile, _setNetworkProfile] =
    useState<NetworkProfile>('devnet');

  const network = useMemo(
    () => networkConfigs[networkProfile],
    [networkProfile]
  );

  const faucetClient = useMemo(() => {
    return new FaucetClient(network.aptos, network.faucet);
  }, [network]);

  const aptosClient = useMemo(() => {
    return new AptosClient(network.aptos);
  }, [network]);

  const stateAccount = accounts[walletPreference.defaultAccountIndex];

  const loadWallet = async (password: string) => {
    const walletAccounts = await readWalletAccounts();

    if (!walletAccounts || (walletAccounts && walletAccounts.length === 0)) {
      setState('account:fulfilled:noAccount');
    } else {
      if (password) {
        try {
          const accounts = await Promise.all(
            walletAccounts.map((account) =>
              loadAccount(password, account.mnemonic)
            )
          );
          setAccounts(accounts);
          setState('account:fulfilled:activeAccount');
        } catch (e: any) {
          setPassword('');
          setPasswordError(e.message);
        }
      }
    }
  };

  const { data: resources } = useAccountResources(aptosClient, stateAccount, {
    refetchInterval: 5000,
  });
  const coins = resources
    .filter((resource) => resource.type.startsWith('0x1::coin::CoinStore'))
    .map((resource) => {
      const segments = resource.type.split(':');
      const name = segments[segments.length - 1];
      return {
        name: name.substring(0, name.length - 1),
        balance: Number((resource.data as any).coin.value),
      };
    });

  useEffect(() => {
    loadWallet(password);
  }, [password]);

  useEffect(() => {
    const loadWalletPreference = async () => {
      const preference = await readWalletPreference();
      setWalletPreference(preference);
    };
    loadWalletPreference();
  }, []);

  const createNewAccount = async (password: string) => {
    try {
      setState('account:pending:createAccount');
      const mnemonic = generateMnemonic();
      const { account, encryptedMnemonic, encryptedPrivateKey } =
        await createAccount({ mnemonic, password });

      await addWalletAccount({
        mnemonic: encryptedMnemonic,
        privateKey: encryptedPrivateKey,
      });
      await faucetClient.fundAccount(account.address(), 0);
      setAccounts([...accounts, account]);
      setOneTimeMnemonic(mnemonic);
      setState('account:fulfilled:activeAccount');
    } catch (e) {
      console.error(e);
      setState('account:rejected:createAccount');
    }
  };

  const importAccount = async (mnemonic: string, password: string) => {
    try {
      setState('account:pending:importAccount');

      const { account, encryptedMnemonic, encryptedPrivateKey } =
        await createAccount({ mnemonic, password });

      // To test the imported account
      await aptosClient.getAccountResources(account.address());
      await addWalletAccount({
        mnemonic: encryptedMnemonic,
        privateKey: encryptedPrivateKey,
      });

      setAccounts([...accounts, account]);

      setState('account:fulfilled:importAccount');
    } catch (e) {
      console.error(e);
      setState('account:rejected:importAccount');
    }
  };

  const fundAccountWithFaucet = async (amount: number) => {
    if (stateAccount) {
      try {
        setState('account:pending:faucetFundAccount');
        await faucetClient.fundAccount(stateAccount.address(), amount);
        setState('account:fulfilled:faucetFundAccount');
      } catch (e) {
        console.error(e);
        setState('account:rejected:faucetFundAccount');
      }
    }
  };
  const clearOneTimeMnemonic = () => {
    setOneTimeMnemonic(null);
  };

  const submitTransaction = async (
    payload: Types.TransactionPayload,
    fromAccount?: AptosAccount
  ): Promise<string> => {
    const account = fromAccount || stateAccount;
    if (!account) {
      throw new Error('Undefined account');
    }
    try {
      setState('account:pending:submitTransaction');
      const txnRequest = await aptosClient.generateTransaction(
        account.address(),
        payload
      );

      const signedTxn = await aptosClient.signTransaction(account, txnRequest);
      const transactionRes = await aptosClient.submitTransaction(signedTxn);
      await aptosClient.waitForTransaction(transactionRes.hash);

      setState('account:fulfilled:submitTransaction');
      return transactionRes.hash;
    } catch (e) {
      setState('account:fulfilled:submitTransaction');
      throw e;
    }
  };

  const updatePassword = (password: string) => {
    setPasswordError(null);
    setPassword(password);
  };

  const logout = async () => {
    setState('account:pending:logout');
    await deleteWallet();
    setAccounts([]);
    setPassword('');
    setOneTimeMnemonic(null);
    setState('account:fulfilled:logout');
  };

  const lockWallet = async () => {
    setPassword('');
    setState('account:pending:loadAccount');
  };

  const revealSeedPhrase = async (password: string) => {
    setState('account:pending:revealSeedPhrase');
    const walletAccounts = await readWalletAccounts();

    const wallet = walletAccounts[walletPreference.defaultAccountIndex];
    if (wallet && wallet.mnemonic) {
      try {
        const mnemonic = await decrypt(password, wallet.mnemonic);
        setState('account:fulfilled:revealSeedPhrase');
        return mnemonic;
      } catch (e: unknown) {
        setState('account:rejected:revealSeedPhrase');
        throw e;
      }
    } else {
      setState('account:rejected:revealSeedPhrase');
      throw new Error('No wallet found');
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setState('account:pending:changePassword');
    const walletAccounts = await readWalletAccounts();
    if (walletAccounts.length > 0) {
      const updatedWalletAccounts = await Promise.all(
        walletAccounts.map(async (wallet) => {
          const mnemonic = await decrypt(currentPassword, wallet.mnemonic);
          const privateKey = await decrypt(currentPassword, wallet.privateKey);
          const encryptedMnemonic = await encrypt(newPassword, mnemonic);
          const encryptedPrivateKey = await encrypt(newPassword, privateKey);
          return {
            mnemonic: encryptedMnemonic,
            privateKey: encryptedPrivateKey,
          };
        })
      );

      await writeWalletAccounts(updatedWalletAccounts);
      setState('account:fulfilled:changePassword');
    } else {
      setState('account:rejected:changePassword');
      throw new Error('No wallet found');
    }
  };

  const createNewSiblingAccount = async () => {
    setState('account:pending:createNewSiblingAccount');
    try {
      const mnemonic = generateMnemonic();
      const { account, encryptedMnemonic, encryptedPrivateKey } =
        await createAccount({ mnemonic, password });

      await addWalletAccount({
        mnemonic: encryptedMnemonic,
        privateKey: encryptedPrivateKey,
      });
      await faucetClient.fundAccount(account.address(), 0);
      setAccounts([...accounts, account]);

      setState('account:fulfilled:createNewSiblingAccount');
      return mnemonic;
    } catch (e) {
      console.error(e);
      setState('account:rejected:createNewSiblingAccount');
    }
  };
  const changeDefaultAccountIndex = (index: number) => {
    setWalletPreference({
      ...walletPreference,
      defaultAccountIndex: index,
    });
  };

  const simulateTransaction = async (
    payload: TransactionPayload,
    fromAccount?: AptosAccount
  ) => {
    const account = fromAccount || stateAccount;
    if (!account) {
      throw new Error('Undefined account');
    }
    setState('account:pending:simulateTransaction');
    try {
      const txnRequest = await aptosClient.generateTransaction(
        account.address(),
        payload
      );

      const transactions = await aptosClient.simulateTransaction(
        account,
        txnRequest
      );
      if (transactions.length > 0) {
        setState('account:fulfilled:simulateTransaction');
        return {
          success: transactions[0].success,
          gasUsed: parseInt(transactions[0].gas_used, 10),
          vmStatus: transactions[0].vm_status,
        };
      }

      throw new Error('Invalid transaction');
    } catch (e) {
      setState('account:rejected:simulateTransaction');
      throw e;
    }
  };

  const totalWalletAccount = useMemo(() => accounts.length, [accounts]);

  return (
    <WalletContext.Provider
      value={{
        accounts,
        account: stateAccount,
        state,
        network,
        aptosClient,
        resources,
        coins,
        oneTimeMnemonic,
        password,
        passwordError,
        walletPreference,
        totalWalletAccount,
        changeDefaultAccountIndex,
        createNewSiblingAccount,
        updatePassword,
        createNewAccount,
        importAccount,
        fundAccountWithFaucet,
        simulateTransaction,
        submitTransaction,
        clearOneTimeMnemonic,
        logout,
        lockWallet,
        revealSeedPhrase,
        changePassword,
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
