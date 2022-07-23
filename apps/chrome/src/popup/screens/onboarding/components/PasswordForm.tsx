import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { Input } from '~/ui/Input';

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is mendatory')
    .min(3, 'Password must be at 3 char long'),
  confirmPassword: Yup.string()
    .required('Confirm password is mendatory')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
});

export interface PasswordFormState {
  password: string;
  confirmPassword: string;
}
interface Props {
  onSubmit: (data: PasswordFormState) => void;
  loading: boolean;
}

export const PasswordForm: React.FunctionComponent<Props> = ({
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
    },
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
  });
  const onFormSubmit = (data: PasswordFormState) => {
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Box px={4} py={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5">Create a password</Typography>
          <Typography variant="subtitle1">
            Use this password to unlock your wallet
          </Typography>
        </Box>
      </Box>
      <Stack px={4} spacing={2}>
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
