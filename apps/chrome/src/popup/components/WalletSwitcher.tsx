import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { IoAddOutline, IoCheckmark } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { makeShortAddress } from '../helpers/address';
import { renderIcon } from '../helpers/blockies';
import { useWallet } from '@poketto/core';
import { useModalNavigation } from '../../navigation/ModalNavigation';

interface Props {
  activeAddress: string;
}
export const WalletSwitcher: React.FunctionComponent<Props> = ({
  activeAddress,
}) => {
  const {
    accounts,
    walletPreference,
    createNewSiblingAccount,
    changeDefaultAccountIndex,
  } = useWallet();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { openModal } = useModalNavigation();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
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

  const handleAddWallet = async () => {
    const mnemonic = await createNewSiblingAccount();
    openModal('RevealMnemonic', { mnemonic });
  };

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
        <div>
          <h3 className="text-uppercase font-semibold">
            Wallet {walletPreference.defaultAccountIndex + 1}
          </h3>

          <h5 title={activeAddress} className="text-sm text-slate-500">
            {makeShortAddress(activeAddress)}
          </h5>
        </div>

        <div className="h-10 w-10 overflow-hidden rounded-full border border-2 border-blue-500">
          <canvas ref={canvas} height="40" width="40" />
        </div>
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
        {accounts.map((account, index) => {
          const isActive = walletPreference.defaultAccountIndex === index;
          return (
            <MenuItem
              key={index}
              onClick={() => changeDefaultAccountIndex(index)}
            >
              {isActive && (
                <ListItemIcon>
                  <IoCheckmark />
                </ListItemIcon>
              )}
              <ListItemText inset={!isActive}>
                <Typography component="span" sx={{ marginRight: 1 }}>
                  Wallet {index + 1}
                </Typography>
                <Typography component="span" color="grey.500">
                  ({makeShortAddress(account.address().hex())})
                </Typography>
              </ListItemText>
            </MenuItem>
          );
        })}

        <Divider />
        <MenuItem onClick={handleAddWallet}>
          <ListItemIcon>
            <IoAddOutline />
          </ListItemIcon>
          Add wallet
        </MenuItem>
      </Menu>
    </>
  );
};
