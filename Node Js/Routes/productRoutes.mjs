import express from "express"
import productController from "../Controllers/productController.mjs";
import { upload } from "../cloudinaryConfig.mjs";

const productRouter = express.Router();

productRouter

  // Get Requests
  .get("/", productController.allProducts)

  // Post Requests
  .post("/add", productController.addproduct)
  .post("/addproduct", upload.array("image", 5), productController.addProductWithImage);


export default productRouter;