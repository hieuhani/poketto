import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { IoArrowBackOutline } from 'react-icons/io5';
import { TitleHeader } from '../../components/TitleHeader';
import { useStackNavigation } from '../../../navigation';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useWallet } from '@poketto/core';

interface Props {
  collectionName?: string;
}

export const CollectionNftsScreen: React.FunctionComponent<Props> = ({
  collectionName,
}) => {
  const { goBack, navigate } = useStackNavigation();
  const {
    token: { fetchTokens },
  } = useWallet();

  useEffect(() => {
    fetchTokens();
  }, []);
  return (
    <>
      <Box px={1} display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <IoArrowBackOutline />
        </IconButton>
        <TitleHeader title="NFT items" />
      </Box>
      <Box px={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('create_token', { collectionName })}
        >
          Create NFT
        </Button>
      </Box>
    </>
  );
};
