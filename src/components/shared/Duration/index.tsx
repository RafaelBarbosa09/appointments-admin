import { Typography } from "@mui/material";
import { formatDuration } from "../../../utils/format/duration";

interface DurationProps {
  children: string;
}

const Duration = ({ children }: DurationProps) => {
  const formattedDuration = formatDuration(children);

  return <Typography component="span">{formattedDuration}</Typography>;
};

export default Duration;