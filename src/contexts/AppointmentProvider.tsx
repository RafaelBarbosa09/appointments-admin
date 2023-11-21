import React, { createContext, ReactNode, useContext, useState } from "react";
import { Appointment } from "../utils/types/Appointment";
import { getAppointmentsByCustomerId, updateAppointmentStatus } from "../services/appointments";

interface AppointmentContextData {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  updateStatus: (id: number) => void;
}

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentContext = createContext<AppointmentContextData>({} as AppointmentContextData);

export const AppointmentProvider = ({ children }: AppointmentProviderProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const updateStatus = async (id: number) => {
    await updateAppointmentStatus(id);
    const newAppointments = await getAppointmentsByCustomerId(1);
    setAppointments(newAppointments);
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      setAppointments,
      updateStatus
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  return useContext(AppointmentContext);
};