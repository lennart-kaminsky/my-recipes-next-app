import Image from "next/image";
import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <h1>My Recipes</h1>
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
  width: 3rem;
  height: 3rem;
  object-fit: cover;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 1rem 0rem;
`;
