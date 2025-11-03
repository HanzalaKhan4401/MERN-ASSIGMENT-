import express from "express"
import productController from "../Controllers/productController.mjs";

const productRouter = express.Router();

productRouter

// Get Requests
.get("/", productController.allProducts)

// Post Requests
.post("/add", productController.addproduct)

export default productRouter;