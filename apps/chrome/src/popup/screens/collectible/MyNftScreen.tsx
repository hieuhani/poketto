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
      <TitleHeader title="My NFT" />
      <Container>
        <Button fullWidth onClick={() => navigate('create_collection')}>
          Create collection
        </Button>
        <div className="space-y-2">
          {tokenCollections.map((collection) => (
            <div key={collection.sequenceNumber}>
              <div>
                <img height="100" src={collection.uri} alt="" />
              </div>
              <div>
                <h4>{collection.collectionName}</h4>
                <p>{collection.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          {tokens.map((token, index) => (
            <div key={index}>
              <h4>{token.name}</h4>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};
