import { IconButton as MaterialIconButton } from "@mui/material";
import { styled } from "styled-components";

export const IconButton = styled(MaterialIconButton)`
  background: #333;
  color: #fff;
  border-radius: 50%;
  margin: 1rem;

  &:hover {
    background: #444;
  }
`;