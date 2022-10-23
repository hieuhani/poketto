import { Logo } from '@poketto/ui/Logo';

export const Footer: React.FunctionComponent = () => {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="mt-12 flex flex-col items-center border-t border-gray-200 pt-8">
          <Logo />
          <p className="mt-2 text-base text-gray-400 xl:text-center">
            &copy; 2022 Poketto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
