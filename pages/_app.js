import { useState } from "react";
import { SWRConfig } from "swr";

import GlobalStyle from "../styles";
import Layout from "@/components/Layout";

import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [shoppingList, setShoppingList] = useState([]);
  const [shoppingHistory, setShoppingHistory] = useState([]);

  function handleAddToList(items) {
    // if (items.ingredients.length > 1) {
    //   const itemsNotInList = items.ingredients
    //     .map((item) =>
    //       //Item is not on in shoppinglist array:
    //       !shoppingList.find(
    //         (listItem) => listItem.ingredient.id === item.ingredient.id
    //       ) ||
    //       //Item is on shopping list but has onList="not" or "wasOnList":
    //       shoppingList.find(
    //         (listItem) =>
    //           listItem.ingredient.id === item.ingredient.id && !listItem.onList
    //       )
    //         ? { ...item, onList: true }
    //         : item
    //     )
    //     .filter((item) => item.onList);
    //   console.log("to add:", itemsNotInList);
    //   setShoppingList([
    //     ...shoppingList.filter((item) => item.onList),
    //     ...itemsNotInList,
    //   ]);

    //   setRecipes(
    //     recipes.map((recipe) =>
    //       recipe.id === items.id ? { ...recipe, onList: true } : recipe
    //     )
    //   );
    // } else {
    //   setShoppingList([...shoppingList, items.ingredients]);
    // }
    console.log("Ich werde etwas zur Liste adden :)");
  }

  function handleToggleOnList(id) {
    const shoppingItem = shoppingList.find((item) => item.ingredient.id === id);
    if (shoppingItem.onList) {
      setShoppingList(
        shoppingList.map((item) =>
          item.ingredient.id === id ? { ...item, onList: false } : item
        )
      );
      setShoppingHistory([
        ...shoppingHistory,
        { ...shoppingItem, onList: true },
      ]);
    }
    if (!shoppingItem.onList) {
      setShoppingList(
        shoppingList.map((item) =>
          item.ingredient.id === id ? { ...item, onList: true } : item
        )
      );
      setShoppingHistory(
        shoppingHistory.filter((item) => item.ingredient.id !== id)
      );
    }
  }

  function handleRemoveFromList(id) {
    if (id === "all") {
      setShoppingHistory([]);
    } else {
      console.log("CLICKKKKK");
      setShoppingHistory(
        shoppingHistory.filter((item) => item.ingredient.id !== id)
      );
    }
  }

  function handleToggleFavorite(id) {
    // setRecipes(
    //   recipes.map((recipe) =>
    //     recipe.id === id
    //       ? { ...recipe, isFavorite: !recipe.isFavorite }
    //       : recipe
    //   )
    // );
    console.log("Ich werde isFavorite togglen :)");
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Layout />
        <Component
          {...pageProps}
          shoppingList={shoppingList}
          shoppingHistory={shoppingHistory}
          handleToggleFavorite={handleToggleFavorite}
          handleAddToList={handleAddToList}
          handleToggleOnList={handleToggleOnList}
          handleRemoveFromList={handleRemoveFromList}
        />
      </SWRConfig>
    </>
  );
}
