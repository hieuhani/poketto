import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { IoAddOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { makeShortAddress } from '../helpers/address';
import { renderIcon } from '../helpers/blockies';

interface Props {
  activeAddress: string;
}
export const WalletSwitcher: React.FunctionComponent<Props> = ({
  activeAddress,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    renderIcon(
      {
        seed: activeAddress,
        color: '#dfe',
        bgcolor: '#aaa', // choose a different background color, default: random
        size: 8,
        scale: 5,
        spotcolor: '#000',
      },
      canvas.current
    );
  }, [activeAddress]);

  return (
    <>
      <Stack
        component={ButtonBase}
        spacing={1}
        direction="row"
        alignItems="center"
        onClick={handleClick}
        sx={{
          paddingY: 1,
          paddingLeft: 2,
          paddingRight: 1,
          position: 'relative',
          textAlign: 'right',
        }}
        borderRadius={2}
      >
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight="700"
            textTransform="uppercase"
          >
            Wallet 1
          </Typography>
          <Typography lineHeight={1} title={activeAddress}>
            {makeShortAddress(activeAddress)}
          </Typography>
        </Box>
        <Box
          borderRadius="50%"
          height={40}
          width={40}
          overflow="hidden"
          border="2px solid"
          borderColor="#1976d2"
        >
          <canvas ref={canvas} height="40" width="40" />
        </Box>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,

            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemText inset>0xd2ffe...beda9d</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemText inset>0xpdbf2...pl0672</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <IoAddOutline />
          </ListItemIcon>
          Add a new wallet
        </MenuItem>
      </Menu>
    </>
  );
};
