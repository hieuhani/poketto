import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Input = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    position: 'relative',
    padding: '8px 10px',
    backgroundColor: 'rgb(18 18 18 / 50%)',
    borderRadius: '4px',
    fontSize: 16,
    marginBottom: 2,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
