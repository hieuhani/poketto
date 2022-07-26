import { StackNavigation } from '../../../navigation';
import { HomeScreen } from './HomeScreen';
import { TransferScreen } from './TransferScreen';

export const Home: React.FunctionComponent = () => {
  return (
    <StackNavigation
      routes={[
        { route: 'home', screen: <HomeScreen /> },
        { route: 'transfer', screen: <TransferScreen /> },
      ]}
    />
  );
};
