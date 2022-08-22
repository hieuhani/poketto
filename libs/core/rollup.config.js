import path from 'path';

import typescript from '@rollup/plugin-typescript';

const r = (p) => path.resolve(__dirname, p);

const external = [
  'aptos',
  'react',
  'react-dom',
  '@metamask/browser-passworder',
  '@scure/bip39',
  'buffer',
  'tweetnacl',
  '@scure/bip39/wordlists/english',
  'react/jsx-runtime',
];

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'cjs',
      file: r('dist/index.js'),
    },
    {
      format: 'es',
      file: r('dist/index.es.js'),
    },
  ],
  external,
  plugins: [typescript()],
};
