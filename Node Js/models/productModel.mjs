import mongoose from "mongoose";

const { Schema } = mongoose;
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      max: [5, "Maximum rating must be 5"], // ✅ message fixed
      default: 0,
    },
    images: [String], // ✅ simple string array (Cloudinary URLs)
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;