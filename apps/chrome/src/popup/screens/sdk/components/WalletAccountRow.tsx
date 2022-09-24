import { IoCheckmark } from 'react-icons/io5';
import { useEffect, useRef } from 'react';
import { makeShortAddress } from '../../../helpers/address';
import { renderIcon } from '../../../helpers/blockies';

interface Props {
  name: string;
  activeAddress: string;
  selected: boolean;
  onSelectAccount: () => void;
  connected: boolean;
}
export const WalletAccountRow: React.FunctionComponent<Props> = ({
  name,
  activeAddress,
  selected,
  onSelectAccount,
  connected,
}) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    renderIcon(
      {
        seed: activeAddress,
        color: '#dfe',
        bgcolor: '#aaa',
        size: 8,
        scale: 5,
        spotcolor: '#000',
      },
      canvas.current
    );
  }, [activeAddress]);
  return (
    <button
      className="relative rounded-lg py-1 px-2 text-left"
      onClick={onSelectAccount}
    >
      <div className="h-8">{selected && <IoCheckmark size={20} />}</div>
      <div>
        <h3 className="font-medium uppercase">{name}</h3>

        <h3 title={activeAddress}>{makeShortAddress(activeAddress, 6, 6)}</h3>
        {connected && <h3>Connected</h3>}
      </div>
      <div className="ml-auto h-8 w-8 overflow-hidden border">
        <canvas ref={canvas} height="40" width="40" />
      </div>
    </button>
  );
};
