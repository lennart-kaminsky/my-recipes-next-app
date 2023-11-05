import styled from "styled-components";
import { ButtonNoStyle } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function ShoppingList({
  shoppingList,
  onList,
  onToggleOnList,
  handleRemoveFromList,
}) {
  return (
    <StyledShoppingList>
      {shoppingList
        .filter((item) => item.onList)
        .map((item) => (
          <StyledShoppingListItem
            key={item.ingredient.id}
            $border={shoppingList.indexOf(item) < shoppingList.length - 1}
          >
            <StyledLabel htmlFor={`checkbox${item.ingredient.id}`}>
              {item.amount + item.ingredient.unit + " " + item.ingredient.name}
              <StyledCheckbox
                id={`checkbox${item.ingredient.id}`}
                name={`checkbox${item.ingredient.id}`}
                type="checkbox"
                onChange={() => onToggleOnList(item.ingredient.id)}
                checked={onList}
              />
              <StyledCheckboxSpan></StyledCheckboxSpan>
            </StyledLabel>
            {onList && (
              <ButtonNoStyle
                onClick={() => handleRemoveFromList(item.ingredient.id)}
              >
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
              </ButtonNoStyle>
            )}
          </StyledShoppingListItem>
        ))}
    </StyledShoppingList>
  );
}

const StyledShoppingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledShoppingListItem = styled.li`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  padding-inline-end: 10px;
  /* padding-block-end: ${({ $border }) => ($border ? "10px" : "0px")};
  border-bottom: ${({ $border }) =>
    $border ? "1px solid var(--primary-color)" : "none"}; */
  width: 100%;
  background-color: var(--third-bg-color);
  padding: 10px 15px;
  border-radius: 10px;
`;

const StyledCheckbox = styled.input`
  width: 0;
  height: 0;
`;

const StyledLabel = styled.label`
  display: flex;
  position: relative;
  padding-inline-start: 2rem;
  user-select: none;

  input:checked ~ span {
    /* border: 2px solid var(--secondary-color); */
  }
  input:checked ~ span:after {
    display: block;
  }
  span:after {
    top: -3px;
    width: 5px;
    height: 10px;
    left: 2px;
    color: var(--primary-bg-color);
  }
`;

const StyledCheckboxSpan = styled.span`
  position: absolute;
  top: 3px;
  left: 0;
  height: 1.1rem;
  width: 1.1rem;
  background-color: var(--secondary-color);
  /* border: 2px solid var(--primary-color); */
  /* background-color: var(--secondary-bg-color); */
  border-radius: 0.3rem;
  &:after {
    content: "✓";
    position: absolute;
    display: none;
  }
`;
