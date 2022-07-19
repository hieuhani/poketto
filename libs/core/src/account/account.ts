import { AptosAccount, AptosAccountObject } from 'aptos';

export const WALLET_STATE_LOCAL_STORAGE_KEY = 'wallet';

export function createNewAccount(): AptosAccount {
  const account = new AptosAccount();
  // todo: make request to create account on chain
  return account;
}

interface ApptosLocalStorageState {
  account: AptosAccountObject;
}

export function getStorageWallet(): ApptosLocalStorageState | null {
  const item = window.localStorage.getItem(WALLET_STATE_LOCAL_STORAGE_KEY);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export function saveStorageWallet(data: ApptosLocalStorageState) {
  window.localStorage.setItem(
    WALLET_STATE_LOCAL_STORAGE_KEY,
    JSON.stringify(data)
  );
}

export function getAccountFromStorage(): AptosAccount | null {
  const storage = getStorageWallet();
  if (storage) {
    return AptosAccount.fromAptosAccountObject(storage.account);
  }
  return null;
}
