import { makeShortAddress } from '../helpers/address';
import { Button } from '@ui/Button';

interface Props {
  close: () => void;
  fromAddress: string;
  toAddress: string;
  amount: number;
  gasFee: number;
  onSendTransaction: () => void;
}

export const ConfirmSendTransaction: React.FunctionComponent<Props> = ({
  fromAddress,
  toAddress,
  amount,
  gasFee,
  close,
  onSendTransaction,
}) => {
  const handleSend = () => {
    onSendTransaction();
    close();
  };
  return (
    <div className="space-y-3">
      <h5 className="mb-3 text-xl font-medium">Transaction Preview</h5>
      <div>
        <div>
          <h4 className="text-sm text-gray-500">From</h4>
          <p>{makeShortAddress(fromAddress, 10, 6)}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500">To</h4>
          <p>{makeShortAddress(toAddress, 10, 6)}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500">Amount</h4>
          <p>{amount}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500">Gas fee</h4>
          <p>{gasFee}</p>
        </div>
      </div>
      <Button fullWidth onClick={handleSend}>
        Send
      </Button>
    </div>
  );
};
