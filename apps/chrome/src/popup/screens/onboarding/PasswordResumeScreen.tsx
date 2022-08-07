import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useWallet } from '@poketto/core';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Logo } from '../../components/Logo';
import { Input } from '../../../ui/Input';
import { useStackNavigation } from '../../../navigation';

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is mendatory')
    .min(3, 'Password length should be at least 3 characters long'),
});

export interface PasswordResumeFormState {
  password: string;
}
export const PasswordResumeScreen: React.FunctionComponent = () => {
  const { navigate } = useStackNavigation();
  const { updatePassword, passwordError } = useWallet();
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

  const onFormSubmit = (data: PasswordResumeFormState) => {
    updatePassword(data.password);
  };
  return (
    <Box px={4} py={4}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box
          marginY={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Logo />
          <Typography marginTop={3} variant="h5">
            Welcome back
          </Typography>
        </Box>
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
          {passwordError}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            size="large"
            disabled={!isValid}
          >
            Unlock
          </Button>
          <Button fullWidth onClick={() => navigate('forgot_password')}>
            Forgot password?
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
