import { PropsWithChildren } from 'react';

export const Layout: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  return <div className="relative mx-auto h-screen max-w-sm">{children}</div>;
};
