import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is a required field')
    .min(3, 'Password must be at 3 char long'),
  confirmPassword: Yup.string()
    .required('Confirm password is a required field')
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
    mode: 'onChange',
  });
  const onFormSubmit = (data: PasswordFormState) => {
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h5 className="mb-3">Use this password to unlock your wallet</h5>
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
