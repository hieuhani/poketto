import Skeleton from '@mui/material/Skeleton';
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
        <Skeleton width={140} height={50} />
      ) : (
        <WalletSwitcher activeAddress={activeAddress || ''} />
      )}
    </div>
  );
};
