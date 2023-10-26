import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBurger,
  faToiletPaper,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { StyledLink } from "../Link";

export default function Navigation() {
  return (
    <nav>
      <NavigationList>
        <li>
          <StyledLink href="/">
            <FontAwesomeIcon icon={faHome} />
          </StyledLink>
        </li>
        <li>
          <StyledLink href="/recipes">
            <FontAwesomeIcon icon={faBurger} />
          </StyledLink>
        </li>
        <li>
          <StyledLink href="/drugstore">
            <FontAwesomeIcon icon={faToiletPaper} />
          </StyledLink>
        </li>
        <li>
          <StyledLink href="/shopping-list">
            <FontAwesomeIcon icon={faCartShopping} />
          </StyledLink>
        </li>
      </NavigationList>
    </nav>
  );
}

const NavigationList = styled.ul`
  margin: 0;
  padding: 0.7rem;
  border-top: 1px solid var(--primary-color);
  font-size: 1.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
