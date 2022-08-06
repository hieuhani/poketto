import Box from '@mui/material/Box';
import { QRCodeSVG } from 'qrcode.react';
import { HexAddress } from '../../ui/HexAddress';

interface Props {
  accountAddress: string;
}
export const ReceiveCoin: React.FunctionComponent<Props> = ({
  accountAddress,
}) => {
  console.log(accountAddress);
  return (
    <Box>
      {accountAddress && (
        <Box display="flex" alignItems="center" flexDirection="column">
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
    </Box>
  );
};
