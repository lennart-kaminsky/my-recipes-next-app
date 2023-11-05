import Header from "@/components/Header";
import Navigation from "@/components/Navgation";
import RecipeWrapper from "@/components/RecipeWrapper";

export default function HomePage({ recipes }) {
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  return (
    <main>
      <h2>Your Favorite Recipes</h2>
      <RecipeWrapper recipes={favoriteRecipes}></RecipeWrapper>
    </main>
  );
}
