import fs from 'fs-extra';
import type { Manifest } from 'webextension-polyfill';
import type PkgType from '../package.json';
import { isDev, port, r } from '../scripts/utils';

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: './assets/icon-512.png',
      default_popup: './dist/popup.html',
    },
    background: {
      service_worker: './dist/background.js',
    },
    web_accessible_resources: [
      {
        resources: ['dist/inpage.js'],
        matches: ['<all_urls>'],
      },
    ],
    content_scripts: [
      {
        matches: ['file://*/*', 'http://*/*', 'https://*/*'],
        js: ['./dist/content.js'],
        run_at: 'document_start',
        all_frames: true,
      },
    ],
    icons: {
      16: './assets/icon-512.png',
      48: './assets/icon-512.png',
      128: './assets/icon-512.png',
    },
    permissions: ['tabs', 'storage', 'unlimitedStorage', 'activeTab'],
    content_security_policy: {
      extension_pages:
        "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'",
    },
  };

  return manifest;
}
