import { Button, Container } from "@mui/material";
import HeaderMenu from "../../shared/HeaderMenu";
import Dashboard from "../../shared/Dashboard";
import { useAppointments } from "../../../contexts/AppointmentProvider";

export const Appointments = () => {
  const { appointments } = useAppointments();

  return (
    <>
      <HeaderMenu title="Agendamentos" />
      <Container>
        <Button
          variant="contained"
          color="primary"
          href="/appointments/new"
          sx={{ marginBottom: '1rem' }}
        >
          Novo agendamento
        </Button>
        <Dashboard appointments={appointments} />
      </Container>
    </>
  );
}

export default Appointments;