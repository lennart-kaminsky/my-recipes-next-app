import styled from "styled-components";
import Image from "next/image";
import { StyledLink } from "../Link";

import useSWR from "swr";

export default function RecipeWrapper({ favoriteRecipes }) {
  const { data: recipes, isLoading, error } = useSWR("/api/recipes");

  if (isLoading) return <h1>is loading...</h1>;
  if (error) return <h1>failed to load data...</h1>;

  const filteredRecipes = favoriteRecipes
    ? recipes.filter((recipe) => recipe.isFavorite)
    : recipes;

  return (
    <RecipeContainer>
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe._id}>
          <StyledLink href={`/recipes/${recipe._id}`}>
            <CardHeadline>{recipe.name}</CardHeadline>
            <CardImage
              src={recipe.image}
              alt={recipe.name}
              width={250}
              height={250}
              priority={true}
            ></CardImage>
          </StyledLink>
        </RecipeCard>
      ))}
    </RecipeContainer>
  );
}

const RecipeContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding-inline: 5%;
  margin-block: 25px;
`;

const RecipeCard = styled.li`
  position: relative;
  border-radius: 1rem;
  width: 47%;
  min-width: 160px;
  max-width: 180px;
  height: 200px;
  text-align: center;
`;

const CardHeadline = styled.h3`
  font-size: 1.5rem;
  position: absolute;
  top: 0;
  margin: 0;
  padding: 25px 0;
  width: 100%;
  height: 50%;
  background-image: linear-gradient(
    to top,
    rgba(18, 18, 22, 10%),
    rgba(18, 18, 22, 90%)
  );
  border-radius: 20px 20px 0 0;
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;
