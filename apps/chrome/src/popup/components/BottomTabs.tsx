import clsx from 'clsx';
import { ReactNode } from 'react';
import {
  IoWalletOutline,
  IoSettingsOutline,
  IoAlbumsOutline,
  IoWalletSharp,
  IoSettingsSharp,
  IoAlbumsSharp,
  IoTicketSharp,
  IoTicketOutline,
} from 'react-icons/io5';
import { useTabsNavigation } from '../../navigation';

const menus: Record<
  string,
  { label: string; activeIcon: ReactNode; icon: ReactNode }
> = {
  home: {
    label: 'Wallet',
    activeIcon: <IoWalletSharp size={24} />,
    icon: <IoWalletOutline size={24} />,
  },
  collectible: {
    label: 'Collectible',
    activeIcon: <IoTicketSharp size={24} />,
    icon: <IoTicketOutline size={24} />,
  },
  activity: {
    label: 'Activity',
    activeIcon: <IoAlbumsSharp size={24} />,
    icon: <IoAlbumsOutline size={24} />,
  },
  setting: {
    label: 'Setting',
    activeIcon: <IoSettingsSharp size={24} />,
    icon: <IoSettingsOutline size={24} />,
  },
};

export const BottomTabs: React.FunctionComponent = () => {
  const { activeRoute, navigate } = useTabsNavigation();
  const onRouteChanged = (route: string) => {
    navigate(route);
  };

  return (
    <div className="flex h-12 items-center">
      {Object.keys(menus).map((menuKey) => {
        const isActive = menuKey === activeRoute;
        return (
          <button
            className={clsx('flex flex-1 flex-col items-center', {
              'text-primary': isActive,
              'text-stone-600 dark:text-stone-500': !isActive,
            })}
            key={menuKey}
            onClick={() => onRouteChanged(menuKey)}
          >
            <span>
              {isActive ? menus[menuKey].activeIcon : menus[menuKey].icon}
            </span>
            <h3 className="text-sm font-medium">{menus[menuKey].label}</h3>
          </button>
        );
      })}
    </div>
  );
};
