import { IconButton, Tooltip, Typography } from "@mui/material";
import Duration from "../../Duration";
import { Appointment } from "../../../../utils/types/Appointment";
import DateTime from "../../DateTime";
import { InfoOutlined } from "@mui/icons-material";
import Modal from "../../Modal";
import { useState } from "react";
import { Button, Card, CardHeader, Title } from "./styles";
import Currency from "../../Corrency";
import { Tag } from "../../Tag";
import { useAuth } from "../../../../contexts/AuthProvider";
import { getAppointmentsByProfessionalId } from "../../../../services/professionals";
import { getAppointmentsByCustomerId, updateAppointmentStatus } from "../../../../services/appointments";

interface DashboardItemProps {
  appointment: Appointment;
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

const DashboardItem = ({ appointment, setAppointments }: DashboardItemProps) => {
  const status = appointment?.status;
  const work = appointment?.work;
  const professional = appointment?.professional;

  const [open, setOpen] = useState(false);
  const { loggedUser } = useAuth();

  const handleClick = () => {
    setOpen(false);
    updateStatus(appointment.id!);
  }

  const updateStatus = async (id: number) => {
    await updateAppointmentStatus(id);

    const { customer, professional } = loggedUser;

    let response;
    if (professional) {
      response = await getAppointmentsByProfessionalId(professional.id);
    }

    if (customer) {
      response = await getAppointmentsByCustomerId(customer.id);
    }
    setAppointments(response);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Typography variant="h6">{appointment.work.name}</Typography>
          <Tooltip title="ver mais">
            <IconButton onClick={() => setOpen(true)}>
              <InfoOutlined style={{ color: '#a49e93' }} />
            </IconButton>
          </Tooltip>
        </CardHeader>
        <DateTime style={{ color: '#a49e93', fontSize: '.9rem', fontWeight: '300' }}>{appointment.appointmentDateTime}</DateTime>
        {status && <Tag status={status} />}
      </Card>
      <Modal open={open} setOpen={setOpen}>
        <Title>Agendamento</Title>
        <Typography>Profissional: {professional?.firstName} {professional?.lastName}</Typography>
        <Typography>Contato: {professional?.phone}</Typography>
        <Typography>
          Duração: {' '}
          <Duration duration={Number(work.estimatedTime)!} />
        </Typography>
        <Typography>
          Valor: {' '}
          <Currency>{Number(work.price)}</Currency>
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={handleClick}
        >
          Cancelar
        </Button>
      </Modal>
    </>
  );
};

export default DashboardItem;