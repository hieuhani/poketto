import { WebLocalStorage } from '../storage';

const storage = new WebLocalStorage();

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
export const writeWalletAccounts = async (data: WalletAccount[]) => {
  await storage.save(WALLET_ACCOUNTS_STORAGE_KEY, data);
};

export const addWalletAccount = async (data: WalletAccount) => {
  const accounts = await readWalletAccounts();
  accounts.push(data);
  await writeWalletAccounts(accounts);
};

export const readWalletAccounts = async (): Promise<WalletAccount[]> => {
  const wallet = await storage.get<WalletAccount[] | null>(
    WALLET_ACCOUNTS_STORAGE_KEY
  );
  return wallet || [];
};

export const readWalletPreference = async (): Promise<WalletPreference> => {
  const preference = await storage.get<WalletPreference | null>(
    WALLET_PREFERENCE_STORAGE_KEY
  );
  return preference || defaultWalletPreference;
};

export const deleteWallet = async () => {
  await Promise.all(
    [WALLET_ACCOUNTS_STORAGE_KEY, WALLET_PREFERENCE_STORAGE_KEY].map((key) =>
      storage.remove(key)
    )
  );
};
