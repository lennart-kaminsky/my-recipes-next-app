import Link from "next/link";

import styled from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
`;

export const CircleLink = styled(Link)`
  position: absolute;
  bottom: 13%;
  left: 50%;
  transform: translate(-50%);

  color: var(--primary-color);
  font-size: 1.5rem;
  background-color: var(--secondary-bg-color);
  padding: 0.9rem 1.4rem;
  border-radius: 100%;
`;
