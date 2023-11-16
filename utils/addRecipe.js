export async function addRecipe(newRecipe) {
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
