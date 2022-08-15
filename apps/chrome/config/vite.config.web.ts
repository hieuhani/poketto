import { defineConfig } from 'vite';
import { isDev } from '../scripts/utils';
import { basePlugins, sharedConfig } from './base';

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  plugins: basePlugins,
  build: {
    target: ['esnext'],
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
  },
}));
