import styled from "styled-components";

import { ShoppingList } from "@/components/List";
import { StyledHeadlineTwo } from "@/components/StyledText";

import { FlexRowWrapper } from "@/components/Wrapper";
import { PortionsButton } from "@/components/Button";

import ListInput from "@/components/ListInput";
import { toggleList } from "@/utils/toggleList";

export default function List({ handleRemoveFromList }) {
  return (
    <MainWithMargin>
      <ListInput></ListInput>
      <ShoppingList listType="current" onChange={toggleList}></ShoppingList>
      <FlexRowWrapper $spaceBetween>
        <StyledHeadlineTwo>Shopping History</StyledHeadlineTwo>
        <PortionsButton
          type="button"
          onClick={() => handleRemoveFromList("all")}
        >
          Clear all
        </PortionsButton>
      </FlexRowWrapper>
      <ShoppingList listType="history" onChange={toggleList}></ShoppingList>
    </MainWithMargin>
  );
}

const MainWithMargin = styled.main`
  margin: 5%;
`;
