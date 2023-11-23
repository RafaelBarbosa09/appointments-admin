import { CreateAvailability } from "../utils/types/Availability";
import api from "./api";

export const createAvailability = async (availability: CreateAvailability) => {
    // debugger;
    const response = await api.post('/availability', availability, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    return response.data;
}