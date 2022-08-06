import Stack from '@mui/material/Stack';
import { useWallet } from '@poketto/core';
import { WalletActions } from '../../components/WalletActions';
import { useStackNavigation } from '../../../navigation';
import { OverviewCard } from '../../components/OverviewCard';
import { TokenRow } from '../../components/TokenRow';
import { WalletHeader } from '../../components/WalletHeader';

export const HomeScreen: React.FunctionComponent = () => {
  const { account, state, coins } = useWallet();
  const { navigate } = useStackNavigation();
  const balance = coins.reduce((acc, coin) => acc + coin.balance, 0);
  return (
    <Stack paddingX={2} paddingTop={2} spacing={2}>
      <WalletHeader
        loading={state.startsWith('account:pending')}
        activeAddress={account?.address().hex()}
      />
      <OverviewCard
        balance={balance}
        address={account?.address().hex() || ''}
      />

      <WalletActions goToTransferScreen={() => navigate('transfer')} />

      <Stack spacing={2}>
        {coins.map((coin) => (
          <TokenRow key={coin.name} coin={coin} />
        ))}
      </Stack>
    </Stack>
  );
};
