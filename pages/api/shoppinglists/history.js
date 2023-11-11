import dbConnect from "@/db/connect";
import Shoppinglist from "@/db/models/ShoppingList";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const historyShoppinglist = await Shoppinglist.findOne({
      name: "historyShoppingList",
    });
    if (!historyShoppinglist) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json(historyShoppinglist);
  }
}
