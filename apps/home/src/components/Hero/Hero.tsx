import { Button } from '@poketto/ui/Button';
import { Container } from '@poketto/ui/Container';
import { ImagePreset } from 'components/Image';

export const Hero: React.FunctionComponent = () => {
  return (
    <Container>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
        <div className="relative col-span-8 pt-12">
          <h1 className="text-6xl font-medium tracking-tight text-gray-900">
            Poketto Aptos Wallet
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            The trusted and easy-to-use Aptos Wallet
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            <Button
              as="a"
              href="https://chrome.google.com/webstore/detail/poketto/hkeeapmfcpolmjblcdphcfgbfbiebfle"
            >
              Add to Chrome
            </Button>
          </div>
        </div>
        <div className="relative col-span-4 mt-10 sm:mt-20 lg:mt-0">
          <div className="ml-auto w-80 rounded-md border-4 border pt-2">
            <ImagePreset
              src="/images/wallet-home-demo.png"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
