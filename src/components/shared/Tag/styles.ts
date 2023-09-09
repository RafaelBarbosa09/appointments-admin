import { styled } from "styled-components";
import { TagProps } from ".";
import { Status } from "../../../utils/types/Status";

const statusColor: Record<Status, string> = {
  [Status.FINISHED]: 'var(--success)',
  [Status.PENDING]: 'var(--warning)',
  [Status.CANCELLED]: 'var(--danger)',
}

export const StyledTag = styled.div<TagProps>`
  background-color: ${({ status }) => statusColor[status.name as Status]};
  color: #fff;
  border-radius: 4px;
  width: 100%;
  max-width: 100px;
  padding: 4px 8px;
  text-align: center;
  margin: .5rem 0 .2rem;
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 
              0px 2px 2px 0px rgba(0,0,0,0.14), 
              0px 1px 5px 0px rgba(0,0,0,0.12);
`;