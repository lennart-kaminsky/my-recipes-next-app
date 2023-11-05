import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ListInput() {
  return (
    <StyledListForm>
      <label htmlFor="inputListItem">
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <StyledListInput
        id="inputListItem"
        name="inputListItem"
        type="text"
      ></StyledListInput>
    </StyledListForm>
  );
}

const StyledListForm = styled.form`
  display: flex;
  column-gap: 1rem;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  color: var(--secondary-color);
  background-color: var(--third-bg-color);

  border-radius: 10px;
`;

const StyledListInput = styled.input`
  width: 100%;
  color: var(--primary-color);
  background-color: transparent;
  border: none;
  outline: none;
`;
