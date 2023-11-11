import mongoose from "mongoose";
import "./Product";

const { Schema } = mongoose;

const shoppinglistSchema = new Schema({
  name: { type: String },
  products: [
    {
      amount: { type: Number },
      product: { type: Schema.Types.ObjectId, ref: "Product" },
    },
  ],
});

const Shoppinglist =
  mongoose.models.Shoppinglist ||
  mongoose.model("Shoppinglist", shoppinglistSchema);

export default Shoppinglist;
