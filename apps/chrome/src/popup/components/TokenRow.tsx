import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TokenRow: React.FunctionComponent = () => (
  <Paper
    sx={{
      backgroundColor: 'grey.900',
      paddingX: 2,
      paddingY: 2,
      display: 'flex',
    }}
  >
    <Box
      width={46}
      height={46}
      sx={{ backgroundColor: 'grey.600', borderRadius: 4, marginRight: 2 }}
    />
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: '600' }}>Aptos</Typography>
      <Typography fontSize="small">5Hb9...bXCg</Typography>
    </Box>
    <Box>
      <Typography color="gray.500">93.49 APT</Typography>
    </Box>
  </Paper>
);
