import { resolve, dirname } from 'path';
import { bgCyan, black } from 'kolorist';
import { fileURLToPath } from 'url';

const _dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

export const port = parseInt(process.env.PORT || '') || 3303;
export const r = (...args: string[]) => resolve(_dirname, '..', ...args);
export const isDev = process.env.NODE_ENV !== 'production';

export function log(name: string, message: string) {
  // eslint-disable-next-line no-console
  console.log(black(bgCyan(` ${name} `)), message);
}
