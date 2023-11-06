import { useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { ChangeButton } from "@/components/Button";
import { CircleLink } from "@/components/Link";
import { StyledHeadlineOne } from "@/components/StyledText";

import Ingredients from "@/components/Ingredients";
import useSWR from "swr";

export default function RecipeDetails({
  //recipes,
  handleToggleFavorite,
  handleAddToList,
}) {
  const [display, setDisplay] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  // const recipe = recipes.find((recipe) => recipe.slug === slug);
  //--------------------------------------
  //
  //
  //
  const { data: recipes, isLoading, error } = useSWR("/api/recipes");

  const recipe = recipes.find((recipe) => recipe._id === id);
  const [portions, setPortions] = useState(recipe.portions);
  console.log(recipe);
  //
  //
  //------------------------------------------
  function handleChangeDisplay() {
    setDisplay(!display);
  }

  function handleDecrementPortion() {
    setPortions(portions - 1);
  }
  function handleIncrementPortion() {
    setPortions(portions + 1);
  }

  // return <h1>{recipe.name}</h1>;

  return (
    <>
      <main>
        <RelativeContainer>
          <ShadowContainer>
            <StyledHeadlineOne $isRecipeDetail>{recipe.name}</StyledHeadlineOne>
          </ShadowContainer>
          <DetailsImage
            src={recipe.image}
            alt={recipe.name}
            width={1080}
            height={1080}
            priority={true}
          ></DetailsImage>
          <ChangeButtonContainer>
            <ChangeButton
              left
              display={display}
              onChangeDisplay={handleChangeDisplay}
            >
              Ingredients
            </ChangeButton>
            <ChangeButton
              display={!display}
              onChangeDisplay={handleChangeDisplay}
            >
              Preperation
            </ChangeButton>
          </ChangeButtonContainer>
          <CircleLink $isCancel href="/recipes">
            <FontAwesomeIcon icon={faTimes} />
          </CircleLink>
        </RelativeContainer>
        {display ? (
          <Ingredients
            portions={portions}
            recipe={recipe}
            handleDecrementPortion={handleDecrementPortion}
            handleIncrementPortion={handleIncrementPortion}
            onToggleFavorite={handleToggleFavorite}
            onAddToList={handleAddToList}
          />
        ) : (
          <StyledPreperation>
            {!recipe.preperation
              ? "No Preperation added yet 😾"
              : recipe.preperation}
          </StyledPreperation>
        )}
      </main>
    </>
  );
}

const DetailsImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RelativeContainer = styled.div`
  position: relative;
  height: 45%;
`;

const ChangeButtonContainer = styled.div`
  position: absolute;
  width: 80%;
  max-width: 450px;
  margin-block: 20px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`;

const ShadowContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to top,
    rgba(18, 18, 22, 15%),
    rgba(18, 18, 22, 90%)
  );
`;

const StyledPreperation = styled.p`
  margin: 5%;
`;
