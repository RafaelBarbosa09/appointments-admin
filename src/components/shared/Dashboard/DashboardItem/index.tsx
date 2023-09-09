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
import { Status } from "../../../../utils/types/Status";

interface DashboardItemProps {
  appointment: Appointment;
}

const DashboardItem = ({ appointment }: DashboardItemProps) => {
  const status = appointment.status!;
  const work = appointment.work!;
  const professional = appointment.professional!;

  const [open, setOpen] = useState(false);
  if (appointment.id === 1) {
    status.name = Status.PENDING;
  }

  if (appointment.id === 2) {
    status.name = Status.FINISHED;
  }

  if (appointment.id === 3) {
    status.name = Status.CANCELLED;
  }

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
        <Tag status={appointment.status!} />
      </Card>
      <Modal open={open} setOpen={setOpen}>
        <Title>Agendamento</Title>
        <Typography>Profissional: {professional.firstName} {professional.lastName}</Typography>
        <Typography>Contato: {professional.phone}</Typography>
        <Typography>
          Duração: {' '}
          <Duration duration={work.estimatedTime!} />
        </Typography>
        <Typography>
          Valor: {' '}
          <Currency>{Number(work.price)}</Currency>
        </Typography>

        <Button variant="contained" color="error">
          Cancelar
        </Button>
      </Modal>
    </>
  );
};

export default DashboardItem;