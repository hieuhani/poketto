import { useWallet } from '@poketto/core';
import { useSdk } from '../../sdk';
import { OnboardingNavigation } from '../onboarding/OnboardingNavigation';
import { ReviewRequestScreen } from './ReviewRequestScreen';

export const SdkNavigation: React.FunctionComponent = () => {
  const { password, account } = useWallet();
  const sdk = useSdk();

  if (!password) {
    return <OnboardingNavigation />;
  }
  if (sdk.request?.method === 'connect') {
    return (
      <ReviewRequestScreen
        account={account}
        origin={sdk.origin!}
        request={sdk.request}
        tabId={sdk.tabId}
      />
    );
  }
  return <div>Undefined</div>;
};
