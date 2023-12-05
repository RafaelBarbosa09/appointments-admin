import { Button, Container } from "@mui/material";
import Dashboard from "../../shared/Dashboard";
import { useEffect, useState } from "react";
import { getAppointmentsByCustomerId } from "../../../services/appointments";
import { useAuth } from "../../../contexts/AuthProvider";
import { getAppointmentsByProfessionalId } from "../../../services/professionals";
import { Appointment } from "../../../utils/types/Appointment";

export const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { loggedUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { customer, professional } = loggedUser;

      let response;
      if (professional) {
        response = await getAppointmentsByProfessionalId(professional.id);
      }

      if (customer) {
        response = await getAppointmentsByCustomerId(customer.id);
      }

      if (response) {
        setAppointments(response);
      }
    };

    fetchData();
  }, [setAppointments, loggedUser]);

  return (
    <Container>
      {
        loggedUser.customer && (
          <Button
            variant="contained"
            color="primary"
            href="/appointments/new"
            sx={{ marginBottom: '1rem' }}
          >
            Novo agendamento
          </Button>
        )
      }
      <Dashboard setAppointments={setAppointments} appointments={appointments} />
    </Container>
  );
}

export default Appointments;