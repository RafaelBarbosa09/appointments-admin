import { Appointment } from "../utils/types/Appointment";
import api from "./api";

export const getAllAppointments = async () => {
  const response = await api.get('/appointments', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export const getAppointmentsByCustomerId = async (id: number): Promise<Appointment[]> => {
  const response = await api.get(`/appointments/customer/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return response.data;
}

export const createAppointment = async (appointment: Appointment) => {
  const response = await api.post('/appointments', {
    ...appointment
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export const updateAppointmentStatus = async (id: number) => {
  const response = await api.patch(`/appointments/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}; 