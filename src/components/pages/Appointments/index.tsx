import { Button, Container } from "@mui/material";
import HeaderMenu from "../../shared/HeaderMenu";
import { useEffect, useState } from "react";
import { getAllAppointments } from "../../../services/appointments";
import { Appointment } from "../../../utils/types/Appointment";
import Dashboard from "../../shared/Dashboard";

export const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resonse = await getAllAppointments();
      setAppointments(resonse);
    };

    fetchData();
  }, []);

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