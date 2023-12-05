import api from "./api";

export const getAllProfessionals = async () => {
  const response = await api.get('/professionals', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return response.data;
};

export const getAppointmentsByProfessionalId = async (id: number) => {
  const response = await api.get(`/appointments/professional/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return response.data;
};
