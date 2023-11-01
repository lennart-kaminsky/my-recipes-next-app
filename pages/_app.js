import { useState } from "react";

import GlobalStyle from "../styles";
import Layout from "@/components/Layout";

import { initialRecipes } from "@/lib/data";

export default function App({ Component, pageProps }) {
  const [recipes, setRecipes] = useState(initialRecipes);

  function handleAddRecipe(newRecipe) {
    setRecipes([...recipes, newRecipe]);
  }

  return (
    <>
      <GlobalStyle />
      <Layout />
      <Component
        {...pageProps}
        recipes={recipes}
        handleAddRecipe={handleAddRecipe}
      />
    </>
  );
}
