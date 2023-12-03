import styled from "styled-components";
import { ShoppingList } from "@/components/List";
import { StyledHeadlineTwo } from "@/components/StyledText";
import { FlexRowWrapper } from "@/components/Wrapper";
import { PortionsButton } from "@/components/Button";
import ListInput from "@/components/ListInput";

import { toggleList } from "@/utils/toggleList";
import removeFromList from "@/utils/removeFromList";
import useSWR from "swr";

export default function List() {
  const {
    data: historyList,
    isLoading,
    mutate,
  } = useSWR("/api/shoppinglists/history");
  if (isLoading) return;
  return (
    <MainWithMargin>
      <ListInput />
      <ShoppingList listType="current" onChange={toggleList} />
      <FlexRowWrapper $spaceBetween>
        <StyledHeadlineTwo>Shopping History</StyledHeadlineTwo>
        <PortionsButton
          type="button"
          onClick={() => {
            removeFromList("all", historyList);
            mutate();
          }}
        >
          Clear all
        </PortionsButton>
      </FlexRowWrapper>
      <ShoppingList listType="history" onChange={toggleList} />
    </MainWithMargin>
  );
}

const MainWithMargin = styled.main`
  margin: 5%;
`;
