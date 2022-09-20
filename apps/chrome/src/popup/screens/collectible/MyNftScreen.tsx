import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useWallet } from '@poketto/core';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useStackNavigation } from '../../../navigation';
import { TitleHeader } from '../../../ui/TitleHeader';

export const MyNftScreen: React.FunctionComponent = () => {
  const { navigate } = useStackNavigation();
  const {
    token: { tokenCollections, fetchTokenCollections, fetchTokens, tokens },
  } = useWallet();

  useEffect(() => {
    fetchTokenCollections();
    fetchTokens();
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
      <Box paddingX={1} width={420}>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="nowrap"
          sx={{ overflowX: 'auto' }}
        >
          {tokenCollections.map((collection) => (
            <Card key={collection.sequenceNumber} sx={{ minWidth: 100 }}>
              <CardMedia
                component="img"
                height="100"
                image={collection.uri}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="h4">
                  {collection.collectionName}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {collection.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
      <Grid container spacing={1} px={1}>
        {tokens.map((token, index) => (
          <Grid key={index} item xs={6}>
            <Typography gutterBottom variant="subtitle1" component="h4">
              {token.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
