import api from "./api";

export const getLoggedUser = async (token: String, username: String) => {
    const response = await api.get('/auth/user', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            username: username
        }
    });
    return response.data;
}