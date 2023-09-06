import { Typography } from "@mui/material";
import { formatDateTime } from "../../../utils/format/formatDateTime";

interface DateTimeProps {
  children: Date;
}

const DateTime = ({ children }: DateTimeProps) => {
  const formattedDate = formatDateTime(children);

  return (
    <Typography>{formattedDate}</Typography>
  );
};

export default DateTime;