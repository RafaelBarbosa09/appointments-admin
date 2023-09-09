import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Appointment } from "../utils/types/Appointment";
import { getAllAppointments, updateAppointmentStatus } from "../services/appointments";

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllAppointments();
      if (response) {
        setAppointments(response);
      }
    };

    fetchData();
  }, []);

  const updateStatus = async (id: number) => {
    await updateAppointmentStatus(id);
    const newAppointments = await getAllAppointments();
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
  const context = useContext(AppointmentContext);
  return context;
};