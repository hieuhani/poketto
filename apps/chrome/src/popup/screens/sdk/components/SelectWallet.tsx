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
    <div className="w-full space-y-3 rounded-md">
      {accounts.map((account, index) => {
        const address = account.address().toShortString();
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
    </div>
  );
};
