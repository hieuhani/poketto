import { HiOutlineCursorClick } from 'react-icons/hi';
import { useCopy } from '../../../hooks/use-copy';
import { useState } from 'react';
import { Button } from '@ui/Button';
import { CopyIcon } from '@icons/CopyIcon';

interface Props {
  privateKey: string;
}

export const PrivateKeyView: React.FunctionComponent<Props> = ({
  privateKey,
}) => {
  const [reveal, setReveal] = useState(false);
  const { copied, copy } = useCopy();
  const copyPrivateKey = () => {
    copy(privateKey);
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
            <h3>Click to reveal private key</h3>
          </Button>
          <h3>
            Make sure no one is watching your screen. Save it somewhere safe.
          </h3>
        </div>
      )}
      <div className="break-all rounded-lg bg-gray-200 px-3 py-2 text-center">
        {privateKey}
      </div>
      <Button
        className="flex items-center justify-center space-x-3"
        fullWidth
        onClick={copyPrivateKey}
        disabled={copied}
      >
        <CopyIcon />
        <span>{copied ? 'Copied' : 'Copy to clipboard'}</span>
      </Button>
    </div>
  );
};
