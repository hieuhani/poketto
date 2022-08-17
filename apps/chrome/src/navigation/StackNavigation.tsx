import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useStack } from './use-stack';

interface Route {
  route: string;
  screen: ReactNode;
}
interface Props {
  routes: Route[];
}

interface NavigationContextState {
  navigate: (route: string) => void;
  goBack: () => void;
}
const NavigationContext = createContext<NavigationContextState>({
  navigate: (route: string) => {
    throw Error('Unimplemented');
  },
  goBack: () => {
    throw Error('Unimplemented');
  },
});

export const StackNavigation: React.FunctionComponent<Props> = ({ routes }) => {
  const { push, pop, top } = useStack([routes[0].route]);
  const routeIndex = useMemo<Record<string, number>>(
    () =>
      routes.reduce((previousValue, currentValue, currentIndex) => {
        return {
          ...previousValue,
          [currentValue.route]: currentIndex,
        };
      }, {}),
    [routes]
  );
  const navigate = useCallback(
    (route: string) => {
      if (routeIndex[route]) {
        push(route);
      }
    },
    [routeIndex]
  );

  const goBack = useCallback(() => {
    pop();
  }, [top]);

  if (routes.length === 0) {
    console.error('No routes provided to StackNavigation');
    return null;
  }
  return (
    <NavigationContext.Provider
      value={{
        navigate,
        goBack,
      }}
    >
      {routes[routeIndex[top]].screen}
    </NavigationContext.Provider>
  );
};

export const useStackNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useStackNavigation must be used within a StackNavigation');
  }
  return context;
};
