import api from "./api";

export const getAllProfessionals = async () => {
  const response = await api.get('/professionals');
  return response.data;
}