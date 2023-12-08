import { TimeSlot, TimeSlotDTO } from "./timeSlot";

export interface CreateAvailability {
    date: string;
    timeSlot: TimeSlot;
    professionalId: number;
}

export interface Availability {
    id: number;
    date: string;
    timeSlots: TimeSlotDTO[];
}