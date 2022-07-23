import { Bootstrap } from '~/shared/Bootstrap';
import Box from '@mui/material/Box';
import { TabsNavigation } from '~/navigation';
import { WalletProvider } from '@poketto/core';
import { HomeScreen } from './screens/HomeScreen';
import { CollectibleScreen } from './screens/CollectibleScreen';
import { ActivityScreen } from './screens/ActivityScreen';
import { SettingScreen } from './screens/SettingScreen';
import { BottomTabs } from './components/BottomTabs';

export const App: React.FunctionComponent = () => {
  return (
    <WalletProvider>
      <Bootstrap>
        <Box
          sx={{
            width: 420,
            marginX: 'auto',
            height: '100vh',
            display: 'grid',
            gridTemplateRows: '1fr 60px',
            backgroundColor: 'grey.900',
          }}
        >
          <TabsNavigation
            routes={[
              { route: 'home', screen: <HomeScreen /> },
              { route: 'collectible', screen: <CollectibleScreen /> },
              { route: 'activity', screen: <ActivityScreen /> },
              { route: 'setting', screen: <SettingScreen /> },
            ]}
            navigation={<BottomTabs />}
          />
        </Box>
      </Bootstrap>
    </WalletProvider>
  );
};
