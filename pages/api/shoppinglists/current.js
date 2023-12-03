import dbConnect from "@/db/connect";
import Shoppinglist from "@/db/models/ShoppingList";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const currentShoppinglist = await Shoppinglist.findOne({
      name: "current",
    });
    if (!currentShoppinglist) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json(currentShoppinglist);
  }

  if (request.method === "PUT") {
    try {
      const updatedCurrentList = request.body;

      const existingCurrentList = await Shoppinglist.findOne({
        name: "current",
      });
      if (!existingCurrentList) {
        response.status(404).json({ status: "Not Found" });
      }

      const updatedCurrrentListDocument = await Shoppinglist.findOneAndUpdate(
        { name: "current" },
        updatedCurrentList,
        { new: true, runValidators: true }
      );

      response.status(200).json({
        status: "Shoppinglist successfully updated",
        currentShoppinglist: updatedCurrrentListDocument,
      });
    } catch (error) {
      response.status(400).json({ status: error.message });
    }
  }
}
