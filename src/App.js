import { useState } from "react";
import { Box, Button, GlobalStyles, Modal, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      setOpen(false);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 576,
    bgcolor: '#fff',
    boxShadow: 24,
    p: '3rem',
    borderRadius: '0.25rem',
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: '#6e6d7a',
              '&:hover': {
                color: '#4d4c58',
                background: 'transparent',
              },
            }}
          >
            <Close />
          </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Título
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Conteúdo
          </Typography>
        </Box>
      </Modal>
      <GlobalStyles />
    </>
  );
}

export default App;
