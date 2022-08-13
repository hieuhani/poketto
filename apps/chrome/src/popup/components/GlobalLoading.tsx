import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  loading: boolean;
}
export const GlobalLoading: React.FunctionComponent<Props> = ({ loading }) => {
  return (
    <Backdrop open={loading} sx={{ zIndex: 2000 }}>
      <Box
        width="80px"
        height="80px"
        sx={{
          backgroundColor: 'grey.800',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
        }}
      >
        <CircularProgress color="inherit" size={26} />
      </Box>
    </Backdrop>
  );
};
