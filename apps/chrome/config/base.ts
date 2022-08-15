import { PluginOption, UserConfig } from 'vite';
import { dirname, relative } from 'path';
import react from '@vitejs/plugin-react';

import { isDev, r } from '../scripts/utils';

export const basePlugins: PluginOption[] = [react()];
export const extensionPlugins: PluginOption[] = [
  ...basePlugins,
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
];

export const sharedConfig: UserConfig = {
  resolve: {
    alias: {
      '@poketto/core': r('../../libs/core/src/'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
};

type ScriptType = 'content' | 'background';

export const makeBuildExtensionPageConfig = (scriptType: ScriptType) => {
  return {
    ...sharedConfig,
    plugins: extensionPlugins,
    build: {
      outDir: r(`extension/dist/${scriptType}`),
      cssCodeSplit: false,
      emptyOutDir: false,
      sourcemap: isDev ? 'inline' : false,
      lib: {
        entry: r(`src/${scriptType}/main.ts`),
        formats: ['cjs'],
        name: `${scriptType}`,
      },
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
          extend: true,
        },
      },
    },
  };
};
