import Link from "next/link";

import styled, { css } from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
`;

export const CircleLink = styled(Link)`
  color: var(--primary-color);
  font-size: 1.5rem;
  background-color: var(--secondary-bg-color);
  padding: 0.9rem 1.4rem;
  border-radius: 100%;
  position: absolute;

  ${({ $isAddRecipe, $isCancel }) => {
    if ($isAddRecipe)
      return css`
        transform: translate(-50%);
        bottom: 13%;
        left: 50%;
      `;
    if ($isCancel)
      return css`
        background-color: rgb(12, 13, 28, 0.7);
        top: 12%;
        right: 10%;
      `;
  }}
`;
