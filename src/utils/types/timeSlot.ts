export interface TimeSlot {
    startTime: string;
    endTime: string;
}

export interface TimeSlotDTO {
    id: number;
    startTime: string;
    endTime: string;
    available: boolean;
}