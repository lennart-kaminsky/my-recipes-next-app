import Link from "next/link";

import styled, { css } from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ $current }) =>
    $current ? "var(--secondary-color)}" : "var(--primary-color)"};
`;

export const CircleLink = styled(Link)`
  color: var(--secondary-bg-color);
  font-size: 1.5rem;
  background-color: var(--secondary-color);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  position: absolute;

  ${({ $isAddRecipe, $isCancel }) => {
    if ($isAddRecipe)
      return css`
        padding: 0.25rem 0.62rem;
        transform: translate(-50%);
        bottom: 13%;
        left: 50%;
      `;
    if ($isCancel)
      return css`
        background-color: var(--secondary-color);
        padding: 0.25rem 0.7rem;
        top: 1.5rem;
        right: 1.5rem;
      `;
  }}
`;
