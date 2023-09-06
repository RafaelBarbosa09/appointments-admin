import styled from 'styled-components';
import MaterialDrawer from '@mui/material/Drawer';
import MaterialList from '@mui/material/List';
import MaterialListItem from '@mui/material/ListItem';
import { IconButton } from '@mui/material';

export const Drawer = styled(MaterialDrawer)`
  & .MuiDrawer-paper {
    width: 250px;
    background-color: #222;
    color: white;
  }
`;

export const List = styled(MaterialList)`
  padding: 1rem 0.8rem;
`;

export const ListItem = styled(MaterialListItem)`
  padding: 1rem;
  border-radius: 0.5rem;

  &:first-child {
    margin-top: 2rem;
  }

  &:hover {
    background-color: #333;
  }
`;

export const CloseBtn = styled(IconButton)`
  color: var(--white);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;