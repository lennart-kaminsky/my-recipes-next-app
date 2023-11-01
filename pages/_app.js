import { useState } from "react";

import GlobalStyle from "../styles";
import Layout from "@/components/Layout";

import { initialRecipes } from "@/lib/data";

export default function App({ Component, pageProps }) {
  const [recipes, setRecipes] = useState(initialRecipes);

  function handleAddRecipe(newRecipe) {
    setRecipes([...recipes, newRecipe]);
  }

  function handleToggleFavorite(id) {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  }
  console.log("RECEPIES", recipes);

  return (
    <>
      <GlobalStyle />
      <Layout />
      <Component
        {...pageProps}
        recipes={recipes}
        handleAddRecipe={handleAddRecipe}
        handleToggleFavorite={handleToggleFavorite}
      />
    </>
  );
}
