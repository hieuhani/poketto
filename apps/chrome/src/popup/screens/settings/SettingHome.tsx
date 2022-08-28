import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FaSeedling, FaKey } from 'react-icons/fa';
import {
  IoSettingsSharp,
  IoLogOut,
  IoLockClosed,
  IoApps,
} from 'react-icons/io5';
import { MdPassword } from 'react-icons/md';
import { green, orange, red, blue, brown, yellow } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import { SettingGroup } from '../../components/SettingGroup';
import { SettingItem } from '../../components/SettingItem';
import { TitleHeader } from '../../components/TitleHeader';
import { DrawerNavigation, useStackNavigation } from '../../../navigation';
import { NetworksView } from './NetworksView';
import { useWallet } from '@poketto/core';

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
        <Box px={1}>
          <TitleHeader title="Settings" />
          <Stack spacing={2}>
            <SettingGroup>
              <SettingItem
                title="Seed Phrase"
                description="Reveal your seed phrase"
                icon={FaSeedling}
                iconBgColor={green[600]}
                onClick={() => stackNavigate('reveal_seed_phrase')}
              />
              <Divider />
              <SettingItem
                title="Private key"
                description="Reveal your private key"
                icon={FaKey}
                iconBgColor={brown[600]}
                onClick={() => stackNavigate('reveal_private_key')}
              />
              <Divider />

              <SettingItem
                title="Change password"
                description="Change your wallet password"
                icon={MdPassword}
                iconBgColor={yellow[700]}
                onClick={() => stackNavigate('change_password')}
              />
            </SettingGroup>
            <SettingGroup>
              <SettingItem
                title="Connected apps"
                description="Manage your connected apps"
                icon={IoApps}
                iconBgColor={blue[400]}
                onClick={() => stackNavigate('connected_apps')}
              />
              <SettingItem
                title="Network"
                description="Select APTOS network"
                icon={IoSettingsSharp}
                iconBgColor={orange[600]}
                onClick={() => navigate('networks')}
              />
            </SettingGroup>
            <SettingGroup>
              <SettingItem
                title="Lock Wallet"
                icon={IoLockClosed}
                iconBgColor={blue[600]}
                onClick={lockWallet}
              />
              <Divider />
              <SettingItem
                title="Logout"
                icon={IoLogOut}
                iconBgColor={red[600]}
                disabled={state === 'account:pending:logout'}
                onClick={logout}
              />
            </SettingGroup>
          </Stack>
        </Box>
      )}
    </DrawerNavigation>
  );
};
