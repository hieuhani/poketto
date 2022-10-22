import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const Container: React.FunctionComponent<
  PropsWithChildren<{ className?: string }>
> = ({ className, ...props }) => {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
};
