import { Typography } from "@mui/material";
import { StyledTag } from "./styles";
import { AppointmentStatus } from "../../../utils/types/AppointmentStatus";

export interface TagProps {
  status: AppointmentStatus;
}

export const Tag = ({ status }: TagProps) => {
  console.log(status);
  return (
    <StyledTag status={status}>
      <Typography component="span" fontWeight={500}>
        {status.name}
      </Typography>
    </StyledTag>
  );
};