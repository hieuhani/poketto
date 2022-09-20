import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStackNavigation } from '../../../navigation';
import { Input } from '../../../ui/Input';
import { useWallet } from '@poketto/core';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { MnemonicView } from '../onboarding/components/MnemonicView';
import { TitleHeader } from '../../../ui/TitleHeader';
import { Container } from '@ui/Container';
import { Button } from '@ui/Button';

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is a required field')
    .min(3, 'Password must be at 3 char long'),
});

export interface PasswordFormState {
  password: string;
}

export const RevealSeedPhrase: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { state, revealSeedPhrase } = useWallet();
  const [mnemonic, setMnemonic] = useState('');
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
      const mnemonicSeedPhrase = await revealSeedPhrase(data.password);
      setMnemonic(mnemonicSeedPhrase);
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <>
      <TitleHeader goBack={goBack} title="Seed Phrase" />
      <Container>
        {mnemonic ? (
          <MnemonicView mnemonic={mnemonic} />
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
                  !isValid || state === 'account:pending:revealSeedPhrase'
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
