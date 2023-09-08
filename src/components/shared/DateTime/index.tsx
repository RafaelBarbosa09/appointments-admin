import { Typography } from "@mui/material";
import { formatDateTime } from "../../../utils/format/date";

interface DateTimeProps {
  children: Date;
  style?: object;
}

const DateTime = ({ style, children }: DateTimeProps) => {
  const formattedDate = formatDateTime(children);

  return (
    <Typography style={style}>{formattedDate}</Typography>
  );
};

export default DateTime;