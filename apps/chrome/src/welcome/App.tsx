import { Bootstrap } from '~/shared/Bootstrap';
import Paper from '@mui/material/Paper';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { StackNavigation } from '~/navigation';
import { NewWalletScreen } from './screens/NewWalletScreen';
import { SecretRecoveryScreen } from './screens/SecretRecoveryScreen';

export const App: React.FunctionComponent = () => {
  return (
    <Bootstrap>
      <Paper
        sx={{
          width: 420,
          marginX: 'auto',
          marginTop: '50vh',
          transform: 'translateY(-50%)',
        }}
      >
        <StackNavigation
          routes={[
            { route: 'welcome', screen: <WelcomeScreen /> },
            { route: 'new_wallet', screen: <NewWalletScreen /> },
            { route: 'secret_recovery', screen: <SecretRecoveryScreen /> },
          ]}
        />
      </Paper>
    </Bootstrap>
  );
};
