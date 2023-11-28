import { Button, Container } from "@mui/material";
import HeaderMenu from "../../shared/HeaderMenu";
import Dashboard from "../../shared/Dashboard";
import { useAppointments } from "../../../contexts/AppointmentProvider";
import { useEffect } from "react";
import { getAppointmentsByCustomerId } from "../../../services/appointments";
import { useAuth } from "../../../contexts/AuthProvider";

export const Appointments = () => {
  const { appointments, setAppointments } = useAppointments();
  const { loggedUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { customer, professional } = loggedUser;
      const id = customer ? customer.id : professional.id;

      const response = await getAppointmentsByCustomerId(id);
      if (response) {
        setAppointments(response);
      }
    };

    fetchData();
  }, [setAppointments, loggedUser]);

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