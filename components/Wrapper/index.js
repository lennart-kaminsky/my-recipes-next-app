import styled from "styled-components";

export const FlexRowWrapper = styled.div`
  display: flex;
  justify-content: ${({ $spaceBetween }) =>
    $spaceBetween ? "space-between" : "flex-start"};
  gap: ${({ $gap }) => ($gap ? "5px" : "0")};
  /* font-size: 0.7rem; */
`;
