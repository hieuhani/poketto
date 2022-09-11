import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { Input } from '../../../../ui/Input';

const formSchema = Yup.object().shape({
  mnemonic: Yup.string().required('Mnemonic is a required field'),
  password: Yup.string()
    .required('Password is a required field')
    .min(3, 'Password must be at 3 char long'),
  confirmPassword: Yup.string()
    .required('Confirm password is a required field')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
});

export interface ForgotPasswordFormState {
  password: string;
  confirmPassword: string;
  mnemonic: string;
}
interface Props {
  onSubmit: (data: ForgotPasswordFormState) => void;
  loading: boolean;
}

export const ForgotPasswordForm: React.FunctionComponent<Props> = ({
  onSubmit,
  loading,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
      mnemonic: '',
    },
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });
  const onFormSubmit = (data: ForgotPasswordFormState) => {
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Box px={4} py={4}>
        <Typography variant="h5">Forgot password</Typography>
        <Typography variant="subtitle1">
          Verify your seed phrase and set new password.
        </Typography>
      </Box>
      <Stack px={4} spacing={2}>
        <Controller
          name="mnemonic"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input
              multiline
              autoFocus={true}
              autoComplete="off"
              rows={2}
              placeholder="Mnemonic seed phrase"
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              {...field}
            />
          )}
        />
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
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Confirm password"
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
              {...field}
            />
          )}
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={!isValid || loading}
        >
          Continue
        </Button>
      </Stack>
    </form>
  );
};
