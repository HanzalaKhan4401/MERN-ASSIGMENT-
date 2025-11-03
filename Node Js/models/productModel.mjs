import mongoose from "mongoose";

const { Schema } = mongoose;
const productSchema = new Schema({
  title: { type: String, required: [true, "Title Is Required"] },
  discription: { type: String },
  price: { type: Number, required: [true, "Price Is Required"] },
  discount: {
    type: Number,
    min: [0, "Minimum Discount Of Product Must Be 0"],
    max: [0, "Maximum Discount Of Product Must Be 5"],
    required: [true, "Discount Is Required"],
  },
  rating: {
    type: Number,
    min: [0, "Minimum Discount Of Product Must Be 0"],
    max: [0, "Maximum Discount Of Product Must Be 5"],
    default: 0,
  },
  stock: { type: Number, min: [1, "Minimum stock of product must be 1"] },
  brand: {type: String, required: [true, "Brand Is Required"]},
  category: {type: String, required: [true, "Category Is Required"]},
  images: {type: {String}, required: [true, "Brand Is Required"]},
});

const Product = mongoose.model("Product", productSchema);
export default Product;