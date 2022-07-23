import { WalletProvider } from '@poketto/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Bootstrap } from '~/shared/Bootstrap';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider>
      <Bootstrap>
        <App />
      </Bootstrap>
    </WalletProvider>
  </React.StrictMode>
);
