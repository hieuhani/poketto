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
import { readWallet, storeWallet } from './storage';
import { NetworkConfig, networkConfigs, NetworkProfile } from '../network';
import { useAccountResources } from './hooks';
import { Coin } from '../resource';

type WalletState =
  | 'account:pending:createAccount'
  | 'account:pending:loadAccount'
  | 'account:fulfilled:noAccount'
  | 'account:fulfilled:activeAccount'
  | 'account:rejected:createAccount';

interface WalletContextState {
  account: AptosAccount | null;
  state: WalletState;
  network: NetworkConfig;
  aptosClient: AptosClient;
  resources: Types.AccountResource[];
  coins: Coin[];
  createNewAccount: (password: string) => void;
}

const WalletContext = createContext<WalletContextState>({
  account: null,
  state: 'account:pending:loadAccount',
  network: networkConfigs.devnet,
  aptosClient: new AptosClient(networkConfigs.devnet.aptos),
  resources: [],
  coins: [],
  createNewAccount: (password: string) => {
    throw new Error('unimplemented');
  },
});

export const WalletProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [stateAccount, setAccount] = useState<AptosAccount | null>(null);
  // const [password, setPassword] = useState('');
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

  const loadWallet = async () => {
    const wallet = await readWallet();
    if (!wallet) {
      setState('account:fulfilled:noAccount');
    } else {
      const { encryptedMnemonic } = wallet;
      const account = await loadAccount('password', encryptedMnemonic);
      setAccount(account);
      setState('account:fulfilled:activeAccount');
    }
  };

  const { data: resources } = useAccountResources(aptosClient, stateAccount);
  const coins = resources
    .filter((resource) => resource.type.startsWith('0x1::coin::CoinStore'))
    .map((resource) => {
      const segments = resource.type.split(':');
      const name = segments[segments.length - 1];
      return {
        name: name.substring(0, name.length - 1),
        balance: Number(resource.data.coin.value),
      };
    });

  useEffect(() => {
    loadWallet();
  }, []);

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
      setState('account:fulfilled:activeAccount');
    } catch (e) {
      console.error(e);
      setState('account:rejected:createAccount');
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
