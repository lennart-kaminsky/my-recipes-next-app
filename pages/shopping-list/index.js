import { ShoppingList } from "@/components/List";

export default function List({
  shoppingList,
  handleToggleOnList,
  handleRemoveFromList,
  shoppingHistory,
}) {
  console.log("shoppingList", shoppingList);
  console.log("shoppingHistory", shoppingHistory);
  return (
    <main>
      <ShoppingList
        shoppingList={shoppingList}
        onToggleOnList={handleToggleOnList}
      ></ShoppingList>
      <ShoppingList
        onList
        shoppingList={shoppingHistory}
        onToggleOnList={handleToggleOnList}
        handleRemoveFromList={handleRemoveFromList}
      ></ShoppingList>

      <button type="button" onClick={() => handleRemoveFromList("all")}>
        Clear shopping history
      </button>
    </main>
  );
}
