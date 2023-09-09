import { AppointmentStatus } from "./AppointmentStatus";
import { Customer } from "./Customer";
import { Professional } from "./Professional";
import { Work } from "./Work";

export interface Appointment {
  id?: number | null;
  appointmentDateTime: Date;
  status?: AppointmentStatus;
  customer?: Customer;
  professional: Professional;
  work: Work;
}