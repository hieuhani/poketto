import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStackNavigation } from '../../../navigation';
import { useWallet } from '@poketto/core';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { PrivateKeyView } from '../onboarding/components/PrivateKeyView';
import { Container } from '@ui/Container';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';
import { TitleHeader } from '@ui/TitleHeader';

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is a required field')
    .min(3, 'Password must be at 3 char long'),
});

export interface PasswordFormState {
  password: string;
}

export const RevealPrivateKey: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { state, revealPrivateKey } = useWallet();
  const [privateKey, setPrivateKey] = useState('');
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });
  const onFormSubmit = async (data: PasswordFormState) => {
    try {
      const privateKey = await revealPrivateKey(data.password);
      setPrivateKey(privateKey);
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <>
      <TitleHeader goBack={goBack} title="Private Key" />
      <Container>
        {privateKey ? (
          <PrivateKeyView privateKey={privateKey} />
        ) : (
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="space-y-3">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="Password"
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                    {...field}
                  />
                )}
              />
              <Button
                fullWidth
                type="submit"
                disabled={
                  !isValid || state === 'account:pending:revealPrivateKey'
                }
              >
                Reveal
              </Button>
            </div>
          </form>
        )}
      </Container>
    </>
  );
};
