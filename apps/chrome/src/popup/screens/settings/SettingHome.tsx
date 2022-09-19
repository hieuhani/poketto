import { FaSeedling, FaKey } from 'react-icons/fa';
import {
  IoSettingsSharp,
  IoLogOut,
  IoLockClosed,
  IoApps,
} from 'react-icons/io5';
import { MdPassword } from 'react-icons/md';
import { SettingItem } from '../../../ui/SettingItem';
import { TitleHeader } from '../../components/TitleHeader';
import { DrawerNavigation, useStackNavigation } from '../../../navigation';
import { NetworksView } from './NetworksView';
import { useWallet } from '@poketto/core';
import { SettingGroup } from '@ui/SettingGroup';

export const SettingHome: React.FunctionComponent = () => {
  const { state, logout, lockWallet } = useWallet();
  const { navigate: stackNavigate } = useStackNavigation();
  return (
    <DrawerNavigation
      routes={[
        {
          route: 'networks',
          screen: <NetworksView />,
        },
      ]}
    >
      {({ navigate }) => (
        <div className="px-2">
          <TitleHeader title="Settings" />
          <div className="space-y-3">
            <SettingGroup>
              <SettingItem
                title="Seed Phrase"
                description="Reveal your seed phrase"
                icon={FaSeedling}
                iconClassname="bg-green-500"
                onClick={() => stackNavigate('reveal_seed_phrase')}
              />
              <SettingItem
                title="Private key"
                description="Reveal your private key"
                icon={FaKey}
                iconClassname="bg-yellow-600"
                onClick={() => stackNavigate('reveal_private_key')}
              />

              <SettingItem
                title="Change password"
                description="Change your wallet password"
                icon={MdPassword}
                iconClassname="bg-yellow-300"
                onClick={() => stackNavigate('change_password')}
              />
            </SettingGroup>
            <SettingGroup>
              <SettingItem
                title="Connected apps"
                description="Manage your connected apps"
                icon={IoApps}
                iconClassname="bg-blue-400"
                onClick={() => stackNavigate('connected_apps')}
              />
              <SettingItem
                title="Network"
                description="Select APTOS network"
                icon={IoSettingsSharp}
                iconClassname="bg-orange-400"
                onClick={() => navigate('networks')}
              />
            </SettingGroup>
            <SettingGroup>
              <SettingItem
                title="Lock Wallet"
                icon={IoLockClosed}
                iconClassname="bg-blue-600"
                onClick={lockWallet}
              />
              <SettingItem
                title="Logout"
                icon={IoLogOut}
                iconClassname="bg-red-400"
                disabled={state === 'account:pending:logout'}
                onClick={logout}
              />
            </SettingGroup>
          </div>
        </div>
      )}
    </DrawerNavigation>
  );
};
