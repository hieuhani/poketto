import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { HexAddress } from '../../ui/HexAddress';
import { BackgroundPattern } from './BackgroundPattern';

interface Props {
  balance: number;
  address: string;
}

const formatMoney = (amount: number) => {
  const balanceDesc = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  return balanceDesc.substring(1);
};

export const OverviewCard: React.FunctionComponent<Props> = ({
  balance,
  address,
}) => {
  return (
    <Box borderRadius={4} position="relative" overflow="hidden">
      <Box
        position="absolute"
        left={0}
        top={0}
        right={0}
        bottom={0}
        sx={{
          backgroundColor:
            'linear-gradient(249.45deg, #1A58F7 0%, #001E6B 100%)',
        }}
      >
        <BackgroundPattern />
      </Box>
      <Paper
        sx={{
          padding: 3,
          position: 'relative',
          backgroundColor: 'transparent',
        }}
      >
        <Box marginBottom={4}>
          <HexAddress address={address} />
          <Typography color="grey.100">Account Balance</Typography>
        </Box>

        <Typography variant="h4">{formatMoney(balance)}</Typography>
      </Paper>
    </Box>
  );
};
