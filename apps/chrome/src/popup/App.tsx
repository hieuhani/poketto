import { useWallet } from '@poketto/core';
import { GlobalLoading } from './components/GlobalLoading';
import { useSdk } from './sdk';
import { Layout } from './components/Layout';
import { OnboardingNavigation } from './screens/onboarding/OnboardingNavigation';
import { HomeNavigation } from './screens/home/HomeNavigation';
import { NewWalletNavigation } from './screens/onboarding/NewWalletNavigation';
import { SdkNavigation } from './screens/sdk';

export const App: React.FunctionComponent = () => {
  const { account, state, oneTimeMnemonic, password } = useWallet();
  const sdk = useSdk();

  const loading = [
    'account:pending:submitTransaction',
    'account:pending:createNewSiblingAccount',
    'account:pending:createAccount',
    'account:pending:addTrustedOrigin',
  ].includes(state);

  const authenticated =
    account !== null &&
    !oneTimeMnemonic &&
    ![
      'account:pending:createAccount',
      'account:pending:loadAccount',
      'account:fulfilled:noAccount',
      ,
    ].includes(state);
  return (
    <>
      <Layout>
        <div className="h-[calc(100%-3rem)] overflow-y-auto">
          {sdk.valid ? (
            <SdkNavigation />
          ) : state === 'account:pending:loadAccount' && !password ? (
            <OnboardingNavigation />
          ) : authenticated ? (
            <HomeNavigation />
          ) : (
            <NewWalletNavigation />
          )}
        </div>
      </Layout>
      <GlobalLoading loading={loading} />
    </>
  );
};
