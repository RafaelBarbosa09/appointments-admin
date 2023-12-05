import api from "./api";

export const getCustomersByUserId = async (userId: number) => {
    try {
        const response = await api.get(`/customer/user/${userId}`, {
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