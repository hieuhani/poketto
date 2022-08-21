import { WalletProvider } from '@poketto/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WebLocalStorage } from '@poketto/core';
import { Bootstrap } from '../shared/Bootstrap';
import { App } from './App';
import { ModalNavigation } from '../navigation/ModalNavigation';
import { ChromeLocalStorage } from '../storage/chromeLocalStorage';

const getStorage = () => {
  const platform = window.location.protocol;
  if (platform === 'chrome-extension:') {
    return new ChromeLocalStorage();
  }
  return new WebLocalStorage();
};

const storage = getStorage();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider storage={storage}>
      <Bootstrap>
        <ModalNavigation>
          <App />
        </ModalNavigation>
      </Bootstrap>
    </WalletProvider>
  </React.StrictMode>
);
