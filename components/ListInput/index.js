import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonNoStyle } from "../Button";
import useSWR from "swr";

export default function ListInput() {
  const {
    data: shoppingList,
    isLoading,
    error,
  } = useSWR("api/shoppinglists/current");

  if (isLoading) return;
  console.log("Achtung: ", shoppingList);

  async function addProductToList(event) {
    event.preventDefault();

    const newProduct = { name: event.target.elements.inputListItem.value };

    const productResponse = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!productResponse.ok) {
      console.log("Failed to add product:", productResponse.status);
      throw new Error("Failed to add product");
    }
    const addedProductResponse = await productResponse.json();

    const updatedShoppingList = {
      ...shoppingList,
      products: [
        ...shoppingList.products,
        { product: addedProductResponse._id },
      ],
    };
    console.log("updatedShoppingList", updatedShoppingList);

    const updatedShoppingListResponse = await fetch(
      "/api/shoppinglists/current",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedShoppingList),
      }
    );

    if (updatedShoppingListResponse.ok) {
      console.log("Shopping list successfully updated.");
    } else {
      console.log(
        "Error updating shopping list:",
        updatedShoppingListResponse.status
      );
    }
  }

  return (
    <StyledListForm onSubmit={addProductToList}>
      <ButtonNoStyle type="submit">
        <FontAwesomeIcon icon={faPlus} />
      </ButtonNoStyle>
      <StyledListInput
        id="inputListItem"
        name="inputListItem"
        type="text"
        placeholder={isLoading ? "connecting to db..." : "new product"}
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
