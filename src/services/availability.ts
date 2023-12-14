import { CreateAvailability } from "../utils/types/Availability";
import api from "./api";

export const createAvailability = async (availability: CreateAvailability) => {
    const response = await api.post('/availability', availability, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    return response.data;
}

export const searchAvailabilityByDate = async (date: string) => {
    const response = await api.get('/availability/date', {
        params: {
            date
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    return response.data;
}

export const searchAvailabilityByDateAndProfessionalId = async (date: string, professionalId: number) => {
    try {
        const response = await api.get(`/availability/professional/${professionalId}/date`, {
            params: {
                date
            },
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