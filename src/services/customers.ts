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

export const createCustomer = async (customer: any, userId: number) => {
    try {
        const response = await api.post(`/customer/user/${userId}`, customer, {
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