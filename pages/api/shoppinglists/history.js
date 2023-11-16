import dbConnect from "@/db/connect";
import Shoppinglist from "@/db/models/ShoppingList";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const historyShoppinglist = await Shoppinglist.findOne({
      name: "history",
    });
    if (!historyShoppinglist) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json(historyShoppinglist);
  }

  if (request.method === "PUT") {
    try {
      const updatedHistoryList = request.body;

      const existingHistoryList = await Shoppinglist.findOne({
        name: "history",
      });

      if (!existingHistoryList) {
        response.status(404).json({ status: "Not Found" });
      }

      const updatedHistoryListDocument = await Shoppinglist.findOneAndUpdate(
        { name: "history" },
        updatedHistoryList,
        { new: true, runValidators: true }
      );
      response.status(200).json({
        status: "Shoppinglist successfully updated",
        updatedHistoryList: updatedHistoryListDocument,
      });
    } catch (error) {
      response.status(400).json({ status: error.message });
    }
  }
}
