import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const recipes = await Recipe.find();
    return response.status(200).json(recipes);
  }

  if (request.method === "POST") {
    try {
      const recipeData = request.body;
      console.log("RECIPEDATA", request.body);
      const addedRecipe = await Recipe.create(recipeData);
      console.log("ADDEDRECIPE", addedRecipe);
      response.status(201).json({ recipe: addedRecipe });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
