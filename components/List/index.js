import styled from "styled-components";
import { ButtonNoStyle } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";

export function ShoppingList({
  listType,
  onList,
  onToggleOnList,
  handleRemoveFromList,
}) {
  const {
    data: shoppinglist,
    isLoading: isLoadingCurrentList,
    error: errorCurrentList,
  } = useSWR(`/api/shoppinglists/${listType}`);

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useSWR("/api/products");

  if (isLoadingCurrentList || isLoadingProducts)
    return <p>loading shopping list and products...</p>;
  if (errorCurrentList || errorProducts)
    return <p>error loading shopping list or products.</p>;

  console.log("ShoppingListe", shoppinglist.products);

  const test = shoppinglist.products.map((product) =>
    products.find((_product) => _product._id === product._id && "Hi")
  );
  console.log("test", products);

  return (
    <StyledShoppingList>
      {shoppinglist.products.map((product) => (
        <StyledShoppingListItem
          key={product.product}
          $border={
            shoppinglist.products.indexOf(product) < shoppinglist.products - 1
          }
        >
          {products.map(
            (_product) =>
              _product._id === product.product && (
                <StyledLabel
                  key={_product._id}
                  htmlFor={`checkbox${_product._id}`}
                >
                  {product.amount + _product.unit + " " + _product.name}
                  <StyledCheckbox
                    id={`checkbox${_product._id}`}
                    name={`checkbox${_product._id}`}
                    type="checkbox"
                    onChange={() => onToggleOnList(product._id)}
                    checked={listType === "history"}
                  />
                  <StyledCheckboxSpan></StyledCheckboxSpan>
                  {listType === "history" && (
                    <ButtonNoStyle
                      onClick={() => handleRemoveFromList(product._id)}
                    >
                      <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </ButtonNoStyle>
                  )}
                </StyledLabel>
              )
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
