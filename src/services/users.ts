import api from "./api";

export const getLoggedUser = async (token: String, username: String) => {
    const response = await api.get('/auth/user', {
        params: {
            login: username
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}