import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoAlbumsOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { useTabsNavigation } from '~/navigation';

export const BottomTabs: React.FunctionComponent = () => {
  const { activeRoute, navigate } = useTabsNavigation();
  const onRouteChanged = (event: React.SyntheticEvent, route: string) => {
    navigate(route);
  };

  return (
    <BottomNavigation value={activeRoute} onChange={onRouteChanged}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<IoHomeOutline size={24} />}
      />
      <BottomNavigationAction
        label="Collectibles"
        value="collectible"
        icon={<IoTicketOutline size={24} />}
      />
      <BottomNavigationAction
        label="Activities"
        value="activity"
        icon={<IoAlbumsOutline size={24} />}
      />
      <BottomNavigationAction
        label="Settings"
        value="setting"
        icon={<IoSettingsOutline size={24} />}
      />
    </BottomNavigation>
  );
};
