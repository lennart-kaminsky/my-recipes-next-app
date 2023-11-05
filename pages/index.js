import RecipeWrapper from "@/components/RecipeWrapper";
import { StyledHeadlineTwo } from "@/components/StyledText";

export default function HomePage({ recipes }) {
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);
  const name = "Hi-my-name-is-Flavio";
  const nameCleaned = name.replace(/-/g, " ");
  console.log(nameCleaned);
  return (
    <main>
      <StyledHeadlineTwo>Your Favorite Recipes</StyledHeadlineTwo>
      <RecipeWrapper recipes={favoriteRecipes}></RecipeWrapper>
    </main>
  );
}
