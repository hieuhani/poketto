import { Logo } from './Logo';
import { WalletSwitcher } from './WalletSwitcher';

interface Props {
  loading: boolean;
  activeAddress?: string;
}
export const WalletHeader: React.FunctionComponent<Props> = ({
  loading,
  activeAddress,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Logo />
      {loading ? (
        <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200" />
      ) : (
        <WalletSwitcher activeAddress={activeAddress || ''} />
      )}
    </div>
  );
};
