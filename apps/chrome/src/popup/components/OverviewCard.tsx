import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { IoChevronForwardOutline, IoSendOutline } from 'react-icons/io5';

export const OverviewCard: React.FunctionComponent = () => (
  <Paper
    sx={{
      background: 'linear-gradient(223.61deg, #547AFF 0%, #413DFF 100%)',
      borderRadius: 4,
    }}
  >
    <ButtonBase
      sx={{
        width: '100%',
        justifyContent: 'flex-start',
        textAlign: 'left',
        paddingX: 3,
        paddingY: 3,
        borderBottom: '1px solid',
        borderColor: 'grey.500',
      }}
    >
      <Box marginRight="auto">
        <Typography>Account balance</Typography>
        <Typography variant="h5">$185</Typography>
      </Box>
      <IoChevronForwardOutline size={24} />
    </ButtonBase>
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <ButtonBase
        sx={{ paddingY: 2, display: 'flex', flexDirection: 'column' }}
      >
        <IoSendOutline size={24} />
        Deposit
      </ButtonBase>
      <ButtonBase
        sx={{ paddingY: 2, display: 'flex', flexDirection: 'column' }}
      >
        <IoSendOutline size={24} />
        Send
      </ButtonBase>
    </Box>
  </Paper>
);
