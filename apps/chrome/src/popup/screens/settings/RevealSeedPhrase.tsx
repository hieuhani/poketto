import Box from '@mui/material/Box';
import { IoArrowBackOutline } from 'react-icons/io5';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStackNavigation } from '../../../navigation';
import { Input } from '../../../ui/Input';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useWallet } from '@poketto/core';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { MnemonicView } from '../onboarding/components/MnemonicView';

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is mendatory')
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
      <Box py={1} px={2} display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <IoArrowBackOutline />
        </IconButton>
        <Typography variant="h6">Seed Phrase</Typography>
      </Box>
      <Box px={2}>
        {mnemonic ? (
          <MnemonicView mnemonic={mnemonic} />
        ) : (
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Stack spacing={2}>
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
                variant="contained"
                fullWidth
                type="submit"
                disabled={
                  !isValid || state === 'account:pending:revealSeedPhrase'
                }
              >
                Reveal
              </Button>
            </Stack>
          </form>
        )}
      </Box>
    </>
  );
};
