import api from "./api";

export const getAllWorks = async () => {
  const response = await api.get('/works');
  return response.data;
}