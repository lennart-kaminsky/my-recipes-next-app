import { useState } from "react";

import styled from "styled-components";

import { ShoppingList } from "@/components/List";
import { StyledHeadlineTwo } from "@/components/StyledText";
import { TagContainer } from "@/components/TagContainer";
import { FlexRowWrapper } from "@/components/Wrapper";
import { PortionsButton } from "@/components/Button";

import ListInput from "@/components/ListInput";
import { moveToHistoryList } from "@/utils";

export default function List({
  shoppingList,

  handleRemoveFromList,
}) {
  return (
    <MainWithMargin>
      <ListInput></ListInput>
      <ShoppingList
        listType="current"
        onChange={moveToHistoryList}
      ></ShoppingList>
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
        listType="history"
        onChange={moveToHistoryList}
      ></ShoppingList>
    </MainWithMargin>
  );
}

const MainWithMargin = styled.main`
  margin: 5%;
`;
