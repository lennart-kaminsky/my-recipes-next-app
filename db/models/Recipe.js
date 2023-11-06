import mongoose from "mongoose";
import "./Product";
const { Schema } = mongoose;

const productAmountSchema = new Schema({
  amount: { type: Number },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const recipeSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  portions: { type: Number },
  isFavorite: { type: Boolean },
  onList: { type: Boolean },
  products: [productAmountSchema],
  spices: { type: [Schema.Types.ObjectId], ref: "Product" },
  sauces: { type: [Schema.Types.ObjectId], ref: "Product" },
  preperation: { type: String },
});

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
