import { StyledLink } from "@/components/Link";
import { recipes } from "@/lib/data";
import Image from "next/image";
import styled from "styled-components";
import Navigation from "@/components/Navgation";
import Header from "@/components/Header";

export default function RecipesOverview() {
  return (
    <>
      <Header></Header>
      <Navigation></Navigation>
      <main>
        <h2>All Recipes</h2>
        <RecipeContainer>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id}>
              <StyledLink href={`/recipes/${recipe.slug}`}>
                <CardHeadline>{recipe.name}</CardHeadline>
                <CardImage
                  src={recipe.image.src}
                  alt={recipe.name}
                  width={144}
                  height={144}
                ></CardImage>
              </StyledLink>
            </RecipeCard>
          ))}
        </RecipeContainer>
      </main>
    </>
  );
}

const RecipeContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 1rem;
`;

const RecipeCard = styled.li`
  position: relative;
  border-radius: 1rem;
  width: 40%;
  max-width: 11rem;
  height: 11rem;
  text-align: center;
`;

const CardHeadline = styled.h3`
  font-size: 1rem;
  position: absolute;
  top: 0;
  margin: 0;
  padding: 0.5rem;
  width: 100%;
  height: 40%;
  background-image: linear-gradient(
    to top,
    rgba(18, 18, 22, 30%),
    rgba(18, 18, 22, 90%)
  );
  border-radius: 1rem 1rem 0 0;
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`;
