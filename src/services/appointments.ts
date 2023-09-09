import { Appointment } from "../utils/types/Appointment";
import api from "./api";

export const getAllAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
}

export const createAppointment = async (appointment: Appointment) => {
  const response = await api.post('/appointments', appointment);
  return response.data;
}

export const updateAppointmentStatus = async (id: number) => {
  const response = await api.patch(`/appointments/${id}`);
  return response.data;
}; 