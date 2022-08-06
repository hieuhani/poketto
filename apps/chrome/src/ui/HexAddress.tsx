import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import { IoCopyOutline } from 'react-icons/io5';
import { grey } from '@mui/material/colors';
import { SxProps } from '@mui/material';
import { makeShortAddress } from '../popup/helpers/address';

interface Props {
  address: string;
  takeLeft?: number;
  takeRight?: number;
  addressSx?: SxProps;
}

export const HexAddress: React.FunctionComponent<Props> = ({
  address,
  takeLeft = 6,
  takeRight = 4,
  addressSx,
}) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };
  return (
    <Tooltip title="Copy address" placement="right">
      <ButtonBase
        onClick={copyAddress}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 1,
          paddingX: 1,
          marginLeft: -1,
        }}
      >
        <Typography
          variant="caption"
          color="grey.400"
          marginRight={1}
          sx={addressSx}
        >
          {makeShortAddress(address, takeLeft, takeRight)}
        </Typography>
        <IoCopyOutline color={grey[400]} />
      </ButtonBase>
    </Tooltip>
  );
};
