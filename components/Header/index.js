import Image from "next/image";
import styled from "styled-components";
import { StyledHeadlineOne } from "../StyledText";

export default function Header({ title }) {
  let currentTitle = "";
  switch (title) {
    case "/":
      currentTitle = "Overview";
      break;
    case "/recipes":
      currentTitle = "All Recipes";
      break;
    case "/drugstore":
      currentTitle = "Drugs";
      break;
    case "/shopping-list":
      currentTitle = "Shopping List";
      break;
    default:
      currentTitle = "";
  }

  return (
    <StyledHeader>
      <StyledHeadlineOne>{currentTitle}</StyledHeadlineOne>
      <ProfileImage
        src="/recources/images/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
        alt="avatar"
        width={144}
        height={144}
      ></ProfileImage>
    </StyledHeader>
  );
}

const ProfileImage = styled(Image)`
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 1rem 0rem;
  background-color: var(--secondary-bg-color);
`;
