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
    <Box width={44} height={44} sx={{ borderRadius: 4, marginRight: 2 }}>
      <svg
        id="a2e9f51b-359e-4615-886a-42805a3d0c79"
        data-name="Icon Logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 60"
        style={{ fill: '#FFF' }}
      >
        <path d="M46.47,20.07H41.16a2.15,2.15,0,0,1-1.61-.72l-2.16-2.42a1.69,1.69,0,0,0-2.53,0L33,19a3.21,3.21,0,0,1-2.39,1.07h-29A30.26,30.26,0,0,0,0,27.48H27.42a1.78,1.78,0,0,0,1.28-.54l2.56-2.66a1.67,1.67,0,0,1,1.22-.52h.1a1.7,1.7,0,0,1,1.27.57L36,26.75a2.17,2.17,0,0,0,1.61.73H60a30.26,30.26,0,0,0-1.58-7.41h-12Z"></path>{' '}
        <path d="M16.6,43.05a1.78,1.78,0,0,0,1.27-.54l2.56-2.66a1.7,1.7,0,0,1,1.22-.52h.1A1.7,1.7,0,0,1,23,39.9l2.15,2.42a2.14,2.14,0,0,0,1.62.73H57.12a29.73,29.73,0,0,0,2.47-7.48H30.47a2.17,2.17,0,0,1-1.62-.72L26.7,32.42a1.69,1.69,0,0,0-2.53,0L22.32,34.5a3.18,3.18,0,0,1-2.38,1.07H.41a29.73,29.73,0,0,0,2.47,7.48Z"></path>{' '}
        <path d="M38.12,12a1.74,1.74,0,0,0,1.27-.54L42,8.78a1.69,1.69,0,0,1,1.22-.51h.1a1.69,1.69,0,0,1,1.27.56l2.15,2.43a2.17,2.17,0,0,0,1.62.72h5.77A30.19,30.19,0,0,0,5.92,12Z"></path>{' '}
        <path d="M26.53,50.46H18.64A2.17,2.17,0,0,1,17,49.74l-2.15-2.43a1.71,1.71,0,0,0-2.53,0l-1.85,2.08a3.18,3.18,0,0,1-2.38,1.07H8a30.16,30.16,0,0,0,44,0Z"></path>
      </svg>
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: '600' }}>{coin.name}</Typography>
      <Typography fontSize="small">
        {coin.balance} {coin.name}
      </Typography>
    </Box>
    <IoChevronForwardOutline size={24} />
  </Paper>
);
