import { useWallet } from '@poketto/core';
import { WalletActions } from '../../components/WalletActions';
import { useStackNavigation } from '../../../navigation';
import { OverviewCard } from '../../components/OverviewCard';
import { TokenRow } from '../../components/TokenRow';
import { WalletHeader } from '../../components/WalletHeader';
import { useModalNavigation } from '../../../navigation/ModalNavigation';

export const HomeScreen: React.FunctionComponent = () => {
  const { account, state, coins } = useWallet();
  const { navigate } = useStackNavigation();
  const { openModal } = useModalNavigation();
  const balance = coins.reduce((acc, coin) => acc + coin.balance, BigInt(0));
  const handleGoToReceiveScreen = () => {
    openModal('ReceiveCoin', {
      accountAddress: account?.address().toShortString() || '',
    });
  };
  return (
    <div className="space-y-3">
      <WalletHeader
        loading={state.startsWith('account:pending:loadAccount')}
        activeAddress={account?.address().toShortString()}
      />
      <OverviewCard
        balance={balance}
        address={account?.address().toShortString() || ''}
      />

      <WalletActions
        goToReceiveScreen={handleGoToReceiveScreen}
        goToTransferScreen={() => navigate('transfer')}
      />

      <div className="spacing-y-3">
        {coins.map((coin) => (
          <TokenRow key={coin.name} coin={coin} />
        ))}
      </div>
    </div>
  );
};
