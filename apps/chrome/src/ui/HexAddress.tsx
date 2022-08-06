import Typography from '@mui/material/Typography';
import { makeShortAddress } from '../popup/helpers/address';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';

import { IoCopyOutline } from 'react-icons/io5';
import { grey } from '@mui/material/colors';

interface Props {
  address: string;
}

export const HexAddress: React.FunctionComponent<Props> = ({ address }) => {
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
        <Typography variant="caption" color="grey.400" marginRight={1}>
          {makeShortAddress(address, 6, 4)}
        </Typography>
        <IoCopyOutline color={grey[400]} />
      </ButtonBase>
    </Tooltip>
  );
};
