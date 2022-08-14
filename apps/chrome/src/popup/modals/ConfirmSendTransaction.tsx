import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { makeShortAddress } from '../helpers/address';

interface Props {
  close: () => void;
  fromAddress: string;
  toAddress: string;
  amount: number;
  gasFee: number;
  onSendTransaction: () => void;
}

export const ConfirmSendTransaction: React.FunctionComponent<Props> = ({
  fromAddress,
  toAddress,
  amount,
  gasFee,
  close,
  onSendTransaction,
}) => {
  const handleSend = () => {
    onSendTransaction();
    close();
  };
  return (
    <Box width="260px">
      <Typography variant="h5" marginBottom={1}>
        Transaction Preview
      </Typography>
      <Paper sx={{ px: 2, py: 2, borderRadius: 2 }}>
        <Box>
          <Typography variant="caption" color="grey.400">
            From
          </Typography>
          <Typography>{makeShortAddress(fromAddress, 10, 6)}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="grey.400">
            To
          </Typography>
          <Typography>{makeShortAddress(toAddress, 10, 6)}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="grey.400">
            Amount
          </Typography>
          <Typography>{amount}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="grey.400">
            Gas fee
          </Typography>
          <Typography>{gasFee}</Typography>
        </Box>
      </Paper>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: 4 }}
        onClick={handleSend}
      >
        Send
      </Button>
    </Box>
  );
};
