import { Storage } from '@poketto/core';

export class ChromeSessionStorage implements Storage {
  async get<T>(key: string): Promise<T | null> {
    const item = await chrome.storage.session.get(key);
    return item[key];
  }
  async save<T>(key: string, data: T): Promise<void> {
    await chrome.storage.session.set({ [key]: data });
  }
  async remove(key: string): Promise<void> {
    await chrome.storage.session.remove(key);
  }
}
