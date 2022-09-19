import { PropsWithChildren } from 'react';

export const SettingGroup: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  return <div className="rounded-xl bg-slate-100">{children}</div>;
};
