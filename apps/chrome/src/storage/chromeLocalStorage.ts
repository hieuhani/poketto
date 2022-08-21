import { Storage } from '@poketto/core';
import browser from 'webextension-polyfill';

export class ChromeLocalStorage implements Storage {
  async get<T>(key: string): Promise<T | null> {
    const item = await browser.storage.local.get(key);
    return item[key];
  }
  async save<T>(key: string, data: T): Promise<void> {
    await browser.storage.local.set({ [key]: data });
  }
  async remove(key: string): Promise<void> {
    await browser.storage.local.remove(key);
  }
}
