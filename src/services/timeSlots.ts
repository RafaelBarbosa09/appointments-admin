import { TimeSlot } from "../utils/types/timeSlot";
import api from "./api";

export const createTimeSlot = async (timeSlot: TimeSlot) => {
    const response = await api.post('/timeslots', timeSlot, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}