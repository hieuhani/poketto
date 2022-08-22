import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json';
import { resolve } from 'path';

const external = Object.values(pkg.peerDependencies);

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: '@poketto/core',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    minify: false,
    target: ['es2020'],
    rollupOptions: {
      external,
    },
  },
});
