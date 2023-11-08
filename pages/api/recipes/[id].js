import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PATCH") {
    try {
      const updatedRecipe = request.body;
      await Recipe.findByIdAndUpdate(id, updatedRecipe);
      response.status(200).json({ status: "Recipe successfully updated." });
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
