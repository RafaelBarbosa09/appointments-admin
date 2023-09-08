import { Typography } from "@mui/material";
import { formatCurrency } from "../../../utils/format/currency";

interface CurrencyProps {
  children: number;
}

const Currency = ({ children }: CurrencyProps) => {
  if (!children) return '';
  const value = formatCurrency(Number(children));

  return (
    <Typography component="span">
      {value}
    </Typography>
  );
};

export default Currency;