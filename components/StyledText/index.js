import styled, { css } from "styled-components";

export const StyledHeadlineOne = styled.h1`
  font-family: var(--font-semi-bold);
  ${({ $isRecipeDetail }) =>
    $isRecipeDetail &&
    css`
      /* position: absolute; */
      text-align: center;
      font-size: 3rem;
      padding: 40px 5%;
      max-width: 450px;
      /* height: 100%; */
      /* padding-block: 25% 0; */
      /* margin: 0; */
      transform: translate(0, -10%);
    `}
`;

export const StyledHeadlineTwo = styled.h2`
  font-family: var(--font-semi-bold);
`;
