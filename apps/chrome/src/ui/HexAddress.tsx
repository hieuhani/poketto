import { makeShortAddress } from '../popup/helpers/address';
import { CopyIcon } from '@icons/CopyIcon';
import clsx from 'clsx';

interface Props {
  address: string;
  takeLeft?: number;
  takeRight?: number;
  className?: string;
}

export const HexAddress: React.FunctionComponent<Props> = ({
  address,
  takeLeft = 6,
  takeRight = 4,
  className,
}) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };
  return (
    <button
      type="button"
      onClick={copyAddress}
      className={clsx(
        '-ml-1 flex items-center px-1 text-stone-400 dark:text-white',
        className
      )}
    >
      <h3 className="mr-1 text-sm">
        {makeShortAddress(address, takeLeft, takeRight)}
      </h3>
      <CopyIcon />
    </button>
  );
};
