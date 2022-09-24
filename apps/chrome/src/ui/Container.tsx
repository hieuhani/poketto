import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

export const Container: React.FunctionComponent<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx('px-2 text-slate-900 dark:text-slate-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};
