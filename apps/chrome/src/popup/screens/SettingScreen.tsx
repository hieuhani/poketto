import { StackNavigation } from '../../navigation';
import { RevealSeedPhrase } from './settings/RevealSeedPhrase';
import { SettingHome } from './settings/SettingHome';

export const SettingScreen: React.FunctionComponent = () => {
  return (
    <StackNavigation
      routes={[
        { route: 'home', screen: <SettingHome /> },
        { route: 'reveal_seed_phrase', screen: <RevealSeedPhrase /> },
      ]}
    />
  );
};
