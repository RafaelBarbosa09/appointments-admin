import { Grid } from "@mui/material";
import { TimeSlotDTO } from "../../utils/types/timeSlot";
import TimeSlotItem from "./TimeSlotItem";
import React from "react";

interface TimeSlotProps {
    timeSlots: TimeSlotDTO[];
    setTimeSlot?: React.Dispatch<React.SetStateAction<TimeSlotDTO>>;
}

const TimeSlots = ({ timeSlots, setTimeSlot }: TimeSlotProps) => {
    const handleTimeSlotClick = (timeSlot: TimeSlotDTO) => {
        if (!setTimeSlot) return;
        setTimeSlot(timeSlot);
    }

    return (
        <>
            <Grid container spacing={2} padding={5}>
                {timeSlots?.map(timeSlot => (
                    <Grid item xs={6} md={4} key={timeSlot.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <TimeSlotItem timeSlot={timeSlot} onTimeSlotClick={handleTimeSlotClick} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default TimeSlots;