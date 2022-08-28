import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import { IoCheckmark } from 'react-icons/io5';

import { useEffect, useRef } from 'react';
import { makeShortAddress } from '../../../helpers/address';
import { renderIcon } from '../../../helpers/blockies';

interface Props {
  name: string;
  activeAddress: string;
  selected: boolean;
  onSelectAccount: () => void;
  connected: boolean;
}
export const WalletAccountRow: React.FunctionComponent<Props> = ({
  name,
  activeAddress,
  selected,
  onSelectAccount,
  connected,
}) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    renderIcon(
      {
        seed: activeAddress,
        color: '#dfe',
        bgcolor: '#aaa',
        size: 8,
        scale: 5,
        spotcolor: '#000',
      },
      canvas.current
    );
  }, [activeAddress]);
  return (
    <Box
      component={ButtonBase}
      borderRadius={2}
      justifyContent="start"
      sx={{
        paddingY: 1,
        paddingX: 2,
        position: 'relative',
        textAlign: 'left',
      }}
      onClick={onSelectAccount}
    >
      <Box width={30}>{selected && <IoCheckmark size={20} />}</Box>
      <Box>
        <Typography
          variant="subtitle2"
          fontWeight="700"
          textTransform="uppercase"
        >
          {name}
        </Typography>

        <Typography
          lineHeight={1}
          title={activeAddress}
          variant="caption"
          color="grey.400"
        >
          {makeShortAddress(activeAddress, 6, 6)}
        </Typography>
        {connected && (
          <Typography
            marginLeft={1}
            lineHeight={1}
            variant="caption"
            color="grey.400"
          >
            Connected
          </Typography>
        )}
      </Box>
      <Box
        marginLeft="auto"
        borderRadius="50%"
        height={40}
        width={40}
        overflow="hidden"
        border="2px solid"
        borderColor="#1976d2"
      >
        <canvas ref={canvas} height="40" width="40" />
      </Box>
    </Box>
  );
};
