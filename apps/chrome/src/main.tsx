import { WalletProvider } from '@poketto/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Bootstrap } from './shared/Bootstrap';
import { App } from './popup/App';
import { ModalNavigation } from './navigation/ModalNavigation';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider>
      <Bootstrap>
        <ModalNavigation>
          <App />
        </ModalNavigation>
      </Bootstrap>
    </WalletProvider>
  </React.StrictMode>
);
