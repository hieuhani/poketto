import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useWallet } from '@poketto/core';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

import Grid from '@mui/material/Grid';
import { useStackNavigation } from '../../../navigation';
import { TitleHeader } from '../../components/TitleHeader';

export const MyNftScreen: React.FunctionComponent = () => {
  const { navigate } = useStackNavigation();
  const {
    token: { tokenCollections, fetchTokenCollections },
  } = useWallet();

  useEffect(() => {
    fetchTokenCollections();
  }, []);
  return (
    <>
      <Box px={1}>
        <TitleHeader title="My NFT" />
      </Box>
      <Box paddingX={1} marginBottom={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('create_collection')}
        >
          Create collection
        </Button>
      </Box>
      <Box paddingX={1}>
        <Grid container spacing={1}>
          {tokenCollections.map((collection) => (
            <Grid item xs={6} key={collection.sequenceNumber}>
              <Card
                onClick={() =>
                  navigate('collection_nfts', {
                    collectionName: collection.collectionName,
                  })
                }
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={collection.uri}
                  alt=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {collection.collectionName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {collection.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
