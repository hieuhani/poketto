export interface Storage {
  get<T>(key: string): Promise<T | null>;
  save<T>(key: string, data: T): Promise<void>;
}
