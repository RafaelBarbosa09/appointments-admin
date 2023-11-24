import { useState } from "react";
import { TimeSlotDTO } from "../../../utils/types/timeSlot";
import { Button } from "@mui/material";

interface TimeSlotItemProps {
    timeSlot: TimeSlotDTO;
    onTimeSlotClick: (timeSlot: TimeSlotDTO) => void;
}

const TimeSlotItem = ({ timeSlot, onTimeSlotClick }: TimeSlotItemProps) => {
    const [isTimeSlotSelected, setIsTimeSlotSelected] = useState(false);

    const handleTimeSlotClick = () => {
        setIsTimeSlotSelected(!isTimeSlotSelected);
        onTimeSlotClick(timeSlot);
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            disabled={isTimeSlotSelected}
            onClick={handleTimeSlotClick}
        >
            {timeSlot.startTime} - {timeSlot.endTime}
        </Button>
    );
}

export default TimeSlotItem;