import { Storage } from '../storage';

const WALLET_ACCOUNTS_STORAGE_KEY = 'accounts';
const WALLET_PREFERENCE_STORAGE_KEY = 'preference';
const WALLET_TRUSTED_ORIGINS_KEY = 'origins';

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
      [
        WALLET_ACCOUNTS_STORAGE_KEY,
        WALLET_PREFERENCE_STORAGE_KEY,
        WALLET_TRUSTED_ORIGINS_KEY,
      ].map((key) => this.storage.remove(key))
    );
  };

  getAccountTrustedOrigins = async (): Promise<Record<string, string[]>> => {
    const trustedOrigins = await this.storage.get<Record<string, string[]>>(
      WALLET_TRUSTED_ORIGINS_KEY
    );
    return trustedOrigins || {};
  };

  addTrustedOriginToAccount = async (
    address: string,
    origin: string
  ): Promise<Record<string, string[]>> => {
    const origins = await this.getAccountTrustedOrigins();

    if (origins[address]) {
      const originSet = new Set(origins[address]);
      originSet.add(origin);
      origins[address] = Array.from(originSet);
    } else {
      origins[address] = [origin];
    }

    await this.storage.save(WALLET_TRUSTED_ORIGINS_KEY, origins);
    return origins;
  };

  removeTrustedOriginFromAccount = async (address: string, origin: string) => {
    const origins = await this.getAccountTrustedOrigins();
    if (origins[address]) {
      const originSet = new Set(origins[address]);
      originSet.delete(origin);
      origins[address] = Array.from(originSet);
      await this.storage.save(WALLET_TRUSTED_ORIGINS_KEY, origins);
    }
  };
}
