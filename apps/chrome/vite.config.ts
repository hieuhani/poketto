import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import react from '@vitejs/plugin-react';

export const isDev = process.env.NODE_ENV !== 'production';

const r = (p: string) =>
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), p);

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  resolve: {
    alias: {
      '@poketto/core': r('../../libs/core/src/'),
    },
  },
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: ['esnext'],
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
  },
}));
