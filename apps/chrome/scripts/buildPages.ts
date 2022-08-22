import { makeBuildExtensionPageConfig, ScriptType } from 'config/base';
import { build } from 'vite';
import chokidar from 'chokidar';
import { isDev, r } from './utils';

const pages: ScriptType[] = ['background', 'content', 'inpage'];
const resolves = pages.map((page) => r(`src/${page}/main.ts`));

async function buildPages() {
  for (const page of pages) {
    const config = makeBuildExtensionPageConfig(page);
    await build(config);
  }
}

buildPages();

if (isDev) {
  chokidar.watch([...resolves, r('package.json')]).on('change', () => {
    buildPages();
  });
}
