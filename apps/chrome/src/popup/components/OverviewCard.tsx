import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import {
  IoChevronForwardOutline,
  IoSendOutline,
  IoEyeOffOutline,
} from 'react-icons/io5';

export const OverviewCard: React.FunctionComponent = () => (
  <Paper
    sx={{
      background:
        'linear-gradient(to right bottom, rgb(0, 127, 255), rgb(0, 89, 178) 120%)',
      borderRadius: 4,
      overflow: 'hidden',
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
        <Box display="flex" alignItems="center">
          <Typography marginRight={1}>Account balance</Typography>
          <IoEyeOffOutline size={18} />
        </Box>
        <Typography variant="h5">$186.98</Typography>
      </Box>
      <IoChevronForwardOutline size={24} />
    </ButtonBase>
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <ButtonBase
        sx={{ paddingY: 2, display: 'flex', flexDirection: 'column' }}
      >
        <IoSendOutline size={26} />
        <Typography>Deposit</Typography>
      </ButtonBase>
      <ButtonBase
        sx={{ paddingY: 2, display: 'flex', flexDirection: 'column' }}
      >
        <IoSendOutline size={26} />
        <Typography>Send</Typography>
      </ButtonBase>
    </Box>
  </Paper>
);
