import { Grid } from "@mui/material";
import { Appointment } from "../../../utils/types/Appointment";
import DashboardItem from "./DashboardItem";

interface DashboardProps {
  appointments: Appointment[];
}

const Dashboard = ({ appointments }: DashboardProps) => {
  return (
    <Grid container spacing={2}>
      {appointments.map((appointment) => (
        <Grid item xs={12} md={6} key={appointment.id}>
          <DashboardItem appointment={appointment} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;