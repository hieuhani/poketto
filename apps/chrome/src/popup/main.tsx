import { WalletProvider } from '@poketto/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WebLocalStorage } from '@poketto/core';
import { Bootstrap } from '../shared/Bootstrap';
import { App } from './App';
import { ModalNavigation } from '../navigation/ModalNavigation';

const storage = new WebLocalStorage();

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
