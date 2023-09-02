import api from "./api";

export const getAllAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
}

export const createAppointment = async (appointment) => {
  const response = await api.post('/appointments', appointment);
  return response.data;
}