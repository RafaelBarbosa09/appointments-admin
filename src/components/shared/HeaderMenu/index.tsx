
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Toolbar, Typography } from "@mui/material";
import SideMenu from "../SideMenu";
import { Appbar, IconButton } from "./styles";
import { useAuth } from "../../../contexts/AuthProvider";

interface HeaderMenuProps {
  title: string;
}

const HeaderMenu = ({ title }: HeaderMenuProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loggedUser } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Appbar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <Typography noWrap sx={{ marginLeft: 'auto' }}>
            Olá, {loggedUser}
          </Typography>
        </Toolbar>
      </Appbar>
      <SideMenu open={sidebarOpen} onClose={closeSidebar} />
    </>
  );
}

export default HeaderMenu;