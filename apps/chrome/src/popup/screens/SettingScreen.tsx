import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FaFaucet } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { green, orange } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import { SettingGroup } from '../components/SettingGroup';
import { SettingItem } from '../components/SettingItem';
import { TitleHeader } from '../components/TitleHeader';
import { DrawerNavigation } from '../../navigation';
import { NetworksView } from './settings/NetworksView';
import { useWallet } from '@poketto/core';

export const SettingScreen: React.FunctionComponent = () => {
  const { fundAccountWithFaucet, state } = useWallet();
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
                description="Get your +5000 TestCoin"
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
          </Stack>
        </Box>
      )}
    </DrawerNavigation>
  );
};
