import styled from "styled-components";
import { ChangeButton, CircleButton } from "@/components/Button";
import { CircleLink } from "@/components/Link";
import { StyledHeadlineOne } from "@/components/StyledText";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Ingredients from "@/components/Ingredients";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import useSWR from "swr";

export default function RecipeDetails({ handleAddToList }) {
  const [display, setDisplay] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const { data: recipe, isLoading, error } = useSWR(`/api/recipes/${id}`);
  const [portions, setPortions] = useState();

  useEffect(() => {
    if (recipe) {
      setPortions(recipe.portions);
    }
  }, [recipe]);

  if (isLoading) return <h2>is loading...</h2>;
  if (error) return <h2>Failed to load data.</h2>;

  function handleChangeDisplay() {
    setDisplay(!display);
  }

  function handleDecrementPortion() {
    setPortions(portions - 1);
  }
  function handleIncrementPortion() {
    setPortions(portions + 1);
  }
  return (
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
        <CircleButton onClick={() => router.back()}>
          <FontAwesomeIcon icon={faTimes} />
        </CircleButton>
      </RelativeContainer>
      {display ? (
        <Ingredients
          portions={portions}
          handleDecrementPortion={handleDecrementPortion}
          handleIncrementPortion={handleIncrementPortion}
          onAddToList={handleAddToList}
        />
      ) : (
        <StyledPreparation>
          {recipe.preparation
            ? recipe.preparation
            : "No Preparation added yet 😾"}
        </StyledPreparation>
      )}
    </main>
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

const StyledPreparation = styled.p`
  margin: 5%;
  font-size: 1.1rem;
`;
