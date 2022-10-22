import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { PropsWithChildren } from 'react';

export const Layout: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
