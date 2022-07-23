import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { IoChevronForwardOutline } from 'react-icons/io5';

export const TokenRow: React.FunctionComponent = () => (
  <Paper
    component={ButtonBase}
    sx={{
      backgroundColor: 'grey.900',
      paddingX: 2,
      paddingY: 2,
      display: 'flex',
      borderRadius: 2,
      alignItems: 'center',
      textAlign: 'left',
    }}
  >
    <Box
      width={46}
      height={46}
      sx={{ backgroundColor: 'grey.600', borderRadius: 4, marginRight: 2 }}
    />
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: '600' }}>Aptos</Typography>
      <Typography fontSize="small">93.49 APT</Typography>
    </Box>
    <IoChevronForwardOutline size={24} />
  </Paper>
);
