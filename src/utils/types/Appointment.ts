import { Customer } from "./Customer";
import { Professional } from "./Professional";
import { Work } from "./Work";

export interface Appointment {
  id: number;
  appointmentDateTime: Date;
  customer: Customer;
  professional: Professional;
  work: Work;
}