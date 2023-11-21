import api from "./api";

export const getAllWorks = async () => {
  const response = await api.get('/works', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}