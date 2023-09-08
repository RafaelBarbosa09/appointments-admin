import { Container, Paper, Typography } from "@mui/material";
import HeaderMenu from "../../shared/HeaderMenu";

const Home = () => {
  return (
    <>
      <HeaderMenu title="Home" />
      <Container>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h4">Bem-vindo</Typography>
          <Typography variant="body1">
            Este é um sistema para agendamentos de serviços de maquiagem e extensão de cílios. Agende seu horário!
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Home;