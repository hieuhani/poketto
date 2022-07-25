import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface Props {
  title: string;
}

export const TitleHeader: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <Box paddingY={2}>
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};
