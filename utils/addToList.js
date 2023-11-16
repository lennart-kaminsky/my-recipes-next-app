export async function addToList(recipe, currentList) {
  try {
    const updatedCurrentList = {
      ...currentList,
      products: [...currentList.products, ...recipe.products],
    };

    const updatedCurrentListResponse = await fetch(
      "/api/shoppinglists/current",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCurrentList),
      }
    );

    if (updatedCurrentListResponse.ok) {
      console.log("Shopping list successfully updated.");
    } else {
      console.log(
        "Error updating shopping list:",
        updatedCurrentListResponse.status
      );
    }
  } catch (error) {
    console.error("Error updating shopping list:", error.message);
  }
}
