import { Bootstrap } from '~/shared/Bootstrap';
import Paper from '@mui/material/Paper';
import { StackNavigation } from '~/navigation';
import { WalletProvider } from '@poketto/core';

export const App: React.FunctionComponent = () => {
  return (
    <WalletProvider>
      <Bootstrap>
        <Paper
          sx={{
            width: 420,
            marginX: 'auto',
            marginTop: '50vh',
          }}
        >
          <StackNavigation routes={[]} />
        </Paper>
      </Bootstrap>
    </WalletProvider>
  );
};
