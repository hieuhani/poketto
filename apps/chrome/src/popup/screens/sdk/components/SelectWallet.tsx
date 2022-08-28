import Stack from '@mui/material/Stack';
import { AptosAccount } from 'aptos';
import { WalletAccountRow } from './WalletAccountRow';

interface Props {
  accounts: AptosAccount[];
  selectedAddress?: string;
  onSelectAccount: (address: string) => void;
  checkIsConnectedOrigin: (address: string) => boolean;
}
export const SelectWallet: React.FunctionComponent<Props> = ({
  accounts,
  selectedAddress,
  onSelectAccount,
  checkIsConnectedOrigin,
}) => {
  return (
    <Stack
      width="100%"
      spacing={1}
      borderRadius={2}
      sx={{ backgroundColor: 'grey.900' }}
    >
      {accounts.map((account, index) => {
        const address = account.address().hex();
        return (
          <WalletAccountRow
            key={index}
            name={`Wallet ${index + 1}`}
            activeAddress={address}
            selected={selectedAddress === address}
            onSelectAccount={() => onSelectAccount(address)}
            connected={checkIsConnectedOrigin(address)}
          />
        );
      })}
    </Stack>
  );
};
