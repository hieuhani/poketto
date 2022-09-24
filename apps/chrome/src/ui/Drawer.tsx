import { Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

interface Props {
  anchor?: 'bottom' | 'left' | 'right';
  open: boolean;
  onClose: () => void;
}
export const Drawer: React.FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  open,
  onClose,
  anchor = 'bottom',
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <div className="fixed inset-0 z-10 flex flex-col ">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button onClick={onClose} className="flex-1 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="bg-white">{children}</div>
      </div>
    </Transition>
  );
};
