import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  title: string;
  content?: string;
}
export const CredentialLine: React.FunctionComponent<Props> = ({
  title,
  content,
}) => {
  return (
    <Box>
      <Typography>{title}</Typography>
      {content && (
        <Typography sx={{ wordBreak: 'break-word' }}>{content}</Typography>
      )}
    </Box>
  );
};
