import { WebLocalStorage } from '../storage';

const storage = new WebLocalStorage();
const WALLET_STORAGE_KEY = 'poketto';

interface WalletData {
  encryptedMnemonic: string;
  encryptedPrivateKey: string;
}

export const storeWallet = async (data: WalletData) => {
  await storage.save(WALLET_STORAGE_KEY, data);
};

export const readWallet = async (): Promise<WalletData | null> => {
  return storage.get<WalletData | null>(WALLET_STORAGE_KEY);
};

export const deleteWallet = async () => {
  await storage.remove(WALLET_STORAGE_KEY);
};
