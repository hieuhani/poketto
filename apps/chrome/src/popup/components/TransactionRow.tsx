import { CloudDownloadIcon } from '@icons/CloudDownloadIcon';
import { CollectionBookmarkIcon } from '@icons/CollectionBookmarkIcon';
import { DownloadIcon } from '@icons/DownloadIcon';
import { StampIcon } from '@icons/StampIcon';
import { UploadIcon } from '@icons/UploadIcon';
import { Transaction } from '@poketto/core';
import { useMemo } from 'react';
import { makeShortAddress } from '../helpers/address';
import { formatDate } from '../helpers/date';
import { formatBalance } from '../helpers/number';

interface Props {
  transaction: Transaction;
}

export const TransactionRow: React.FunctionComponent<Props> = ({
  transaction,
}) => {
  const detail = useMemo(() => {
    let title = '';
    let item = '';
    let icon = <div />;

    switch (transaction.type) {
      case 'SENT':
        title = `Sent to ${
          transaction.destination
            ? makeShortAddress(transaction.destination)
            : ''
        }`;
        item = `-${formatBalance(BigInt(transaction.amount))}`;
        icon = <UploadIcon />;
        break;
      case 'MINT':
        title = 'Mint coin';
        item = `+${formatBalance(BigInt(transaction.amount))}`;
        icon = <CloudDownloadIcon />;
        break;
      case 'RECEIVED':
        title = `Received from ${makeShortAddress(transaction.sender)}`;
        item = `+${formatBalance(BigInt(transaction.amount))}`;
        icon = <DownloadIcon />;
        break;
      case 'FUNCTION':
        if (transaction.functionType === 'create_collection_script') {
          title = 'Create NFT collection';
          icon = <CollectionBookmarkIcon />;
        } else if (transaction.functionType === 'create_token_script') {
          title = 'Create NFT item';
          icon = <StampIcon />;
        } else {
          title = 'Execute function';
        }

        break;
      default:
        break;
    }
    return { title, item, icon };
  }, [transaction.type]);

  return (
    <div
      key={transaction.version}
      className="block flex rounded-lg bg-stone-100  px-3 py-2 dark:bg-stone-800"
    >
      <div className="flex w-12 place-content-center items-center text-2xl">
        {detail.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{detail.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">{formatDate(transaction.createdAt)}</span>
          <span className="font-medium">{detail.item}</span>
        </div>
      </div>
    </div>
  );
};
