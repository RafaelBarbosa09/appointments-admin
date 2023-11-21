import api from "./api";

export const getAllProfessionals = async () => {
  const response = await api.get('/professionals', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return response.data;
}