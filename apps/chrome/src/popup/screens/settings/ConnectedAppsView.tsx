import { useWallet } from '@poketto/core';
import toast from 'react-hot-toast';
import { useStackNavigation } from '../../../navigation';
import { Fragment } from 'react';
import { useBoolean } from '../../hooks/use-boolean';
import { SettingGroup } from '@ui/SettingGroup';
import { TitleHeader } from '@ui/TitleHeader';
import { Container } from '@ui/Container';
import { Button } from '@ui/Button';

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

      <Container className="space-y-3">
        <SettingGroup>
          {currentAccountTrustedOrigins.map((origin, index) => (
            <Fragment key={origin}>
              <div className="flex items-center px-3 py-2">
                <h3>{origin}</h3>
                <Button
                  color="error"
                  onClick={() => handleRemoveOrigin(origin)}
                  disabled={loading}
                >
                  Revoke
                </Button>
              </div>
            </Fragment>
          ))}
        </SettingGroup>
      </Container>
    </>
  );
};
