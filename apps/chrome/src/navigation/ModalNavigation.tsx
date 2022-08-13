import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ReceiveCoin } from '../popup/modals/ReceiveCoin';
import { RevealMnemonic } from '../popup/modals/RevealMnemonic';

const modals = {
  ReceiveCoin,
  RevealMnemonic,
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
      <Dialog open={open} onClose={closeModal}>
        <DialogContent>
          {ModalComponent && (
            <ModalComponent {...modalParams} close={closeModal} />
          )}
        </DialogContent>
      </Dialog>
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
