import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Props {
  loading: boolean;
}
export const GlobalLoading: React.FunctionComponent<Props> = ({ loading }) => {
  return (
    <Transition appear show={loading} as={Fragment}>
      <div className="fixed inset-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className=" bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 flex place-content-center items-center">
          <div className="flex h-16 w-16 place-content-center items-center rounded-xl bg-gray-400">
            <svg
              className="h-8 w-8 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </Transition>
  );
};
