import { useState } from "react";
import { SWRConfig } from "swr";

import GlobalStyle from "../styles";
import Layout from "@/components/Layout";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [shoppingList, setShoppingList] = useState([]);
  const [shoppingHistory, setShoppingHistory] = useState([]);

  function handleAddToList(items) {
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

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Layout />
        <Component
          {...pageProps}
          shoppingList={shoppingList}
          shoppingHistory={shoppingHistory}
          handleAddToList={handleAddToList}
          handleToggleOnList={handleToggleOnList}
          handleRemoveFromList={handleRemoveFromList}
        />
      </SWRConfig>
    </>
  );
}
