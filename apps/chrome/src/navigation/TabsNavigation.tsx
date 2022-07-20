import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface Route {
  route: string;
  screen: ReactNode;
}
interface Props {
  routes: Route[];
}

interface NavigationContextState {
  navigate: (route: string) => void;
}
const NavigationContext = createContext<NavigationContextState>({
  navigate: (route: string) => {
    throw Error('Unimplemented');
  },
});

export const TabsNavigation: React.FunctionComponent<Props> = ({ routes }) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
        setActiveIndex(routeIndex[route]);
      }
    },
    [routeIndex]
  );

  if (routes.length === 0) {
    console.error('No routes provided to TabsNavigation');
    return null;
  }
  return (
    <NavigationContext.Provider
      value={{
        navigate,
      }}
    >
      {routes[activeIndex].screen}
    </NavigationContext.Provider>
  );
};

export const useTabsNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useStackNavigation must be used within a TabsNavigation');
  }
  return context;
};
