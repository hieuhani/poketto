import browser from 'webextension-polyfill';
import { WalletStorage } from '@poketto/core';
import { MessageMethod } from '../inpage/types';
import { MessageRequest } from './types';
import { ChromeLocalStorage } from '../storage/chromeLocalStorage';

const storage = new ChromeLocalStorage();
const walletStorage = new WalletStorage(storage);

browser.runtime.onInstalled.addListener((): void => {
  console.log('Extension installed');
});

browser.runtime.onMessage.addListener((request: MessageRequest, sender) => {
  switch (request.method) {
    case MessageMethod.CONNECT:
      return connect();
    default:
      throw new Error(`${request.method} method is not supported`);
  }
});

async function connect() {
  const walletAccounts = await walletStorage.readWalletAccounts();
  return walletAccounts;
}
