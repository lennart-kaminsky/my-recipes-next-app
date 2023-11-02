import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function TagContainer({ tag, onRemove, isEdit }) {
  return (
    <StyledTagContainer>
      {tag.map((tag) => (
        <Tag key={tag.id}>
          {tag.name}
          {isEdit ? (
            <ButtonNoStyle onClick={() => onRemove(tag.id)}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </ButtonNoStyle>
          ) : (
            <></>
          )}
        </Tag>
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

const ButtonNoStyle = styled.button`
  border: none;
  background: none;
  color: var(--secondary-color);
`;
