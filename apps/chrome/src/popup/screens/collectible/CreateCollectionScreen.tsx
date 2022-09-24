import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { TitleHeader } from '../../../ui/TitleHeader';
import { useStackNavigation } from '../../../navigation';
import { useWallet } from '@poketto/core';
import { useBoolean } from '../../hooks/use-boolean';
import { Container } from '@ui/Container';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';

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

export const CreateCollectionScreen: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { createCollection } = useWallet();
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
      const tokenHash = await createCollection(data);
      console.info(tokenHash);

      goBack();
      toast.success('Your NFT collection is created');
    } catch (e: unknown) {
      console.error(e);
      toast.error('Error');
    }
    setLoading(false);
  };
  return (
    <>
      <TitleHeader goBack={goBack} title="Create NFT collection" />
      <Container>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3">
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input
                type="text"
                label="Name"
                placeholder="NFT Collection Name"
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
                label="Description"
                placeholder="NFT Collection Description"
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
                label="URI"
                type="text"
                placeholder="NFT Collection (URI)"
                error={!!errors.uri?.message}
                helperText={errors.uri?.message}
                {...field}
              />
            )}
          />

          <Button fullWidth type="submit" disabled={!isValid || loading}>
            Create NFT
          </Button>
        </form>
      </Container>
    </>
  );
};
