import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import { IconType } from 'react-icons';

interface Props extends ButtonBaseProps {
  title: string;
  description?: string;
  icon?: IconType;
  iconBgColor?: string;
}
export const SettingItem: React.FunctionComponent<Props> = ({
  title,
  description,
  icon: Icon,
  iconBgColor = 'grey.600',
  ...props
}) => (
  <ButtonBase
    sx={{
      paddingX: 2,
      paddingY: 2,
      display: 'flex',

      alignItems: 'center',
      textAlign: 'left',
      width: '100%',
    }}
    {...props}
  >
    <Box
      width={44}
      height={44}
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: iconBgColor,
        borderRadius: 4,
        marginRight: 2,
        justifyContent: 'center',
      }}
    >
      {Icon && <Icon size={22} />}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: '600' }}>{title}</Typography>
      <Typography fontSize="small" color="gray.400">
        {description}
      </Typography>
    </Box>
  </ButtonBase>
);
