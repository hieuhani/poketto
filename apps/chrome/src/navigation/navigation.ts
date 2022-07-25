import { ReactNode } from 'react';

export interface Route {
  route: string;
  screen: ReactNode;
}

export interface NavigationProps {
  routes: Route[];
}
