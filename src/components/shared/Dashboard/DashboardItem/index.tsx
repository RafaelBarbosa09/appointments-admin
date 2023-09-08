import { IconButton, Tooltip, Typography } from "@mui/material";
import Duration from "../../Duration";
import { Appointment } from "../../../../utils/types/Appointment";
import DateTime from "../../DateTime";
import { InfoOutlined } from "@mui/icons-material";
import Modal from "../../Modal";
import { useState } from "react";
import { Button, Card, CardHeader, Title } from "./styles";
import Currency from "../../Corrency";

interface DashboardItemProps {
  appointment: Appointment;
}

const DashboardItem = ({ appointment }: DashboardItemProps) => {
  const [open, setOpen] = useState(false);

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

      </Card>
      <Modal open={open} setOpen={setOpen}>
        <Title>Agendamento</Title>
        <Typography>Profissional: {appointment.professional.firstName} {appointment.professional.lastName}</Typography>
        <Typography>Contato: {appointment.professional.phone}</Typography>
        <Typography>
          Duração: {' '}
          <Duration>{appointment.work.estimatedTime}</Duration>
        </Typography>
        <Typography>
          Valor: {' '}
          <Currency>{appointment.work.price}</Currency>
        </Typography>

        <Button variant="contained" color="error">
          Cancelar
        </Button>
      </Modal>
    </>
  );
};

export default DashboardItem;