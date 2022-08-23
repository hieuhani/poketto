import { Storage, WalletProvider } from '@poketto/core';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { WebLocalStorage } from '@poketto/core';
import { Bootstrap } from '../shared/Bootstrap';
import { App } from './App';
import { ModalNavigation } from '../navigation/ModalNavigation';

const platform = window.location.protocol;

const Entry = () => {
  const [storage, setStorage] = useState<Storage | undefined>();
  const [sessionStorage, setSessionStorage] = useState<Storage | undefined>();
  useEffect(() => {
    const loadStorage = async () => {
      if (platform === 'chrome-extension:') {
        const { ChromeLocalStorage } = await import(
          '../storage/chromeLocalStorage'
        );
        const { ChromeSessionStorage } = await import(
          '../storage/chromeSessionStorage'
        );
        setStorage(new ChromeLocalStorage());
        setSessionStorage(new ChromeSessionStorage());
      } else {
        setStorage(new WebLocalStorage());
      }
    };

    if (!storage) {
      loadStorage();
    }
  }, []);

  if (!storage) {
    return null;
  }
  return (
    <WalletProvider storage={storage} sessionStorage={sessionStorage}>
      <Bootstrap>
        <ModalNavigation>
          <App />
        </ModalNavigation>
      </Bootstrap>
    </WalletProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Entry />
  </React.StrictMode>
);
