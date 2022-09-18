import { HexAddress } from '../../ui/HexAddress';
import { BackgroundPattern } from './BackgroundPattern';

interface Props {
  balance: number;
  address: string;
}

const formatMoney = (amount: number) => {
  const balanceDesc = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  return balanceDesc.substring(1);
};

export const OverviewCard: React.FunctionComponent<Props> = ({
  balance,
  address,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0">
        <BackgroundPattern />
      </div>

      <div className="relative px-6 py-4">
        <div className="mb-6">
          <HexAddress address={address} />
          <h4 className="text-slate-100">Account Balance</h4>
        </div>

        <h4 className="text-3xl text-white">{formatMoney(balance)}</h4>
      </div>
    </div>
  );
};
