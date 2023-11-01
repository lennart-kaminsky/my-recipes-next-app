import { useEffect, useState } from "react";

import GlobalStyle from "../styles";
import Layout from "@/components/Layout";

import { initialRecipes } from "@/lib/data";

export default function App({ Component, pageProps }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [shoppingList, setShoppingList] = useState([]);

  function handleAddRecipe(newRecipe) {
    setRecipes([...recipes, newRecipe]);
  }

  function handleAddToList(item) {
    // if (item.length === 1) setShoppingList([...shoppingList, item]);

    // if (item.lenght > 1)
    if (item.length > 1) {
      setShoppingList([...shoppingList, ...item]);
    } else {
      setShoppingList([...shoppingList, item]);
    }
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

  return (
    <>
      <GlobalStyle />
      <Layout />
      <Component
        {...pageProps}
        recipes={recipes}
        shoppingList={shoppingList}
        handleAddRecipe={handleAddRecipe}
        handleToggleFavorite={handleToggleFavorite}
        handleAddToList={handleAddToList}
      />
    </>
  );
}
