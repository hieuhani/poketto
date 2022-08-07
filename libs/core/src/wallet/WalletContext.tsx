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
import { deleteWallet, readWallet, storeWallet } from './storage';
import { NetworkConfig, networkConfigs, NetworkProfile } from '../network';
import { useAccountResources } from './hooks';
import { Coin } from '../resource';
import { decrypt, encrypt } from '../password';

export type TransactionPayload = Types.TransactionPayload;
export type AccountResource = Types.AccountResource;
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
  | 'account:rejected:changePassword';

export interface WalletContextState {
  account: AptosAccount | null;
  state: WalletState;
  network: NetworkConfig;
  aptosClient: AptosClient;
  resources: Types.AccountResource[];
  coins: Coin[];
  oneTimeMnemonic: string | null;
  password: string;
  passwordError: string | null;
  updatePassword: (password: string) => void;
  createNewAccount: (password: string) => Promise<void>;
  importAccount: (mnemonic: string, password: string) => Promise<void>;
  fundAccountWithFaucet: (amount: number) => void;
  submitTransaction: (
    payload: TransactionPayload,
    fromAccount?: AptosAccount
  ) => Promise<string>;
  clearOneTimeMnemonic: () => void;
  logout: () => void;
  lockWallet: () => void;
  revealSeedPhrase: (password: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => void;
}

const WalletContext = createContext<WalletContextState>({
  account: null,
  state: 'account:pending:loadAccount',
  network: networkConfigs.devnet,
  aptosClient: new AptosClient(networkConfigs.devnet.aptos),
  resources: [],
  coins: [],
  password: '',
  passwordError: null,
  oneTimeMnemonic: null,
  updatePassword: (password: string) => {},
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
  const [stateAccount, setAccount] = useState<AptosAccount | null>(null);
  const [oneTimeMnemonic, setOneTimeMnemonic] = useState<string | null>(null);
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

  const loadWallet = async (password: string) => {
    const wallet = await readWallet();
    if (!wallet) {
      setState('account:fulfilled:noAccount');
    } else {
      if (password) {
        const { encryptedMnemonic } = wallet;
        try {
          const account = await loadAccount(password, encryptedMnemonic);
          setAccount(account);
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

  const createNewAccount = async (password: string) => {
    try {
      setState('account:pending:createAccount');
      const mnemonic = generateMnemonic();
      const { account, encryptedMnemonic, encryptedPrivateKey } =
        await createAccount({ mnemonic, password });

      await storeWallet({
        encryptedMnemonic,
        encryptedPrivateKey,
      });
      // TODO: please check why this is needed
      await faucetClient.fundAccount(account.address(), 0);

      setAccount(account);
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
      await storeWallet({
        encryptedMnemonic,
        encryptedPrivateKey,
      });

      setAccount(account);

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
    const txnRequest = await aptosClient.generateTransaction(
      account.address(),
      payload
    );

    const signedTxn = await aptosClient.signTransaction(account, txnRequest);
    const transactionRes = await aptosClient.submitTransaction(signedTxn);
    await aptosClient.waitForTransaction(transactionRes.hash);
    return transactionRes.hash;
  };

  const updatePassword = (password: string) => {
    setPasswordError(null);
    setPassword(password);
  };

  const logout = async () => {
    setState('account:pending:logout');
    await deleteWallet();
    setAccount(null);
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
    const wallet = await readWallet();
    if (wallet && wallet.encryptedMnemonic) {
      try {
        const mnemonic = await decrypt(password, wallet.encryptedMnemonic);
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
    const wallet = await readWallet();
    if (wallet && wallet.encryptedMnemonic && wallet.encryptedPrivateKey) {
      const mnemonic = await decrypt(currentPassword, wallet.encryptedMnemonic);
      const privateKey = await decrypt(
        currentPassword,
        wallet.encryptedPrivateKey
      );

      const encryptedMnemonic = await encrypt(newPassword, mnemonic);
      const encryptedPrivateKey = await encrypt(newPassword, privateKey);

      await storeWallet({
        encryptedMnemonic,
        encryptedPrivateKey,
      });
      setState('account:fulfilled:changePassword');
    } else {
      setState('account:rejected:changePassword');
      throw new Error('No wallet found');
    }
  };

  return (
    <WalletContext.Provider
      value={{
        account: stateAccount,
        state,
        network,
        aptosClient,
        resources,
        coins,
        oneTimeMnemonic,
        password,
        passwordError,
        updatePassword,
        createNewAccount,
        importAccount,
        fundAccountWithFaucet,
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
