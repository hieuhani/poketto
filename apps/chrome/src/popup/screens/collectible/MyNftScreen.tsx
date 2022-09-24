import { useWallet } from '@poketto/core';
import { useEffect } from 'react';
import { useStackNavigation } from '../../../navigation';
import { TitleHeader } from '../../../ui/TitleHeader';
import { Button } from '@ui/Button';
import { Container } from '@ui/Container';

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
      <TitleHeader title="Collectible" />
      <Container className="space-y-3">
        <div className="flex items-center justify-between">
          <h3>NFT Collection</h3>
          <Button variant="link" onClick={() => navigate('create_collection')}>
            Create collection
          </Button>
        </div>
        <div className="flex space-x-3 overflow-x-auto">
          {tokenCollections.map((collection) => (
            <button
              key={collection.sequenceNumber}
              className="text-left"
              onClick={() =>
                navigate('collection_nfts', {
                  collectionName: collection.collectionName,
                })
              }
            >
              <div className="h-36 w-max">
                <img
                  src={collection.uri}
                  alt=""
                  className="h-full rounded-lg object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{collection.collectionName}</h4>
                <p className="text-sm">{collection.description}</p>
              </div>
            </button>
          ))}
        </div>
        <div>
          {tokens.map((token, index) => (
            <div key={index}>
              <div className="h-36 w-max">
                <img
                  // src={token}
                  alt=""
                  className="h-full rounded-lg object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{token.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};
