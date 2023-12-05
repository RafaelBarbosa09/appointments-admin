import React, { createContext, ReactNode, useContext, useState } from "react";
import { Appointment } from "../utils/types/Appointment";

interface AppointmentContextData {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentContext = createContext<AppointmentContextData>({} as AppointmentContextData);

export const AppointmentProvider = ({ children }: AppointmentProviderProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  return (
    <AppointmentContext.Provider value={{
      appointments,
      setAppointments
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  return useContext(AppointmentContext);
};