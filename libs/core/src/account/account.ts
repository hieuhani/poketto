import { AptosAccount, AptosAccountObject, HexString } from 'aptos';
import { sign, SignKeyPair } from 'tweetnacl';
import { generateAccountSeed } from '../mnemonic';
import { decrypt, encrypt } from '../password';

export const WALLET_STATE_LOCAL_STORAGE_KEY = 'wallet';

export const generateKeyPair = (seed: Uint8Array): SignKeyPair => {
  return sign.keyPair.fromSeed(seed);
};

export interface NewAccountPayload {
  password: string;
  mnemonic: string;
}
export interface NewAccount {
  account: AptosAccount;
  encryptedMnemonic: string;
  encryptedPrivateKey: string;
}
export async function createAccount({
  password,
  mnemonic,
}: NewAccountPayload): Promise<NewAccount> {
  const seed = generateAccountSeed(mnemonic);
  const keypair = sign.keyPair.fromSeed(seed);

  const secretKey = keypair.secretKey;
  const secretKeyHex64 = Buffer.from(secretKey).toString('hex').slice(0, 64);
  // TODO: update type definition
  const address = (keypair.publicKey as any).Hex;
  const account = new AptosAccount(secretKey, address);
  const encryptedMnemonic = await encrypt(password, mnemonic);
  const encryptedPrivateKey = await encrypt(password, secretKeyHex64);

  return { account, encryptedMnemonic, encryptedPrivateKey };
}

export async function loadAccount(password: string, encryptedMnemonic: string) {
  const mnemonic = await decrypt<string>(password, encryptedMnemonic);
  const seed = generateAccountSeed(mnemonic);
  const keypair = sign.keyPair.fromSeed(seed);

  // TODO: update type definition
  const address = (keypair.publicKey as any).Hex;
  return AptosAccount.fromAptosAccountObject({
    address,
    privateKeyHex: HexString.fromUint8Array(
      keypair.secretKey.slice(0, 32)
    ).toShortString(),
  });
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
