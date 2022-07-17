import { alpha, styled } from '@mui/material/styles';
import type { InputBaseProps } from '@mui/material/InputBase';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@mui/material';
import { forwardRef } from 'react';

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },

  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    padding: '6px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface Props extends InputBaseProps {
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLDivElement, Props>(
  ({ label, helperText, ...props }, ref) => (
    <FormControl variant="standard" ref={ref} sx={{ width: '100%' }}>
      {label && <InputLabel shrink>{label}</InputLabel>}

      <StyledInput {...props} />
      {helperText && <Typography sx={{ mt: 1 }}>{helperText}</Typography>}
    </FormControl>
  )
);

Input.displayName = 'Input';
