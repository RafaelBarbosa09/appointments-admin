import { ReactNode } from 'react';
import MaterialModal from '@mui/material/Modal';
import { Close } from '@mui/icons-material';
import { Box, CloseBtn } from './styles';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  style?: object;
}

const Modal = ({ children, ...props }: ModalProps) => {
  const { open, setOpen, style } = props;
  const handleClose = () => setOpen(false);

  return (
    <MaterialModal
      style={style}
      open={open}
      onClose={handleClose}>
      <Box>
        <CloseBtn onClick={handleClose}>
          <Close />
        </CloseBtn>
        {children}
      </Box>
    </MaterialModal>
  );
}

export default Modal;