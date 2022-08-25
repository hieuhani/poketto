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
      return connect(request, sender);
    default:
      throw new Error(`${request.method} method is not supported`);
  }
});

async function connect(
  request: MessageRequest,
  sender: browser.Runtime.MessageSender
) {
  const lastFocusedWindow = await browser.windows.getLastFocused();
  const params = new URLSearchParams();
  params.set('request', JSON.stringify(request));
  if (sender.url) {
    const url = new URL(sender.url);
    params.set('origin', url.origin);
  }

  if (sender.tab?.id) {
    params.set('tabId', sender.tab.id.toString());
  }

  console.log(params);
  await browser.windows.create({
    url: 'dist/src/popup/index.html?' + params,
    type: 'popup',
    width: 420,
    height: 600,
    left:
      lastFocusedWindow.left || 0 + ((lastFocusedWindow.width || 420) - 420),
    focused: true,
  });
  return [];
}
