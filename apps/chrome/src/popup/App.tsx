import Box from '@mui/material/Box';
import { StackNavigation, TabsNavigation } from '../navigation';
import { Home } from './screens/home/Home';
import { CollectibleScreen } from './screens/CollectibleScreen';
import { ActivityScreen } from './screens/ActivityScreen';
import { SettingScreen } from './screens/SettingScreen';
import { BottomTabs } from './components/BottomTabs';
import { WelcomeScreen, NewWalletScreen } from './screens/onboarding';
import { useWallet } from '@poketto/core';
import { RevealMnemonicScreen } from './screens/onboarding/RevealMnemonicScreen';
import { PasswordResumeScreen } from './screens/onboarding/PasswordResumeScreen';
import { ImportWalletScreen } from './screens/onboarding/ImportWalletScreen';
import { ForgotPasswordScreen } from './screens/onboarding/ForgotPasswordScreen';
import { GlobalLoading } from './components/GlobalLoading';

export const App: React.FunctionComponent = () => {
  const { account, state, oneTimeMnemonic, password } = useWallet();
  const loading = ['account:pending:createNewSiblingAccount'].includes(state);

  const authenticated =
    account !== null &&
    !oneTimeMnemonic &&
    ![
      'account:pending:createAccount',
      'account:pending:loadAccount',
      'account:fulfilled:noAccount',
    ].includes(state);

  return (
    <Box
      sx={{
        maxWidth: 420,
        marginX: 'auto',
        height: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr 60px',
        backgroundColor: 'grey.900',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        width={272}
        height={272}
        sx={{
          position: 'absolute',
          left: -130,
          top: -92,
          borderRadius: 136,
          filter: 'blur(200px)',
          backgroundColor: '#1e88e5',
        }}
      />
      <Box zIndex={1000}>
        {state === 'account:pending:loadAccount' && !password ? (
          <StackNavigation
            routes={[
              { route: 'password_resume', screen: <PasswordResumeScreen /> },
              { route: 'forgot_password', screen: <ForgotPasswordScreen /> },
            ]}
          />
        ) : authenticated ? (
          <TabsNavigation
            routes={[
              { route: 'home', screen: <Home /> },
              { route: 'collectible', screen: <CollectibleScreen /> },
              { route: 'activity', screen: <ActivityScreen /> },
              { route: 'setting', screen: <SettingScreen /> },
            ]}
            navigation={
              <Box position="absolute" bottom={0} left={0} right={0}>
                <BottomTabs />
              </Box>
            }
          />
        ) : (
          <StackNavigation
            routes={[
              { route: 'welcome', screen: <WelcomeScreen /> },
              { route: 'new_wallet', screen: <NewWalletScreen /> },
              { route: 'import_wallet', screen: <ImportWalletScreen /> },
              { route: 'reveal_mnemonic', screen: <RevealMnemonicScreen /> },
            ]}
          />
        )}
      </Box>
      <GlobalLoading loading={loading} />
    </Box>
  );
};
