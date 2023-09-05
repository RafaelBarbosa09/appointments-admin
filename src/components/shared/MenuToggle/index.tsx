
import MenuIcon from '@mui/icons-material/Menu';
import CustomDrawer from "../ResponsiveMenu";
import { useState } from "react";
import { IconButton } from './styles';

const MenuToggle = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <IconButton onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <CustomDrawer open={sidebarOpen} onClose={closeSidebar} />
    </>
  );
}

export default MenuToggle;