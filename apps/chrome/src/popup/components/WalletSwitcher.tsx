import { IoAddOutline, IoCheckmark } from 'react-icons/io5';
import { useEffect, useRef, Fragment } from 'react';
import { makeShortAddress } from '../helpers/address';
import { renderIcon } from '../helpers/blockies';
import { useWallet } from '@poketto/core';
import { useModalNavigation } from '../../navigation/ModalNavigation';
import { Menu, Transition } from '@headlessui/react';

interface Props {
  activeAddress: string;
}
export const WalletSwitcher: React.FunctionComponent<Props> = ({
  activeAddress,
}) => {
  const {
    accounts,
    walletPreference,
    createNewSiblingAccount,
    changeDefaultAccountIndex,
  } = useWallet();

  const { openModal } = useModalNavigation();
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

  const handleAddWallet = async () => {
    const mnemonic = await createNewSiblingAccount();
    openModal('RevealMnemonic', { mnemonic });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex space-x-2 text-right">
          <div>
            <h3 className="text-uppercase font-semibold">
              Wallet {walletPreference.defaultAccountIndex + 1}
            </h3>

            <h5 title={activeAddress} className="text-sm text-slate-500">
              {makeShortAddress(activeAddress)}
            </h5>
          </div>

          <div className="h-10 w-10 overflow-hidden rounded-full border border-2 border-blue-500">
            <canvas ref={canvas} height="40" width="40" />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-1 py-1 ">
            {accounts.map((account, index) => {
              const isActive = walletPreference.defaultAccountIndex === index;
              return (
                <Menu.Item key={index}>
                  <button
                    className="group flex w-full items-center rounded-md px-2 py-2 hover:bg-primary hover:text-white"
                    onClick={() => changeDefaultAccountIndex(index)}
                  >
                    <div className="w-8">{isActive && <IoCheckmark />}</div>
                    <span>Wallet {index + 1}</span>
                    <h4>({makeShortAddress(account.address().hex())})</h4>
                  </button>
                </Menu.Item>
              );
            })}
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>
              <button
                onClick={handleAddWallet}
                className="group flex w-full items-center rounded-md px-2 py-2 hover:bg-primary hover:text-white"
              >
                <div className="w-8">
                  <IoAddOutline />
                </div>
                Add wallet
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
