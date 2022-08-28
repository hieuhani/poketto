import { StackNavigation } from '../../../navigation';
import { ForgotPasswordScreen } from './ForgotPasswordScreen';
import { PasswordResumeScreen } from './PasswordResumeScreen';

export const OnboardingNavigation: React.FunctionComponent = () => (
  <StackNavigation
    routes={[
      { route: 'password_resume', screen: <PasswordResumeScreen /> },
      { route: 'forgot_password', screen: <ForgotPasswordScreen /> },
    ]}
  />
);
