import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import Modal from "../shared/Modal";

const Home = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Container>
        <h1>Home</h1>
        <Link to="/appointments">Appointments</Link>
        <Button variant="contained" onClick={() => setOpen(true)}>open modal</Button>
        <Modal open={open} setOpen={setOpen}>
          <h1>Modal</h1>
          <p>Modal content</p>
        </Modal>
      </Container>
    </>
  );
};

export default Home;