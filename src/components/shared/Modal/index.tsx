import { ReactNode } from 'react';
import MaterialModal from '@mui/material/Modal';
import { Close } from '@mui/icons-material';
import { Box, CloseBtn } from './styles';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal = ({ children, ...props }: ModalProps) => {
  const { open, setOpen } = props;
  const handleClose = () => setOpen(false);

  return (
    <MaterialModal
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