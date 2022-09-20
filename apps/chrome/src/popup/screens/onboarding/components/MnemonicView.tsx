import { HiOutlineCursorClick } from 'react-icons/hi';
import { useCopy } from '../../../hooks/use-copy';
import { useState } from 'react';
import { Button } from '@ui/Button';
import { CopyIcon } from '@icons/CopyIcon';

interface Props {
  mnemonic: string;
}

export const MnemonicView: React.FunctionComponent<Props> = ({ mnemonic }) => {
  const [reveal, setReveal] = useState(false);
  const mnemonicBlocks = mnemonic.split(' ');
  const { copied, copy } = useCopy();
  const copyMnemonic = () => {
    copy(mnemonic);
  };

  return (
    <div className="user-select-none relative space-y-3 overflow-hidden rounded-lg p-3">
      {!reveal && (
        <div className="absolute inset-0 z-10 flex flex-col place-content-center bg-gray-200 px-3 text-center">
          <Button
            variant="link"
            className="flex items-center justify-center"
            onClick={() => setReveal(true)}
          >
            <HiOutlineCursorClick />
            <h3>Click to reveal Seed Phrase</h3>
          </Button>
          <h3>
            Make sure no one is watching your screen. Save it somewhere safe.
          </h3>
        </div>
      )}

      <div className="grid grid-cols-2">
        {mnemonicBlocks.map((block, index) => (
          <div key={index} className="flex">
            <h3 className="mr-3 text-blue-600">{index + 1}</h3>
            <span>{block}</span>
          </div>
        ))}
      </div>
      <Button
        className="flex items-center justify-center space-x-3"
        fullWidth
        onClick={copyMnemonic}
        disabled={copied}
      >
        <CopyIcon />
        <span>{copied ? 'Copied' : 'Copy to clipboard'}</span>
      </Button>
    </div>
  );
};
