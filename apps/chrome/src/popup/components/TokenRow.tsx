import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { Coin } from '@poketto/core';

interface Props {
  coin: Coin;
}
export const TokenRow: React.FunctionComponent<Props> = ({ coin }) => (
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
      <Typography sx={{ fontWeight: '600' }}>{coin.name}</Typography>
      <Typography fontSize="small">
        {coin.balance} {coin.name}
      </Typography>
    </Box>
    <IoChevronForwardOutline size={24} />
  </Paper>
);
