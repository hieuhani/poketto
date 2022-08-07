import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

interface Props {
  mnemonic: string;
}

const StyledNumberIndex = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'right',
}));

export const MnemonicView: React.FunctionComponent<Props> = ({ mnemonic }) => {
  const mnemonicBlocks = mnemonic.split(' ');
  const copyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic);
  };
  return (
    <Paper
      sx={{
        px: 2,
        py: 4,
        marginBottom: 4,
        userSelect: 'none',
        position: 'relative',
        borderRadius: 4,
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        columnGap={1}
        rowGap={1}
      >
        {mnemonicBlocks.map((block, index) => (
          <Box key={index} display="flex">
            <StyledNumberIndex variant="body1" width="30px" marginRight={1}>
              {index + 1}
            </StyledNumberIndex>
            <Typography>{block}</Typography>
          </Box>
        ))}
      </Box>
      <ButtonBase
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          paddingX: 2,
          paddingY: 1,
          color: 'grey.600',
          textTransform: 'uppercase',
          fontSize: 12,
          fontWeight: 'medium',
        }}
        onClick={copyMnemonic}
      >
        Copy
      </ButtonBase>
    </Paper>
  );
};
