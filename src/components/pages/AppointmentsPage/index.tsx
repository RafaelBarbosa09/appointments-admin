import { Button, Container } from "@mui/material";
import HeaderMenu from "../../shared/HeaderMenu";
import Dashboard from "../../shared/Dashboard";
import { useAppointments } from "../../../contexts/AppointmentProvider";
import { useEffect } from "react";
import { getAppointmentsByCustomerId } from "../../../services/appointments";
import { useAuth } from "../../../contexts/AuthProvider";

export const Appointments = () => {
  const { appointments, setAppointments } = useAppointments();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAppointmentsByCustomerId(1);
      if (response) {
        setAppointments(response);
      }
    };

    fetchData();
  }, [setAppointments]);

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