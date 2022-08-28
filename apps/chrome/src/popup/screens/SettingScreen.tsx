import { StackNavigation } from '../../navigation';
import { ChangePasswordView } from './settings/ChangePasswordView';
import { ConnectedAppsView } from './settings/ConnectedAppsView';
import { RevealPrivateKey } from './settings/RevealPrivateKey';
import { RevealSeedPhrase } from './settings/RevealSeedPhrase';
import { SettingHome } from './settings/SettingHome';

export const SettingScreen: React.FunctionComponent = () => {
  return (
    <StackNavigation
      routes={[
        { route: 'home', screen: <SettingHome /> },
        { route: 'reveal_seed_phrase', screen: <RevealSeedPhrase /> },
        { route: 'reveal_private_key', screen: <RevealPrivateKey /> },
        { route: 'change_password', screen: <ChangePasswordView /> },
        { route: 'connected_apps', screen: <ConnectedAppsView /> },
      ]}
    />
  );
};
