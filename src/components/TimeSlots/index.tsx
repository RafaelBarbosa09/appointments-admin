import { Grid } from "@mui/material";
import { TimeSlotDTO } from "../../utils/types/timeSlot";
import TimeSlotItem from "./TimeSlotItem";

interface TimeSlotProps {
    timeSlots: TimeSlotDTO[];
}

const TimeSlots = ({ timeSlots }: TimeSlotProps) => {
    const handleTimeSlotClick = (timeSlot: TimeSlotDTO) => {
        console.log(timeSlot);
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