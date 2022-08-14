import { Storage } from '../storage';

const WALLET_ACCOUNTS_STORAGE_KEY = 'accounts';
const WALLET_PREFERENCE_STORAGE_KEY = 'preference';

export interface WalletAccount {
  mnemonic: string;
  privateKey: string;
}

export interface WalletPreference {
  defaultAccountIndex: number;
}

export const defaultWalletPreference: WalletPreference = {
  defaultAccountIndex: 0,
};

export class WalletStorage {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }
  writeWalletAccounts = async (data: WalletAccount[]) => {
    await this.storage.save(WALLET_ACCOUNTS_STORAGE_KEY, data);
  };

  addWalletAccount = async (data: WalletAccount) => {
    const accounts = await this.readWalletAccounts();
    accounts.push(data);
    await this.writeWalletAccounts(accounts);
  };
  readWalletAccounts = async (): Promise<WalletAccount[]> => {
    const wallet = await this.storage.get<WalletAccount[] | null>(
      WALLET_ACCOUNTS_STORAGE_KEY
    );
    return wallet || [];
  };
  readWalletPreference = async (): Promise<WalletPreference> => {
    const preference = await this.storage.get<WalletPreference | null>(
      WALLET_PREFERENCE_STORAGE_KEY
    );
    return preference || defaultWalletPreference;
  };

  deleteWallet = async () => {
    await Promise.all(
      [WALLET_ACCOUNTS_STORAGE_KEY, WALLET_PREFERENCE_STORAGE_KEY].map((key) =>
        this.storage.remove(key)
      )
    );
  };
}
