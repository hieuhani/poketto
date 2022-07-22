import Box from '@mui/material/Box';
import { OverviewCard } from '../components/OverviewCard';

export const HomeScreen: React.FunctionComponent = () => (
  <Box paddingX={2}>
    <Box paddingY={2}>
      <Box
        sx={{
          backgroundColor: 'grey.200',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
        }}
      />
    </Box>
    <OverviewCard />
  </Box>
);
