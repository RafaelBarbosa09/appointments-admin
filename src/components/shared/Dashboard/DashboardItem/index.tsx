import { Card, Typography } from "@mui/material";
import Duration from "../../Duration";
import { Appointment } from "../../../../utils/types/Appointment";
import DateTime from "../../DateTime";

interface DashboardItemProps {
  appointment: Appointment;
}

const DashboardItem = ({ appointment }: DashboardItemProps) => {
  return (
    <Card>
      <DateTime>{appointment.appointmentDateTime}</DateTime>
      <Typography>{`${appointment.professional.firstName} ${appointment.professional.lastName}`}</Typography>
      <Typography>{appointment.work.name}</Typography>
      <div style={{ display: 'flex' }}>
        <Typography style={{ margin: '0 .5rem 0 0 ' }}>
          Duração estimada:
        </Typography>
        <Duration>{appointment.work.estimatedTime}</Duration>
      </div>
      <Typography>{appointment.work.price}</Typography>
    </Card>
  );
};

export default DashboardItem;