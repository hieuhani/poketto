import { Drawer } from '@ui/Drawer';
import { createContext, ReactNode, useMemo, useState } from 'react';
import { NavigationProps } from './navigation';

interface DrawerNavigationState {
  navigate: (route: string) => void;
}

const DrawerNavigationContext = createContext<DrawerNavigationState>({
  navigate: (_route: string) => {
    throw Error('Unimplemented');
  },
});

interface ExtraProps {
  children: ReactNode | ((state: DrawerNavigationState) => ReactNode);
}
export const DrawerNavigation: React.FunctionComponent<
  NavigationProps & ExtraProps
> = ({ routes, children }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
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
  const contextState = {
    navigate: (route: string) => {
      if (routeIndex[route] !== undefined) {
        setActiveIndex(routeIndex[route]);
      }
    },
  };

  return (
    <DrawerNavigationContext.Provider value={contextState}>
      {typeof children === 'function' ? children(contextState) : children}
      <Drawer
        anchor="bottom"
        open={routes[activeIndex] !== undefined}
        onClose={() => setActiveIndex(-1)}
      >
        {routes[activeIndex] && routes[activeIndex].screen}
      </Drawer>
    </DrawerNavigationContext.Provider>
  );
};
