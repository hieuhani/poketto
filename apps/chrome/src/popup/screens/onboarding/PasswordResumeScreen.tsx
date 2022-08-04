import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '../../../ui/Input';
import { useWallet } from '@poketto/core';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is mendatory')
    .min(3, 'Password must be at 3 char long'),
});

export interface PasswordResumeFormState {
  password: string;
}
export const PasswordResumeScreen: React.FunctionComponent = () => {
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
        <Stack spacing={2}>
          <Typography variant="h6">
            Please enter your password to unlock
          </Typography>
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
            disabled={!isValid}
          >
            Unlock
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
