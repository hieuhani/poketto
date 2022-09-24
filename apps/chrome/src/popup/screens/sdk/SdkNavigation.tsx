import Box from '@mui/material/Box';
import { useWallet } from '@poketto/core';
import { useSdk } from '../../sdk';
import { OnboardingNavigation } from '../onboarding/OnboardingNavigation';
import { CreateNFTCollectionScreen } from './CreateNFTCollectionScreen';
import { ReviewRequestScreen } from './ReviewRequestScreen';

export const SdkNavigation: React.FunctionComponent = () => {
  const { password, account } = useWallet();
  const sdk = useSdk();
  console.log({ sdk })

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
  if (sdk.request?.method === 'createNFTCollection') {
    return ( <CreateNFTCollectionScreen
      account={account}
      origin={sdk.origin!}
      request={sdk.request}
      tabId={sdk.tabId} />)
  }
  return <Box>Undefined</Box>;
};
