export interface NetworkConfig {
  aptos: string;
  faucet: string;
  label: string;
}

export const networkConfigs = {
  devnet: {
    aptos: 'https://fullnode.devnet.aptoslabs.com',
    faucet: 'https://faucet.devnet.aptoslabs.com',
    label: 'Devnet',
  },
  localhost: {
    aptos: 'http://0.0.0.0:8000',
    faucet: 'http://0.0.0.0:8000',
    label: 'Localhost',
  },
};

export type NetworkProfile = keyof typeof networkConfigs;
