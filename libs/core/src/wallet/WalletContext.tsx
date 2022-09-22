import { AptosAccount, AptosClient, TokenClient, Types } from 'aptos';
import { useContext } from 'react';
import { createContext } from 'react';
import { defaultWalletPreference, WalletPreference } from './storage';
import { NetworkConfig, networkConfigs } from '../network';
import { Coin } from '../resource';
import {
  CreateCollectionPayload,
  CreateTokenPayload,
  SimulatedTransaction,
  TokenCollection,
  WalletState,
} from './types';
import { Token } from './hooks/use-get-tokens';

export interface WalletContextState {
  account: AptosAccount | null;
  accounts: AptosAccount[];
  state: WalletState;
  network: NetworkConfig;
  aptosClient: AptosClient;
  tokenClient: TokenClient;
  resources: Types.MoveResource[];
  coins: Coin[];
  oneTimeMnemonic: string | null;
  password: string;
  passwordError: string | null;
  walletPreference: WalletPreference;
  totalWalletAccount: number;
  currentAccountTrustedOrigins: string[];
  accountTrustedOrigins: Record<string, string[]>;
  token: {
    tokenCollectionsResource: Types.MoveResource | undefined;
    tokenCollections: TokenCollection[];
    tokens: Token[];
    fetchTokenCollections: () => void;
    fetchTokens: () => void;
  };
  changeDefaultAccountIndex: (index: number) => void;
  updatePassword: (password: string) => void;
  createNewAccount: (password: string) => Promise<void>;
  createNewSiblingAccount: () => Promise<string | undefined>;
  importAccount: (mnemonic: string, password: string) => Promise<void>;
  fundAccountWithFaucet: (amount: number) => void;
  submitTransaction: (
    payload: Types.EntryFunctionPayload,
    fromAccount?: AptosAccount
  ) => Promise<string>;
  simulateTransaction: (
    payload: Types.EntryFunctionPayload,
    fromAccount?: AptosAccount
  ) => Promise<SimulatedTransaction>;
  clearOneTimeMnemonic: () => void;
  logout: () => void;
  lockWallet: () => void;
  revealSeedPhrase: (password: string) => Promise<string>;
  revealPrivateKey: (password: string) => Promise<string>;
  changePassword: (currentPassword: string, newPassword: string) => void;
  addTrustedOrigin: (address: string, origin: string) => void;
  removeTrustedOrigin: (
    origin: string,
    fromAccount?: AptosAccount
  ) => Promise<void>;
  createCollection: (
    payload: CreateCollectionPayload,
    fromAccount?: AptosAccount
  ) => Promise<string>;
  createToken: (
    payload: CreateTokenPayload,
    fromAccount?: AptosAccount
  ) => Promise<string>;
}

const aptosClient = new AptosClient(networkConfigs.devnet.aptos);
export const WalletContext = createContext<WalletContextState>({
  account: null,
  accounts: [],
  state: 'account:pending:loadAccount',
  network: networkConfigs.devnet,
  aptosClient,
  tokenClient: new TokenClient(aptosClient),
  resources: [],
  coins: [],
  password: '',
  passwordError: null,
  oneTimeMnemonic: null,
  walletPreference: defaultWalletPreference,
  totalWalletAccount: 0,
  currentAccountTrustedOrigins: [],
  accountTrustedOrigins: {},
  token: {
    tokenCollectionsResource: undefined,
    tokenCollections: [],
    tokens: [],
    fetchTokenCollections: () => {
      throw new Error('unimplemented');
    },
    fetchTokens: () => {
      throw new Error('unimplemented');
    },
  },

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
    payload: Types.EntryFunctionPayload,
    fromAccount?: AptosAccount
  ) => {
    throw new Error('unimplemented');
  },
  simulateTransaction: (
    payload: Types.EntryFunctionPayload,
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
  revealPrivateKey: (password: string) => {
    throw new Error('unimplemented');
  },
  changePassword: (currentPassword: string, newPassword: string) => {
    throw new Error('unimplemented');
  },
  addTrustedOrigin: (address: string, origin: string) => {
    throw new Error('unimplemented');
  },
  removeTrustedOrigin: (origin: string, fromAccount?: AptosAccount) => {
    throw new Error('unimplemented');
  },
  createCollection: (
    payload: CreateCollectionPayload,
    fromAccount?: AptosAccount
  ) => {
    throw new Error('unimplemented');
  },
  createToken: (payload: CreateTokenPayload, fromAccount?: AptosAccount) => {
    throw new Error('unimplemented');
  },
});

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
