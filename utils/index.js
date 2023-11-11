import useSWR from "swr";

export function kebabCase(string) {
  return string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join("-")
    .toLowerCase();
}

export async function handleAddRecipe(newRecipe) {
  try {
    // Add the recipe and associated products, spices, and sauces simultaneously
    const [recipeResponse, productsResponse, spicesResponse, saucesResponse] =
      await Promise.all([
        fetch("/api/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newRecipe.name,
            image: newRecipe.image,
            portions: newRecipe.portions,
            isFavorite: false,
            onList: false,
            products: [], // Include an empty array for products initially
            spices: [],
            sauces: [],
            preparation: newRecipe.preparation,
          }),
        }),
        Promise.all(
          newRecipe.products.map(async (product) => {
            const productResponse = await fetch("/api/products", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(product.product),
            });

            if (!productResponse.ok) {
              console.log("Failed to add product:", productResponse.status);
              throw new Error("Failed to add product");
            }

            const addedProductResponse = await productResponse.json();
            return {
              amount: product.amount,
              product: addedProductResponse.product._id,
            };
          })
        ),
        Promise.all(
          newRecipe.spices.map(async (spice) => {
            const spiceResponse = await fetch("/api/products", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(spice),
            });

            if (!spiceResponse.ok) {
              console.log("Failed to add spice:", spiceResponse.status);
              throw new Error("Failed to add spice");
            }

            const addedSpiceResponse = await spiceResponse.json();
            return addedSpiceResponse.product._id;
          })
        ),
        Promise.all(
          newRecipe.sauces.map(async (sauce) => {
            const sauceResponse = await fetch("/api/products", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sauce),
            });

            if (!sauceResponse.ok) {
              console.log("Failed to add sauce:", sauceResponse.status);
              throw new Error("Failed to add sauce");
            }

            const addedSauceResponse = await sauceResponse.json();
            return addedSauceResponse.product._id;
          })
        ),
      ]);

    if (recipeResponse.ok) {
      const addedRecipeResponse = await recipeResponse.json();
      const recipeWithAddedProducts = {
        ...addedRecipeResponse.recipe,
        products: productsResponse.filter(Boolean),
        spices: spicesResponse.filter(Boolean),
        sauces: saucesResponse.filter(Boolean),
      };

      // Update the recipe with associated products, spices, and sauces
      const updateRecipeResponse = await fetch(
        `/api/recipes/${addedRecipeResponse.recipe._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeWithAddedProducts),
        }
      );

      if (updateRecipeResponse.ok) {
        // router.push("/recipes");
        console.log(
          "Recipe successfully updated with associated products, spices and sauces"
        );
      } else {
        console.log("Error updating recipe:", updateRecipeResponse.status);
      }
    } else {
      console.log("Error adding recipe:", recipeResponse.status);
    }
  } catch (error) {
    console.error("Error adding recipe:", error.message);
    // Handle the error (e.g., show a user-friendly error message)
  }
}

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

export async function moveToHistoryList(
  productToRemove,
  currentList,
  oppositeList,
  listType
) {
  console.log("--product to remove", productToRemove);
  console.log("--current list", currentList);
  console.log("--opposite list", oppositeList);
  console.log("--list type", listType);
  console.log("toggle toggle");
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
      console.log(
        `Product successfully moved from ${listType} list to ${oppositeListType} list.`
      );
    }

    const updatedOppositeList = {
      ...oppositeList,
      products: [...oppositeList.products, productToRemove],
    };

    const updatedOppositeListResponse = await fetch(
      `/api/shoppinglists/${oppositeListType}`,
      {
        method: "PUT",
        hearders: {
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

    console.log("updatedCurrentListResponse", updatedCurrentListResponse);
  } catch (error) {
    console.error(
      "Error moving product from shopping list to shopping history."
    );
  }
}
