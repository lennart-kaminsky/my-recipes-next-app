import { checkDecimal } from ".";

// export async function addProductToList(product, amount, currentList) {
//   try {
//     const updatedCurrentListResponse = await fetch(
//       "/api/shoppinglists/current",
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedCurrentList),
//       }
//     );
//     if (updatedCurrentListResponse.ok) {
//       console.log("Shopping list successfully updated.");
//     } else {
//       console.log(
//         "Error updating shopping list:",
//         updatedCurrentListResponse.status
//       );
//     }
//   } catch (error) {}
// }

export async function addToList(recipe, currentList, portions) {
  try {
    const recipeProductsWithAmount = recipe.products.map((product) => ({
      ...product,
      amount: checkDecimal(
        Number.parseFloat((portions * product.amount) / recipe.portions)
      ),
    }));

    const newProducts = recipeProductsWithAmount.filter(
      (recipeProduct) =>
        !currentList.products.find(
          (listProduct) => listProduct.product === recipeProduct.product
        )
    );

    const newExistingProducts = recipeProductsWithAmount.filter(
      (recipeProduct) =>
        currentList.products.find(
          (listProduct) => listProduct.product === recipeProduct.product
        )
    );

    const updatedExistingProducts = currentList.products.map((listProduct) => {
      const existingListProduct = newExistingProducts.find(
        (newExistingProduct) =>
          newExistingProduct.product === listProduct.product
      );

      return existingListProduct
        ? {
            ...listProduct,
            amount:
              Number(listProduct.amount) + Number(existingListProduct.amount),
          }
        : listProduct;
    });

    const updatedCurrentList = {
      ...currentList,
      products: [...newProducts, ...updatedExistingProducts],
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
