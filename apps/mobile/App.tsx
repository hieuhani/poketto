import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './modules/preference/use-color-scheme';
import { Navigation } from './modules/navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1565c0',
    secondary: 'yellow',
  },
};

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <Navigation colorScheme={colorScheme} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
