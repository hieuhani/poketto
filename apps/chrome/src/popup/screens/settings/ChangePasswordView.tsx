import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStackNavigation } from '../../../navigation';
import { useWallet } from '@poketto/core';
import toast from 'react-hot-toast';
import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';

const formSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Password is a required field')
    .min(3, 'Password must be at 3 char long'),
  password: Yup.string()
    .required('Password is a required field')
    .min(3, 'Password must be at 3 char long'),
  confirmPassword: Yup.string()
    .required('Confirm password is a required field')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
});

export interface PasswordFormState {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export const ChangePasswordView: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { state, changePassword, lockWallet } = useWallet();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });
  const onFormSubmit = async (data: PasswordFormState) => {
    try {
      await changePassword(data.currentPassword, data.password);
      toast.success('Your password has been changed');
      lockWallet();
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <>
      <TitleHeader goBack={goBack} title="Change password" />
      <Container>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-3">
            <Controller
              name="currentPassword"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Current Password"
                  error={!!errors.currentPassword?.message}
                  helperText={errors.currentPassword?.message}
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
                  placeholder="Confirm Password"
                  error={!!errors.confirmPassword?.message}
                  helperText={errors.confirmPassword?.message}
                  {...field}
                />
              )}
            />
            <Button fullWidth type="submit" disabled={!isValid}>
              Change Password
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};
