import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from './WelcomeScreen';

export type OnboardingStackNavigatorParamList = {
  'Onboarding/Welcome': undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackNavigatorParamList>();

export const OnboardingNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding/Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Onboarding/Welcome" component={WelcomeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
