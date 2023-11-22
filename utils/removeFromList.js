export default async function removeFromList(id, historyList) {
  try {
    if (id === "all") {
      const updatedHistoryListResponse = await fetch(
        "/api/shoppinglists/history",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...historyList, products: [] }),
        }
      );
      if (updatedHistoryListResponse.ok) {
        console.log("Shopping history successfully cleared.");
      } else {
        console.log(
          "Error clearing shopping history:",
          updatedHistoryListResponse.status
        );
      }
    } else {
      const updatedProducts = historyList.products.filter(
        (product) => product._id !== id
      );
      console.log("updatedProducts", updatedProducts);
      const updatedHistoryListResponse = await fetch(
        "/api/shoppinglists/history",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...historyList, products: updatedProducts }),
        }
      );
      if (updatedHistoryListResponse.ok) {
        console.log("Product successfully removed from shopping history.");
      } else {
        console.log(
          "Error removing product from shopping history:",
          updatedHistoryListResponse.status
        );
      }
    }
  } catch (error) {}
}
