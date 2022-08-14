import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './modules/preference/use-color-scheme';
import { Navigation } from './modules/navigation';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Navigation colorScheme={colorScheme} />
    </SafeAreaProvider>
  );
}
