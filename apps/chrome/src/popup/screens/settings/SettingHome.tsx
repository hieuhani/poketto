import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FaFaucet, FaSeedling, FaKey } from 'react-icons/fa';
import { IoSettingsSharp, IoLogOut, IoLockClosed } from 'react-icons/io5';
import { green, orange, red, blue, brown, yellow } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import { SettingGroup } from '../../components/SettingGroup';
import { SettingItem } from '../../components/SettingItem';
import { TitleHeader } from '../../components/TitleHeader';
import { DrawerNavigation, useStackNavigation } from '../../../navigation';
import { NetworksView } from './NetworksView';
import { useWallet } from '@poketto/core';

export const SettingHome: React.FunctionComponent = () => {
  const { fundAccountWithFaucet, state, logout, lockWallet } = useWallet();
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
        <Box px={2}>
          <TitleHeader title="Settings" />
          <Stack spacing={2}>
            <SettingGroup>
              <SettingItem
                title="Faucet"
                description="Get your +5000 AptosCoin"
                icon={FaFaucet}
                iconBgColor={green[600]}
                onClick={() => fundAccountWithFaucet(5000)}
                disabled={state === 'account:pending:faucetFundAccount'}
              />
              <Divider />
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
                title="Seed Phrase"
                description="Reveal your seed phrase"
                icon={FaSeedling}
                iconBgColor={brown[600]}
                onClick={() => stackNavigate('reveal_seed_phrase')}
              />
              <Divider />
              <SettingItem
                title="Change Password"
                description="Change your wallet password"
                icon={FaKey}
                iconBgColor={yellow[700]}
                onClick={() => stackNavigate('change_password')}
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
