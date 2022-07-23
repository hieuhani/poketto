import { useStackNavigation } from '~/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export const SecretRecoveryScreen: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  return (
    <Box pb={4}>
      <Box py={1} px={2}>
        <IconButton aria-label="delete" onClick={goBack}>
          <IoArrowBackOutline />
        </IconButton>
      </Box>
      <Divider />
      <Box px={4} py={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5">Secret Recovery Phrase</Typography>
          <Typography variant="subtitle1">
            This phrase is the ONLY way to recover your wallet. Please keep it's
            secured
          </Typography>
        </Box>
      </Box>
      <Box px={4}>xx</Box>
    </Box>
  );
};
