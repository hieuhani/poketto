import Box from '@mui/material/Box';
import { IoArrowBackOutline } from 'react-icons/io5';
import IconButton from '@mui/material/IconButton';
import { useStackNavigation } from '../../../navigation';

export const TransferScreen: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  return (
    <Box>
      <Box py={1} px={2}>
        <IconButton onClick={goBack}>
          <IoArrowBackOutline />
        </IconButton>
      </Box>
    </Box>
  );
};
