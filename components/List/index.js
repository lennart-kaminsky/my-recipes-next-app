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
          <StyledShoppingListItem key={item.ingredient.id}>
            <input
              id={`checkbox${item.ingredient.id}`}
              name={`checkbox${item.ingredient.id}`}
              type="checkbox"
              onChange={() => onToggleOnList(item.ingredient.id)}
              checked={onList}
            />
            {item.amount + item.ingredient.unit + " " + item.ingredient.name}
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

const StyledShoppingList = styled.ul``;

const StyledShoppingListItem = styled.li``;
