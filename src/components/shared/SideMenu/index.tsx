
import { Link } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { CloseBtn, Drawer, List, ListItem } from './styles';

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
    </Drawer>
  );
}

export default SideMenu;
