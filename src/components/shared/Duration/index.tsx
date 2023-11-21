import { Typography } from "@mui/material";
import { formatDuration } from "../../../utils/format/duration";

interface DurationProps {
  duration: number;
}

const Duration = ({ duration }: DurationProps) => {
  const formattedDuration = formatDuration(duration);

  return <Typography component="span">{formattedDuration}</Typography>;
};

export default Duration;