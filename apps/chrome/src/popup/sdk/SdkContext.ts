import { createContext, useContext } from 'react';

export interface SdkContextState {
  request?: any;
  origin?: string;
  tabId?: string;
  valid: boolean;
}

export const SdkContext = createContext<SdkContextState>({
  valid: false,
});

export const useSdk = () => {
  const context = useContext(SdkContext);
  if (!context) {
    throw new Error('useSdk must be inside a SdkProvider');
  }
  return context;
};
