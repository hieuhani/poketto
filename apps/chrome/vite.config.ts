import { defineConfig, UserConfig } from 'vite';
import { dirname, relative } from 'path';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import { r, port, isDev } from './scripts/utils';

export const sharedConfig: UserConfig = {
  root: r('src'),

  resolve: {
    alias: {
      '~/': `${r('src')}/`,
      '@poketto/core': r('../../libs/core/src/'),
    },
  },
  define: {
    __DEV__: isDev,
  },
  plugins: [
    // React fast refresh doesn't work, cause injecting of preambleCode into index.html
    // TODO: fix it
    react({ fastRefresh: false }),
    AutoImport({
      imports: [
        {
          'webextension-polyfill': [['default', 'browser']],
        },
      ],
      dts: r('src/auto-imports.d.ts'),
    }),

    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), '/assets')}/`
        );
      },
    },
  ],
  optimizeDeps: {
    include: ['webextension-polyfill'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
};
// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    target: ['esnext'],
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    rollupOptions: {
      input: {
        background: r('src/background/index.html'),
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
      },
    },
  },
  plugins: [...sharedConfig.plugins!],
}));
