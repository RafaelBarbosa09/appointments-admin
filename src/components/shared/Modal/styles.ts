import { Box as BoxMaterial, Button } from "@mui/material";
import { styled } from "styled-components";

export const Box = styled(BoxMaterial)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 576px;
  background-color: #fff;
  box-shadow: 24px;
  padding: 3rem;
  border-radius: 0.25rem;
`;

export const CloseBtn = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 0;
  color: #686d7a;

  &:hover {
    color: #4d4c58;
    background-color: transparent;
  }
`;