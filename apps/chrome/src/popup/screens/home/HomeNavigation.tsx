import { TabsNavigation } from '../../../navigation';
import { BottomTabs } from '../../components/BottomTabs';
import { ActivityScreen } from '../ActivityScreen';
import { CollectibleNavigation } from '../collectible/CollectibleNavigation';
import { SettingScreen } from '../SettingScreen';
import { Home } from './Home';

export const HomeNavigation: React.FunctionComponent = () => (
  <TabsNavigation
    routes={[
      { route: 'home', screen: <Home /> },
      { route: 'collectible', screen: <CollectibleNavigation /> },
      { route: 'activity', screen: <ActivityScreen /> },
      { route: 'setting', screen: <SettingScreen /> },
    ]}
    navigation={
      <div className="absolute inset-x-0 bottom-0 bg-white dark:bg-stone-900">
        <BottomTabs />
      </div>
    }
  />
);
