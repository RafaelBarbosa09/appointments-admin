import { Link, useNavigate } from 'react-router-dom';
import { Close, Logout } from '@mui/icons-material';
import { CloseBtn, Drawer, List, ListItem } from './styles';
import { ListItemIcon, ListItemText } from '@mui/material';
import { useAuth } from '../../../contexts/AuthProvider';

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const SideMenu = ({ open, onClose }: SideMenuProps) => {
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('user');
    navigate('/login');
  }

  const isAdmin = loggedUser?.role === 'ADMIN';

  const adminRoutes = (
    <>
      <ListItem>
        <Link to="/profile/admin">Perfil</Link>
      </ListItem>
    </>
  );

  const userRoutes = (
    <>
      <ListItem>
        <Link to="/profile/user">Perfil</Link>
      </ListItem>
    </>
  );

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
        <ListItem>
          <Link to="/availability">Disponibilidade</Link>
        </ListItem>
        {isAdmin ? adminRoutes : userRoutes}
      </List>
      <List style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <ListItem onClick={handleLogout} sx={{ cursor: 'pointer' }}>
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
