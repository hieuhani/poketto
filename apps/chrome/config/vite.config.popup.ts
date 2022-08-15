import { defineConfig } from 'vite';
import { r, isDev } from '../scripts/utils';
import { extensionPlugins, sharedConfig } from './base';

export default defineConfig({
  ...sharedConfig,
  base: '/dist/',
  plugins: extensionPlugins,
  build: {
    target: ['esnext'],
    sourcemap: isDev ? 'inline' : false,
    outDir: r('extension/dist'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: r('src/popup/index.html'),
      },
    },
    terserOptions: {
      mangle: false,
    },
  },
});
