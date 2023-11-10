import RecipeWrapper from "@/components/RecipeWrapper";
import { StyledHeadlineTwo } from "@/components/StyledText";

export default function HomePage({ recipes }) {
  // const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  ///TESTING
  // async function addProductAndRecipe() {
  //   const product = { amount: 1, product: { name: "Salami", unit: "Packung" } };
  //   const addedProducts = [];
  //   const productResonse = await fetch("/api/products", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(product.product),
  //   });
  //   if (productResonse.ok) {
  //     const addedProduct = await productResonse.json();
  //     addedProducts.push({
  //       amount: product.amount,
  //       product: addedProduct.product._id,
  //     });
  //   } else {
  //     console.log("failed");
  //   }

  //   const recipe = {
  //     name: "Pizza Salami2",
  //     image:
  //       "https://biancazapatka.com/wp-content/uploads/2023/02/chocolate-chip-cookies-720x1008.jpg",
  //     portions: 2,
  //     isFavorite: false,
  //     onList: false,
  //     products: addedProducts,
  //     spices: [],
  //     sauces: [],
  //     preparation: "pizza in den ofen schieben jamhamham",
  //   };

  //   const responseRecipe = await fetch("api/recipes", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(recipe),
  //   });
  //   if (responseRecipe.ok) {
  //     console.log("responseRecipe is ok.", responseRecipe);
  //   } else {
  //     console.log("responseRecipe is not ok.");
  //   }
  // }
  // addProductAndRecipe();
  return (
    <main>
      <StyledHeadlineTwo>Your Favorite Recipes</StyledHeadlineTwo>
      {/* <RecipeWrapper recipes={favoriteRecipes}></RecipeWrapper> */}
    </main>
  );
}
