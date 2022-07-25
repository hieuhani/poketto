import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const NetworksView: React.FunctionComponent = () => {
  return (
    <List>
      <ListItem>
        <ListItemButton>
          <ListItemText
            primary="Devnet"
            secondary="https://fullnode.devnet.aptoslabs.com"
          />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemText primary="Localhost" secondary="http://0.0.0.0:8080" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
