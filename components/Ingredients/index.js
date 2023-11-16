import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMinus,
  faPlus,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { TagContainer } from "../TagContainer";
import { StyledHeadlineTwo } from "../StyledText";
import { FlexRowWrapper } from "../Wrapper";
import { PortionsButton } from "../Button";
import { TableIngredients } from "../Table";

import { useState } from "react";
import { RecipeForm } from "../RecipeForm";

import { addToList } from "@/utils/addToList";
import useSWR from "swr";

export default function Ingredients({
  portions,
  recipe,
  handleDecrementPortion,
  handleIncrementPortion,
  onToggleFavorite,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: currentShoppinglist } = useSWR("/api/shoppinglists/current");
  // const { data: historyShoppinglist } = useSWR("/api/shoppinglists/history");

  return (
    <>
      <IngredientsContainer>
        <FlexRowWrapper $spaceBetween $gap>
          <PortionsRegulator>
            <PortionsButton
              onClick={handleDecrementPortion}
              disabled={portions <= 1}
            >
              <FontAwesomeIcon icon={faMinus} />
            </PortionsButton>
            <span>{portions} portions</span>
            <PortionsButton onClick={handleIncrementPortion}>
              <FontAwesomeIcon icon={faPlus} />
            </PortionsButton>
          </PortionsRegulator>
          <PortionsButton
            $single
            $isHighlighted={!recipe.onList}
            type="button"
            onClick={() => addToList(recipe, currentShoppinglist)}
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </PortionsButton>
          <PortionsButton
            $single
            $isHighlighted={!recipe.isFavorite}
            type="button"
            onClick={() => onToggleFavorite(recipe._id)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </PortionsButton>
          <PortionsButton
            $single
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </PortionsButton>
        </FlexRowWrapper>
        {isEditMode && <RecipeForm></RecipeForm>}
        <StyledHeadlineTwo>Groceries</StyledHeadlineTwo>
        <TableIngredients portions={portions} recipe={recipe} />

        {recipe.spices.length > 0 && (
          <>
            <StyledHeadlineTwo>Spices</StyledHeadlineTwo>
            <TagContainer tags={recipe.spices} />
          </>
        )}
        {recipe.sauces.length > 0 && (
          <>
            <StyledHeadlineTwo>Sauces</StyledHeadlineTwo>
            <TagContainer tags={recipe.sauces} />
          </>
        )}
      </IngredientsContainer>
    </>
  );
}

const IngredientsContainer = styled.div`
  margin: 5%;
`;

const PortionsRegulator = styled.div`
  width: 50%;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  padding-block: 10px;
  background-color: var(--secondary-bg-color);
  border-radius: 10px;
`;
