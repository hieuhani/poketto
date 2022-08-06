import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
  IoWalletOutline,
  IoSettingsOutline,
  IoAlbumsOutline,
  IoWalletSharp,
  IoSettingsSharp,
  IoAlbumsSharp,
  // IoTicketSharp,
  // IoTicketOutline,
} from 'react-icons/io5';
import { useTabsNavigation } from '../../navigation';

export const BottomTabs: React.FunctionComponent = () => {
  const { activeRoute, navigate } = useTabsNavigation();
  const onRouteChanged = (event: React.SyntheticEvent, route: string) => {
    navigate(route);
  };

  return (
    <BottomNavigation
      showLabels={false}
      value={activeRoute}
      onChange={onRouteChanged}
    >
      <BottomNavigationAction
        value="home"
        label="Wallet"
        icon={
          activeRoute === 'home' ? (
            <IoWalletSharp size={24} />
          ) : (
            <IoWalletOutline size={24} />
          )
        }
      />
      {/* <BottomNavigationAction
        value="collectible"
        label="Collectible"
        icon={
          activeRoute === 'collectible' ? (
            <IoTicketSharp size={24} />
          ) : (
            <IoTicketOutline size={24} />
          )
        }
      /> */}
      <BottomNavigationAction
        value="activity"
        label="Activity"
        icon={
          activeRoute === 'activity' ? (
            <IoAlbumsSharp size={24} />
          ) : (
            <IoAlbumsOutline size={24} />
          )
        }
      />
      <BottomNavigationAction
        value="setting"
        label="Setting"
        icon={
          activeRoute === 'setting' ? (
            <IoSettingsSharp size={24} />
          ) : (
            <IoSettingsOutline size={24} />
          )
        }
      />
    </BottomNavigation>
  );
};
