import { Address } from "./Address";
import { Appointment } from "./Appointment";
import { User } from "./User";

export interface Customer {
  id: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  birthDate?: Date;
  appointments?: Appointment[];
  address?: Address;
  user?: User;
}