import { CashInIcon } from '@icons/CashInIcon';
import { CashOutIcon } from '@icons/CashOutIcon';

interface Props {
  goToTransferScreen: () => void;
  goToReceiveScreen: () => void;
}

export const WalletActions: React.FunctionComponent<Props> = ({
  goToTransferScreen,
  goToReceiveScreen,
}) => (
  <div className="rounded-lg bg-stone-100 text-stone-800 dark:bg-stone-800 dark:bg-stone-800 dark:text-white">
    <div className="grid grid-cols-2">
      <button
        onClick={goToReceiveScreen}
        className="flex flex-col items-center py-3"
      >
        <CashInIcon className="text-3xl" />

        <h3 className="font-medium">Receive</h3>
      </button>
      <button
        onClick={goToTransferScreen}
        className="flex flex-col items-center py-3"
      >
        <CashOutIcon className="text-3xl" />

        <h3 className="font-medium">Send</h3>
      </button>
    </div>
  </div>
);
