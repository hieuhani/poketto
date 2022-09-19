import {
  createContext,
  PropsWithChildren,
  Fragment,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ReceiveCoin } from '../popup/modals/ReceiveCoin';
import { RevealMnemonic } from '../popup/modals/RevealMnemonic';
import { ConfirmSendTransaction } from '../popup/modals/ConfirmSendTransaction';

const modals = {
  ReceiveCoin,
  RevealMnemonic,
  ConfirmSendTransaction,
};

export type AvailableModal = keyof typeof modals;
interface ModalNavigationContextState {
  openModal: (modal: AvailableModal, params?: object) => void;
  closeModal: () => void;
}

const ModalNavigationContext = createContext<ModalNavigationContextState>({
  openModal: (modal: AvailableModal, params?: object) => {
    throw new Error('unimplemented');
  },
  closeModal: () => {
    throw new Error('unimplemented');
  },
});

export const ModalNavigation: React.FunctionComponent<
  PropsWithChildren<{}>
> = ({ children }) => {
  const [modalName, setModalName] = useState<AvailableModal | null>(null);
  const [modalParams, setModalParams] = useState<any>();
  const open = !!modalName;

  const closeModal = () => {
    setModalName(null);
  };

  const openModal = (modal: AvailableModal, params?: object) => {
    setModalName(modal);
    setModalParams(params);
  };

  const ModalComponent = useMemo(() => {
    if (!modalName) {
      return null;
    }
    return modals[modalName];
  }, [modalName]);
  return (
    <ModalNavigationContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {ModalComponent && (
                    <ModalComponent {...modalParams} close={closeModal} />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </ModalNavigationContext.Provider>
  );
};

export const useModalNavigation = () => {
  const context = useContext(ModalNavigationContext);
  if (!context) {
    throw new Error('useModalNavigation must be used within a ModalNavigation');
  }
  return context;
};
