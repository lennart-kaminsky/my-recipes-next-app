import { addProductToList } from "./addToList";

export async function toggleList(
  productToRemove,
  currentList,
  oppositeList,
  listType,
  mutateLists
) {
  try {
    const oppositeListType = listType === "current" ? "history" : "current";

    const updatedProducts = currentList.products.filter(
      (product) => product._id !== productToRemove._id
    );

    const updatedCurrentList = { ...currentList, products: updatedProducts };

    const updatedCurrentListResponse = await fetch(
      `api/shoppinglists/${listType}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCurrentList),
      }
    );
    if (updatedCurrentListResponse.ok) {
      console.log(`Product successfully removed from ${listType} list.`);
    }

    if (listType === "history") {
      await addProductToList(productToRemove, oppositeList);
      await mutateLists();
    } else {
      const updatedOppositeList = {
        ...oppositeList,
        products: [productToRemove, ...oppositeList.products],
      };

      const updatedOppositeListResponse = await fetch(
        `/api/shoppinglists/${oppositeListType}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOppositeList),
        }
      );
      if (updatedOppositeListResponse.ok) {
        console.log(
          `Product successfully moved from ${listType} list to ${oppositeListType} list.`
        );
      }
    }
    mutateLists();
  } catch (error) {
    console.error(
      `Error moving ${productToRemove.name} from ${listType} list to ${oppositeListType} list.`
    );
  }
}
