import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(recipe);
  }

  if (request.method === "PUT") {
    try {
      const updatedRecipe = request.body;

      // Make sure the recipe exists
      const existingRecipe = await Recipe.findById(id);
      if (!existingRecipe) {
        return response.status(404).json({ status: "Not Found" });
      }

      // Update the recipe document with the new data
      const updatedRecipeDocument = await Recipe.findByIdAndUpdate(
        id,
        updatedRecipe,
        {
          new: true, // Return the modified document
          runValidators: true, // Run validators for the update
        }
      );

      // Send the updated recipe as the response
      response.status(200).json({
        status: "Recipe successfully updated.",
        recipe: updatedRecipeDocument,
      });
    } catch (error) {
      response.status(400).json({ status: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Recipe.findByIdAndDelete(id);
      response.status(200).json({ status: "Place successfully deleted." });
    } catch (error) {
      response.status(400).json({ status: error.message });
    }
  }
}
