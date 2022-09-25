import {
  AptosAccount,
  AptosClient,
  FaucetClient,
  TokenClient,
  Types,
} from 'aptos';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { generateMnemonic } from '../mnemonic';
import { createAccount, loadAccount } from '../account';
import { Storage } from '../storage';
import {
  defaultWalletPreference,
  WalletPreference,
  WalletStorage,
} from './storage';
import { networkConfigs, NetworkProfile } from '../network';
import { useAccountResources } from './hooks';
import { decrypt, encrypt } from '../password';
import {
  CreateCollectionPayload,
  CreateTokenPayload,
  WalletState,
} from './types';
import { WalletContext } from './WalletContext';
import { useGetTokenCollections } from './hooks/use-get-token-collections';
import { useGetTokens } from './hooks/use-get-tokens';
import { useGetTransactions } from './hooks/use-get-transactions';

interface Props extends PropsWithChildren {
  storage: Storage;
  sessionStorage?: Storage;
}
export const WalletProvider: React.FunctionComponent<Props> = ({
  children,
  storage,
  sessionStorage,
}) => {
  const walletStorage = useMemo(() => new WalletStorage(storage), [storage]);
  const [accounts, setAccounts] = useState<AptosAccount[]>([]);
  const [accountTrustedOrigins, setAccountTrustedOrigins] = useState<
    Record<string, string[]>
  >({});
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

  const tokenClient = useMemo(() => {
    return new TokenClient(aptosClient);
  }, [aptosClient]);

  const stateAccount = accounts[walletPreference.defaultAccountIndex];
  const currentAccountTrustedOrigins = useMemo(() => {
    if (!stateAccount) {
      return [];
    }
    return accountTrustedOrigins[stateAccount.address().toShortString()] || [];
  }, [stateAccount, accountTrustedOrigins]);

  const loadWallet = async (password: string) => {
    const walletAccounts = await walletStorage.readWalletAccounts();

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

  const { data: resources, refetch } = useAccountResources(
    aptosClient,
    stateAccount,
    {
      refetchInterval: 5000,
    }
  );

  const coins = useMemo(
    () =>
      resources
        .filter((resource) => resource.type.startsWith('0x1::coin::CoinStore'))
        .map((resource) => {
          const segments = resource.type.split(':');
          const name = segments[segments.length - 1];
          return {
            name: name.substring(0, name.length - 1),
            balance: BigInt((resource.data as any).coin.value),
          };
        }),
    [resources]
  );

  useEffect(() => {
    loadWallet(password);
  }, [password]);

  useEffect(() => {
    const loadWalletPreference = async () => {
      const preference = await walletStorage.readWalletPreference();
      setWalletPreference(preference);
    };

    const loadAccountTrustedOrigins = async () => {
      const origins = await walletStorage.getAccountTrustedOrigins();
      setAccountTrustedOrigins(origins);
    };
    loadWalletPreference();
    loadAccountTrustedOrigins();
  }, []);
  useEffect(() => {
    const loadPassword = async () => {
      if (sessionStorage) {
        const savedPassword = await sessionStorage.get<string>('password');
        if (savedPassword) {
          setPassword(savedPassword);
        }
      }
    };
    if (!password) {
      loadPassword();
    }
  }, [sessionStorage, password]);

  const createNewAccount = useCallback(
    async (password: string) => {
      try {
        setState('account:pending:createAccount');
        const mnemonic = generateMnemonic();
        const { account, encryptedMnemonic, encryptedPrivateKey } =
          await createAccount({ mnemonic, password });

        await walletStorage.addWalletAccount({
          mnemonic: encryptedMnemonic,
          privateKey: encryptedPrivateKey,
        });
        await faucetClient.fundAccount(account.address(), 0);
        setAccounts([...accounts, account]);
        setOneTimeMnemonic(mnemonic);
        setState('account:fulfilled:activeAccount');
        setPassword(password);
        if (sessionStorage) {
          await sessionStorage.save('password', password);
        }
      } catch (e) {
        console.error(e);
        setState('account:rejected:createAccount');
      }
    },
    [walletStorage, faucetClient, sessionStorage, accounts]
  );

  const importAccount = useCallback(
    async (mnemonic: string, password: string) => {
      try {
        setState('account:pending:importAccount');

        const { account, encryptedMnemonic, encryptedPrivateKey } =
          await createAccount({ mnemonic, password });

        // To test the imported account
        await aptosClient.getAccountResources(account.address());
        await walletStorage.addWalletAccount({
          mnemonic: encryptedMnemonic,
          privateKey: encryptedPrivateKey,
        });

        setAccounts([...accounts, account]);

        setState('account:fulfilled:importAccount');
      } catch (e) {
        console.error(e);
        setState('account:rejected:importAccount');
      }
    },
    [aptosClient, walletStorage, accounts]
  );

  const fundAccountWithFaucet = useCallback(
    async (amount: number) => {
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
    },
    [stateAccount, faucetClient]
  );
  const clearOneTimeMnemonic = useCallback(() => {
    setOneTimeMnemonic(null);
  }, []);

  const submitTransaction = useCallback(
    async (
      payload: Types.EntryFunctionPayload,
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

        const signedTxn = await aptosClient.signTransaction(
          account,
          txnRequest
        );
        const transactionRes = await aptosClient.submitTransaction(signedTxn);
        await aptosClient.waitForTransaction(transactionRes.hash);

        setState('account:fulfilled:submitTransaction');
        return transactionRes.hash;
      } catch (e) {
        setState('account:fulfilled:submitTransaction');
        throw e;
      }
    },
    [stateAccount, aptosClient]
  );

  const updatePassword = useCallback(async (password: string) => {
    setPasswordError(null);
    setPassword(password);
    if (sessionStorage) {
      await sessionStorage.save('password', password);
    }
  }, []);

  const logout = useCallback(async () => {
    setState('account:pending:logout');
    await walletStorage.deleteWallet();
    setAccounts([]);
    setPassword('');
    setOneTimeMnemonic(null);

    if (sessionStorage) {
      sessionStorage.remove('password');
    }
    setState('account:fulfilled:logout');
  }, [walletStorage, sessionStorage]);

  const lockWallet = useCallback(async () => {
    setPassword('');
    setState('account:pending:loadAccount');
    if (sessionStorage) {
      sessionStorage.remove('password');
    }
  }, [sessionStorage]);

  const revealSeedPhrase = useCallback(
    async (password: string): Promise<string> => {
      setState('account:pending:revealSeedPhrase');
      const walletAccounts = await walletStorage.readWalletAccounts();

      const wallet = walletAccounts[walletPreference.defaultAccountIndex];
      if (wallet && wallet.mnemonic) {
        try {
          const mnemonic = await decrypt<string>(password, wallet.mnemonic);
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
    },
    [walletStorage, walletPreference]
  );
  const revealPrivateKey = useCallback(
    async (password: string): Promise<string> => {
      setState('account:pending:revealPrivateKey');
      const walletAccounts = await walletStorage.readWalletAccounts();

      const wallet = walletAccounts[walletPreference.defaultAccountIndex];
      if (wallet && wallet.privateKey) {
        try {
          const privateKey = await decrypt<string>(password, wallet.privateKey);
          setState('account:fulfilled:revealPrivateKey');
          return privateKey;
        } catch (e: unknown) {
          setState('account:rejected:revealPrivateKey');
          throw e;
        }
      } else {
        setState('account:rejected:revealPrivateKey');
        throw new Error('No wallet found');
      }
    },
    [walletStorage, walletPreference]
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      setState('account:pending:changePassword');
      const walletAccounts = await walletStorage.readWalletAccounts();
      if (walletAccounts.length > 0) {
        const updatedWalletAccounts = await Promise.all(
          walletAccounts.map(async (wallet) => {
            const mnemonic = await decrypt(currentPassword, wallet.mnemonic);
            const privateKey = await decrypt(
              currentPassword,
              wallet.privateKey
            );
            const encryptedMnemonic = await encrypt(newPassword, mnemonic);
            const encryptedPrivateKey = await encrypt(newPassword, privateKey);
            return {
              mnemonic: encryptedMnemonic,
              privateKey: encryptedPrivateKey,
            };
          })
        );

        await walletStorage.writeWalletAccounts(updatedWalletAccounts);
        setState('account:fulfilled:changePassword');
      } else {
        setState('account:rejected:changePassword');
        throw new Error('No wallet found');
      }
    },
    [walletStorage]
  );

  const createNewSiblingAccount = useCallback(async () => {
    setState('account:pending:createNewSiblingAccount');
    try {
      const mnemonic = generateMnemonic();
      const { account, encryptedMnemonic, encryptedPrivateKey } =
        await createAccount({ mnemonic, password });

      await walletStorage.addWalletAccount({
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
  }, [walletStorage, faucetClient, accounts]);

  const changeDefaultAccountIndex = useCallback(
    (index: number) => {
      setWalletPreference({
        ...walletPreference,
        defaultAccountIndex: index,
      });

      refetch();
    },
    [walletPreference]
  );

  const simulateTransaction = useCallback(
    async (payload: Types.EntryFunctionPayload, fromAccount?: AptosAccount) => {
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
    },
    [stateAccount, aptosClient]
  );

  const totalWalletAccount = useMemo(() => accounts.length, [accounts]);

  const addTrustedOrigin = useCallback(
    async (address: string, origin: string) => {
      setState('account:pending:addTrustedOrigin');
      const origins = await walletStorage.addTrustedOriginToAccount(
        address,
        origin
      );
      setAccountTrustedOrigins(origins);
      setState('account:fulfilled:addTrustedOrigin');
    },
    [walletStorage]
  );

  const removeTrustedOrigin = useCallback(
    async (origin: string, fromAccount?: AptosAccount) => {
      const account = fromAccount || stateAccount;
      if (!account) {
        throw new Error('Undefined account');
      }
      const updatedOrigins = await walletStorage.removeTrustedOriginFromAccount(
        account.address().toShortString(),
        origin
      );
      setAccountTrustedOrigins(updatedOrigins);
    },
    [stateAccount, walletStorage]
  );

  const createToken = useCallback(
    async (payload: CreateTokenPayload, fromAccount?: AptosAccount) => {
      const account = fromAccount || stateAccount;
      if (!account) {
        throw new Error('Undefined account');
      }

      const hash = await tokenClient.createToken(
        account,
        payload.collectionName,
        payload.name,
        payload.description,
        payload.supply,
        payload.uri
      );

      await aptosClient.waitForTransaction(hash);
      return hash;
    },
    [stateAccount, tokenClient, aptosClient]
  );

  const createCollection = useCallback(
    async (payload: CreateCollectionPayload, fromAccount?: AptosAccount) => {
      const account = fromAccount || stateAccount;
      if (!account) {
        throw new Error('Undefined account');
      }

      const hash = await tokenClient.createCollection(
        account,
        payload.name,
        payload.description,
        payload.uri,
        payload.maxAmount
      );

      await aptosClient.waitForTransaction(hash);
      return hash;
    },
    [stateAccount, tokenClient, aptosClient]
  );

  const tokenCollectionsResource = resources.find((resource) =>
    resource.type.startsWith('0x3::token::Collections')
  );

  const tokenResource = resources.find((resource) =>
    resource.type.startsWith('0x3::token::TokenStore')
  );

  const { tokenCollections, fetchTokenCollections } = useGetTokenCollections(
    aptosClient,
    stateAccount?.address().toShortString(),
    tokenCollectionsResource
  );

  const { fetchTokens, tokens } = useGetTokens(
    aptosClient,
    stateAccount?.address().toShortString(),
    tokenResource
  );

  const { transactions, fetchTransactions } = useGetTransactions(
    aptosClient,
    resources,
    stateAccount?.address().toShortString()
  );

  return (
    <WalletContext.Provider
      value={{
        accounts,
        account: stateAccount,
        state,
        network,
        aptosClient,
        tokenClient,
        resources,
        coins,
        oneTimeMnemonic,
        password,
        passwordError,
        walletPreference,
        totalWalletAccount,
        currentAccountTrustedOrigins,
        accountTrustedOrigins,
        transactions,
        tokenCollectionsResource,
        tokenCollections,
        tokens,
        fetchTokenCollections,
        fetchTokens,
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
        revealPrivateKey,
        changePassword,
        addTrustedOrigin,
        removeTrustedOrigin,
        createToken,
        createCollection,
        fetchTransactions,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
