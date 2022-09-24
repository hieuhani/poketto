import { PropsWithChildren } from 'react';

export const SettingGroup: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="divide-y divide-gray-200 rounded-xl bg-stone-100 dark:divide-stone-700 dark:bg-stone-800">
      {children}
    </div>
  );
};
