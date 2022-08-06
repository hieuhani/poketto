import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { QRCodeSVG } from 'qrcode.react';
import { HexAddress } from '../../ui/HexAddress';

interface Props {
  accountAddress: string;
}
export const ReceiveCoin: React.FunctionComponent<Props> = ({
  accountAddress,
}) => {
  return (
    <Box width="240px" paddingY={4}>
      {accountAddress && (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          marginBottom={4}
        >
          <Box
            padding={2}
            borderRadius={4}
            marginBottom={2}
            sx={{ backgroundColor: 'white' }}
          >
            <QRCodeSVG value={accountAddress} />
          </Box>
          <HexAddress
            address={accountAddress}
            takeLeft={6}
            takeRight={6}
            addressSx={{ fontSize: 16 }}
          />
        </Box>
      )}
      <Button
        fullWidth
        variant="contained"
        sx={{ borderRadius: 4 }}
        size="small"
      >
        Faucet Aptos Coin
      </Button>
    </Box>
  );
};
