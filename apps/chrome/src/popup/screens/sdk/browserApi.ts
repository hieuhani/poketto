import { Browser } from 'webextension-polyfill';

let browser: Browser | undefined = undefined;

export const getBrowserApi = async (): Promise<Browser> => {
  if (window.location.protocol !== 'chrome-extension:') {
    return new Proxy({} as Browser, {
      get: (target, prop) => {
        throw new Error('run only on browser extension mode');
      },
    });
  }
  if (!browser) {
    browser = (await import('webextension-polyfill')).default;
  }
  return browser;
};
