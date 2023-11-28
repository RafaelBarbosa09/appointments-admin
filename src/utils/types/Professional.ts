import { User } from "./User";

export interface Professional {
  id: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  cnpj?: string;
  user?: User;
}