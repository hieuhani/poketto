import { PropsWithChildren } from 'react';
import { HotToast } from '../ui/HotToast';

export const Bootstrap: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <HotToast />
      {children}
    </>
  );
};
