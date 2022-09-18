import Tooltip from '@mui/material/Tooltip';
import { makeShortAddress } from '../popup/helpers/address';
import { CopyIcon } from '@icons/CopyIcon';

interface Props {
  address: string;
  takeLeft?: number;
  takeRight?: number;
}

export const HexAddress: React.FunctionComponent<Props> = ({
  address,
  takeLeft = 6,
  takeRight = 4,
}) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };
  return (
    <Tooltip title="Copy address" placement="right">
      <button onClick={copyAddress} className="-ml-1 flex items-center px-1">
        <h3 className="mr-1 text-sm text-slate-300">
          {makeShortAddress(address, takeLeft, takeRight)}
        </h3>
        <CopyIcon className="text-slate-300" />
      </button>
    </Tooltip>
  );
};
