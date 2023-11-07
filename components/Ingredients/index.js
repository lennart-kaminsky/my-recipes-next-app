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

export default function Ingredients({
  portions,
  recipe,
  handleDecrementPortion,
  handleIncrementPortion,
  onToggleFavorite,
  onAddToList,
}) {
  // console.log("RZEPPPPPT", recipe.spices);
  return (
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
          onClick={() => onAddToList(recipe)}
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
          onClick={() => console.log("edit recipe")}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </PortionsButton>
      </FlexRowWrapper>
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
          <TagContainer tag={recipe.sauces} />
        </>
      )}
    </IngredientsContainer>
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
