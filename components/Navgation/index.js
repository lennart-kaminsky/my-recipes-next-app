import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBurger,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { StyledLink } from "../Link";

export default function Navigation({ currentPage }) {
  return (
    <nav>
      <NavigationList>
        <li>
          <StyledLink $current={currentPage === "/"} href="/">
            <FontAwesomeIcon icon={faHome} />
          </StyledLink>
        </li>
        <li>
          <StyledLink $current={currentPage === "/recipes"} href="/recipes">
            <FontAwesomeIcon icon={faBurger} />
          </StyledLink>
        </li>
        <li>
          <StyledLink
            $current={currentPage === "/shopping-list"}
            href="/shopping-list"
          >
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
  background-color: var(--secondary-bg-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
