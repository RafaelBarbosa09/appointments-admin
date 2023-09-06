
import { Link } from 'react-router-dom';
import { Close, Logout } from '@mui/icons-material';
import { CloseBtn, Drawer, List, ListItem } from './styles';
import { ListItemIcon, ListItemText } from '@mui/material';

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const SideMenu = ({ open, onClose }: SideMenuProps) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <CloseBtn onClick={onClose}>
        <Close />
      </CloseBtn>
      <List>
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem>
          <Link to="/appointments">Agendamentos</Link>
        </ListItem>
      </List>
      <List style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <ListItem onClick={() => alert("Logout")}>
          <ListItemIcon>
            <Logout style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideMenu;
