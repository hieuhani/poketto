import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { OverviewCard } from '../components/OverviewCard';
import { TokenRow } from '../components/TokenRow';
import { WalletSwitcher } from '../components/WalletSwitcher';

export const HomeScreen: React.FunctionComponent = () => (
  <Stack paddingX={2} spacing={2} paddingTop={2}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box
        sx={{
          backgroundColor: 'grey.200',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
        }}
      />
      <WalletSwitcher />
    </Box>
    <OverviewCard />

    <TokenRow />
    <TokenRow />
    <TokenRow />
    <TokenRow />
  </Stack>
);
