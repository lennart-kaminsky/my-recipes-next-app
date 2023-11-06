import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  unit: { type: String },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
