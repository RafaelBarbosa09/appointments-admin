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

export const getProfessionalByUserId = async (userId: number) => {
  try {
    const response = await api.get(`/professionals/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const createProfessional = async (professional: any, userId: number) => {
  try {
    const response = await api.post(`/professionals/user/${userId}`, professional, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }

  return null;
}; 