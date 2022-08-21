import * as bip39 from '@scure/bip39';
import * as english from '@scure/bip39/wordlists/english.js';

export const generateMnemonic = (): string => {
  return bip39.generateMnemonic(english.wordlist);
};

export const generateAccountSeed = (mnemonic: string): Uint8Array => {
  return new Uint8Array(bip39.mnemonicToSeedSync(mnemonic)).slice(0, 32);
};
