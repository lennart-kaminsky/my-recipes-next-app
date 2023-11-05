import RecipeWrapper from "@/components/RecipeWrapper";
import { StyledHeadlineTwo } from "@/components/StyledText";

export default function HomePage({ recipes }) {
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  return (
    <main>
      <StyledHeadlineTwo>Your Favorite Recipes</StyledHeadlineTwo>
      <RecipeWrapper recipes={favoriteRecipes}></RecipeWrapper>
    </main>
  );
}
