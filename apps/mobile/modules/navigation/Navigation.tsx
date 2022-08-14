import React, { useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import { OnboardingNavigator } from '../onboarding/OnboardingNavigator';
import { HomeNavigator } from '../home/HomeNavigator';

interface Props {
  colorScheme: ColorSchemeName;
}
export const Navigation: React.FunctionComponent<Props> = ({ colorScheme }) => {
  const isLoggedIn = true;
  const bootstrapAsync = async () => {};
  useEffect(() => {
    bootstrapAsync();
  }, []);
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {isLoggedIn ? <HomeNavigator /> : <OnboardingNavigator />}
    </NavigationContainer>
  );
};
