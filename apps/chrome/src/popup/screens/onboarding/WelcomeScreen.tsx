import Box from '@mui/material/Box';
import { useStackNavigation } from '../../../navigation';
import { Logo } from '../../components/Logo';
import { Button } from '@ui/Button';

export const WelcomeScreen: React.FunctionComponent = () => {
  const { navigate } = useStackNavigation();

  return (
    <Box px={4} py={4}>
      <div className="my-8 flex flex-col items-center space-y-4 text-center">
        <Logo className="h-16 w-16" />
        <h3 className="text-2xl text-slate-900 dark:text-slate-200 ">
          Welcome to Poketto Wallet
        </h3>
        <h5>Secured store for your digital assets</h5>
      </div>

      <div className="space-y-4">
        <Button fullWidth onClick={() => navigate('new_wallet')}>
          Create a new wallet
        </Button>
        <Button
          variant="link"
          fullWidth
          onClick={() => navigate('import_wallet')}
        >
          Import my existing wallet
        </Button>
      </div>
    </Box>
  );
};
