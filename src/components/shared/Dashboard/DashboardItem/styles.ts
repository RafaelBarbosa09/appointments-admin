import { Card as MaterialCard, Button as MaterialButton } from "@mui/material";
import { styled } from "styled-components";

export const Card = styled(MaterialCard)`
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 6px 10px -4px rgba(0,0,0,.15);
  color: #252422;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
`;

export const Button = styled(MaterialButton)`
  margin-top: 1.5rem;
  width: 100%;
`;