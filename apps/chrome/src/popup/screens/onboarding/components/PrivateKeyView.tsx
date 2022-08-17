import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IoCopyOutline } from 'react-icons/io5';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { useCopy } from '../../../hooks/use-copy';
import { useState } from 'react';

interface Props {
  privateKey: string;
}

export const PrivateKeyView: React.FunctionComponent<Props> = ({
  privateKey,
}) => {
  const [reveal, setReveal] = useState(false);
  const { copied, copy } = useCopy();
  const copyPrivateKey = () => {
    copy(privateKey);
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
            <Typography ml={1}>Click to reveal private Key</Typography>
          </Button>
          <Typography color="grey.700">
            Make sure no one is watching your screen. Save it somewhere safe.
          </Typography>
        </Box>
      )}
      <Box
        marginBottom={2}
        sx={{
          wordBreak: 'break-all',
          backgroundColor: 'grey.800',
          px: 3,
          py: 1,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        {privateKey}
      </Box>
      <Button size="small" fullWidth onClick={copyPrivateKey} disabled={copied}>
        <IoCopyOutline />
        <Typography ml={1}>
          {copied ? 'Copied' : 'Copy to clipboard'}
        </Typography>
      </Button>
    </Paper>
  );
};
