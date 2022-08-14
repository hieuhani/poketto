import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityNavigator } from '../activity/ActivityNavigator';
import { SettingNavigator } from '../setting/SettingNavigator';
import { HomeScreen } from './HomeScreen';

const Tab = createBottomTabNavigator();

export const HomeNavigator: React.FunctionComponent = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Activity" component={ActivityNavigator} />
      <Tab.Screen name="Setting" component={SettingNavigator} />
    </Tab.Navigator>
  );
};
