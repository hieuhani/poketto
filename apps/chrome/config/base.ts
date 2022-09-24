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
      '@ui': r('./src/ui/'),
      '@icons': r('./src/icons/'),
      stream: 'stream-browserify',
      util: 'util/',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  define: {
    'process.env': process.env,
  },
};

export type ScriptType = 'content' | 'background' | 'inpage';

export const makeBuildExtensionPageConfig = (
  scriptType: ScriptType
): UserConfig => {
  return {
    ...sharedConfig,
    plugins: extensionPlugins,
    build: {
      outDir: r(`extension/dist/${scriptType}`),
      cssCodeSplit: false,
      emptyOutDir: false,
      sourcemap: isDev ? 'inline' : undefined,
      target: ['es2020'],
      lib: {
        entry: r(`src/${scriptType}/main.ts`),
        formats: ['iife'],
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
