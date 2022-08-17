import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { IoCopyOutline } from 'react-icons/io5';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { useCopy } from '../../../hooks/use-copy';
import { useState } from 'react';

interface Props {
  mnemonic: string;
}

const StyledNumberIndex = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'right',
}));

export const MnemonicView: React.FunctionComponent<Props> = ({ mnemonic }) => {
  const [reveal, setReveal] = useState(false);
  const mnemonicBlocks = mnemonic.split(' ');
  const { copied, copy } = useCopy();
  const copyMnemonic = () => {
    copy(mnemonic);
  };

  return (
    <Paper
      sx={{
        px: 2,
        pt: 3,
        pb: 2,
        userSelect: 'none',
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {!reveal && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'grey.900',
            zIndex: 1,
            display: 'flex',
            placeContent: 'center',
            flexDirection: 'column',
            px: 6,
            textAlign: 'center',
          }}
        >
          <Button sx={{ marginBottom: 1 }} onClick={() => setReveal(true)}>
            <HiOutlineCursorClick />
            <Typography ml={1}>Click to reveal Seed Phrase</Typography>
          </Button>
          <Typography color="grey.700">
            Make sure no one is watching your screen. Save it somewhere safe.
          </Typography>
        </Box>
      )}
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        columnGap={1}
        rowGap={1}
        marginBottom={2}
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
      <Button size="small" fullWidth onClick={copyMnemonic} disabled={copied}>
        <IoCopyOutline />
        <Typography ml={1}>
          {copied ? 'Copied' : 'Copy to clipboard'}
        </Typography>
      </Button>
    </Paper>
  );
};
