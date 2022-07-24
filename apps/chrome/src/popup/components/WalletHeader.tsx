import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
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
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Logo />
      {loading ? (
        <Skeleton width={140} height={50} />
      ) : (
        <WalletSwitcher activeAddress={activeAddress || ''} />
      )}
    </Box>
  );
};
