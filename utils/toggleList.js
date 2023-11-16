export async function toggleList(
  productToRemove,
  currentList,
  oppositeList,
  listType,
  mutateLists
) {
  const oppositeListType = listType === "current" ? "history" : "current";

  try {
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

    const updatedOppositeList = {
      ...oppositeList,
      products: [...oppositeList.products, productToRemove],
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
    mutateLists();
  } catch (error) {
    console.error(
      "Error moving product from shopping list to shopping history."
    );
  }
}
