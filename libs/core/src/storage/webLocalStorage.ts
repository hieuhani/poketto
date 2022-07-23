import { Storage } from './storage';

export class WebLocalStorage implements Storage {
  async get<T>(key: string): Promise<T | null> {
    const item = await Promise.resolve(window.localStorage.getItem(key));
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }
  async save<T>(key: string, data: T): Promise<void> {
    await Promise.resolve(
      window.localStorage.setItem(key, JSON.stringify(data))
    );
  }
}
