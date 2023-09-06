import { Typography } from "@mui/material";
import { formatDuration } from "../../../utils/format/formatDuration";

interface DurationProps {
  children: string;
}

const Duration = ({ children }: DurationProps) => {
  const formattedDuration = formatDuration(children);

  return <Typography>{formattedDuration}</Typography>;
};

export default Duration;