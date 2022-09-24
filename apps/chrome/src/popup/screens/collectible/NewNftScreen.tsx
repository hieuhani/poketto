import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { useStackNavigation } from '../../../navigation';
import { useWallet } from '@poketto/core';
import { useBoolean } from '../../hooks/use-boolean';
import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';
import { Input } from '@ui/Input';
import { Button } from '@ui/Button';

const formSchema = Yup.object().shape({
  name: Yup.string().required('NFT name is a required field'),
  description: Yup.string().required('NFT description is a required field'),
  uri: Yup.string().required('NFT data is a required field'),
});

export interface CreateNftFormState {
  name: string;
  description: string;
  uri: string;
}

interface Props {
  collectionName?: string;
}
export const NewNftScreen: React.FunctionComponent<Props> = ({
  collectionName,
}) => {
  const { goBack } = useStackNavigation();
  const { createToken } = useWallet();
  const { value: loading, setValue: setLoading } = useBoolean();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      uri: '',
    },
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const onFormSubmit = async (data: CreateNftFormState) => {
    setLoading(true);
    try {
      const tokenHash = await createToken({
        ...data,
        collectionName: collectionName || 'MyCollection',
        supply: 1,
      });

      goBack();
      toast.success('Your NFT is created');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Error');
    }
    setLoading(false);
  };

  return (
    <>
      <TitleHeader title="Create NFT" goBack={goBack} />
      <Container>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-3">
            <div>
              <h3>Collection</h3>
              <p>{collectionName}</p>
            </div>

            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  type="text"
                  label="NFT Name"
                  placeholder="NFT Name"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  type="text"
                  label="NFT Description"
                  placeholder="NFT Description"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="uri"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  type="text"
                  label="NFT Data (URI)"
                  placeholder="NFT URI"
                  error={!!errors.uri?.message}
                  helperText={errors.uri?.message}
                  {...field}
                />
              )}
            />
            <Button type="submit" fullWidth disabled={!isValid || loading}>
              Create NFT
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};
