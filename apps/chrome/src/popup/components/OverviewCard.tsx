import { HexAddress } from '../../ui/HexAddress';
import { formatBalance } from '../helpers/number';
import { BackgroundPattern } from './BackgroundPattern';

interface Props {
  balance: bigint;
  address: string;
}

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
          <HexAddress className="text-slate-300" address={address} />
          <h4 className="text-slate-100">Account Balance</h4>
        </div>

        <h4 className="text-3xl text-white">{formatBalance(balance)}</h4>
      </div>
    </div>
  );
};
