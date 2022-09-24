import { TitleHeader } from '../../../ui/TitleHeader';
import { useStackNavigation } from '../../../navigation';
import { Button } from '@ui/Button';
import { Container } from '@ui/Container';

interface Props {
  collectionName?: string;
}

export const CollectionNftsScreen: React.FunctionComponent<Props> = ({
  collectionName,
}) => {
  const { goBack, navigate } = useStackNavigation();

  return (
    <>
      <TitleHeader title="Collection Items" goBack={goBack} />

      <Container>
        <Button
          fullWidth
          onClick={() => navigate('create_token', { collectionName })}
        >
          Create NFT
        </Button>
      </Container>
    </>
  );
};
