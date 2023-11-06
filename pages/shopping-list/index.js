import { useState } from "react";

import styled from "styled-components";

import { ShoppingList } from "@/components/List";
import { StyledHeadlineTwo } from "@/components/StyledText";
import { TagContainer } from "@/components/TagContainer";
import { FlexRowWrapper } from "@/components/Wrapper";
import { PortionsButton } from "@/components/Button";

import ListInput from "@/components/ListInput";

export default function List({
  recipes,
  shoppingList,
  handleToggleOnList,
  handleRemoveFromList,
  shoppingHistory,
}) {
  const recipesOnList = recipes.filter((recipe) => recipe.onList);

  // const [onListLength, setOnListLength] = useState(
  //   recipesOnList.map((recipeOnList) =>
  //     recipeOnList.ingredients.filter((ingredient) =>
  //       shoppingList.find((item) => {
  //         const length = item.ingredient.id === ingredient.ingredient.id;
  //       })
  //     ).length && length > 0
  //       ? { ...recipeOnList, percentOnList: length }
  //       : recipeOnList
  //   )
  // );
  // console.log("TESTTTTT", onListLength);

  console.log("shoppingList", shoppingList);
  console.log("shoppingHistory", shoppingHistory);
  return (
    <MainWithMargin>
      <ListInput></ListInput>
      <ShoppingList
        shoppingList={shoppingList}
        onToggleOnList={handleToggleOnList}
      ></ShoppingList>
      <TagContainer tag={recipesOnList}></TagContainer>
      <FlexRowWrapper $spaceBetween>
        <StyledHeadlineTwo>Shopping History</StyledHeadlineTwo>
        <PortionsButton
          type="button"
          onClick={() => handleRemoveFromList("all")}
        >
          Clear all
        </PortionsButton>
      </FlexRowWrapper>
      <ShoppingList
        onList
        shoppingList={shoppingHistory}
        onToggleOnList={handleToggleOnList}
        handleRemoveFromList={handleRemoveFromList}
      ></ShoppingList>
    </MainWithMargin>
  );
}

const MainWithMargin = styled.main`
  margin: 5%;
`;
