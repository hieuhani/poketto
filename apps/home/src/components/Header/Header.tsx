import { Container } from '@poketto/ui/Container';
import { Logo } from '@poketto/ui/Logo';
import { Button } from '@poketto/ui/Button';
import Link from 'next/link';
import { MobileNavigation } from './MobileNavigation';

export const Header: React.FunctionComponent = () => {
  return (
    <header className="py-2">
      <Container>
        <nav className="flex items-center justify-between">
          <div>
            <Link href="#">
              <a>
                <span className="sr-only">Home</span>
                <Logo className="h-10 w-auto" />
              </a>
            </Link>
          </div>
          <ul className="flex items-center">
            <li className="ml-12 hidden md:block">
              <Link href="#features">
                <a className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                  Privacy
                </a>
              </Link>
            </li>
            <li className="ml-6 hidden md:block">
              <Link href="#pricing">
                <a className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                  Support
                </a>
              </Link>
            </li>
            <li className="ml-6 hidden md:block">
              <Link href="#testimonials">
                <a className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                  Blog
                </a>
              </Link>
            </li>
          </ul>

          <div className="flex items-center space-x-4">
            <Button as="a" href="https://docs.poketto.app" variant="link">
              Docs
            </Button>
            <Button
              as="a"
              href="https://chrome.google.com/webstore/detail/poketto/hkeeapmfcpolmjblcdphcfgbfbiebfle"
            >
              Download
            </Button>
            <div className="md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};
