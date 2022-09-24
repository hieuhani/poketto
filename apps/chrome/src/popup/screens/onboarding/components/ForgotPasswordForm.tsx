import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';

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
      <h3 className="mb-3">Verify your seed phrase and set new password.</h3>
      <div className="space-y-3">
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
        <Button fullWidth type="submit" disabled={!isValid || loading}>
          Continue
        </Button>
      </div>
    </form>
  );
};
