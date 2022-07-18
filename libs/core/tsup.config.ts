import { defineConfig } from 'tsup';
import pkg from './package.json';

const external = Object.values(pkg.peerDependencies);

export default defineConfig({
  name: '@poketto/core',
  splitting: true,
  minify: true,
  target: 'node16',
  entry: ['./src/*.tsx', './src/**/*.tsx', './src/**/*.ts'],
  format: ['cjs', 'esm'],
  external,
});
