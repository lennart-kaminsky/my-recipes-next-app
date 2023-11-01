import styled from "styled-components";

export function TagContainer({ tag }) {
  return (
    <StyledTagContainer>
      {tag.map((tag) => (
        <Tag key={tag.id}>{tag.name}</Tag>
      ))}
    </StyledTagContainer>
  );
}
const StyledTagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Tag = styled.li`
  border: 1px solid var(--primary-color);
  border-radius: 0.9rem;
  padding: 0.3rem 0.5rem;
`;
