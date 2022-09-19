import { IconType } from 'react-icons';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description?: string;
  icon?: IconType;
  iconClassname?: string;
}

export const SettingItem: React.FunctionComponent<Props> = ({
  title,
  description,
  icon: Icon,
  iconClassname,
  ...props
}) => (
  <button className="flex items-center px-3 py-3 text-left" {...props}>
    <div
      className={clsx(
        'mr-3 flex h-12 w-12 items-center justify-center rounded-xl text-white',
        iconClassname
      )}
    >
      {Icon && <Icon size={22} />}
    </div>
    <div className="flex-1">
      <h3 className="font-medium">{title}</h3>
      <h5 className="text-sm">{description}</h5>
    </div>
  </button>
);
