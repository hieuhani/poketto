import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useWallet } from '@poketto/core';
import Divider from '@mui/material/Divider';
import toast from 'react-hot-toast';
import { useStackNavigation } from '../../../navigation';
import { Fragment } from 'react';
import Button from '@mui/material/Button';
import { useBoolean } from '../../hooks/use-boolean';
import { SettingGroup } from '@ui/SettingGroup';
import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';

export const ConnectedAppsView: React.FunctionComponent = () => {
  const { goBack } = useStackNavigation();
  const { value: loading, setValue: setLoading } = useBoolean();
  const { currentAccountTrustedOrigins, removeTrustedOrigin } = useWallet();
  const handleRemoveOrigin = async (origin: string) => {
    setLoading(true);
    await removeTrustedOrigin(origin);
    setLoading(false);
    toast.success(`${origin} is removed`);
  };

  return (
    <>
      <TitleHeader goBack={goBack} title="Connected Apps" />

      <Container className="space-y-2">
        <SettingGroup>
          {currentAccountTrustedOrigins.map((origin, index) => (
            <Fragment key={origin}>
              <Box px={2} py={2} display="flex" alignItems="center">
                <Typography>{origin}</Typography>
                <Button
                  size="small"
                  sx={{ marginLeft: 'auto' }}
                  color="error"
                  onClick={() => handleRemoveOrigin(origin)}
                  disabled={loading}
                >
                  Revoke
                </Button>
              </Box>
              {index < currentAccountTrustedOrigins.length - 1 && <Divider />}
            </Fragment>
          ))}
        </SettingGroup>
      </Container>
    </>
  );
};
