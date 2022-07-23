import Box from '@mui/material/Box';
import { StackNavigation, TabsNavigation } from '~/navigation';
import { HomeScreen } from './screens/HomeScreen';
import { CollectibleScreen } from './screens/CollectibleScreen';
import { ActivityScreen } from './screens/ActivityScreen';
import { SettingScreen } from './screens/SettingScreen';
import { BottomTabs } from './components/BottomTabs';
import { WelcomeScreen, NewWalletScreen } from './screens/onboarding';
import { useWallet } from '@poketto/core';

export const App: React.FunctionComponent = () => {
  const { account, state } = useWallet();
  const authenticated = account !== null && !state.startsWith('pending:');
  return (
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
      {authenticated ? (
        <TabsNavigation
          routes={[
            { route: 'home', screen: <HomeScreen /> },
            { route: 'collectible', screen: <CollectibleScreen /> },
            { route: 'activity', screen: <ActivityScreen /> },
            { route: 'setting', screen: <SettingScreen /> },
          ]}
          navigation={<BottomTabs />}
        />
      ) : (
        <StackNavigation
          routes={[
            { route: 'welcome', screen: <WelcomeScreen /> },
            { route: 'new_wallet', screen: <NewWalletScreen /> },
          ]}
        />
      )}
    </Box>
  );
};
