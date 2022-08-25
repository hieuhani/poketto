import { StackNavigation } from '../../../navigation';
import { ImportWalletScreen } from './ImportWalletScreen';
import { NewWalletScreen } from './NewWalletScreen';
import { RevealMnemonicScreen } from './RevealMnemonicScreen';
import { WelcomeScreen } from './WelcomeScreen';

export const NewWalletNavigation: React.FunctionComponent = () => (
  <StackNavigation
    routes={[
      { route: 'welcome', screen: <WelcomeScreen /> },
      { route: 'new_wallet', screen: <NewWalletScreen /> },
      { route: 'import_wallet', screen: <ImportWalletScreen /> },
      { route: 'reveal_mnemonic', screen: <RevealMnemonicScreen /> },
    ]}
  />
);
