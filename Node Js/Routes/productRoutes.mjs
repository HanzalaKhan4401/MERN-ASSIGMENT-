import express from "express"
import productController from "../Controllers/productController.mjs";
import { upload } from "../cloudinaryConfig.mjs";
import auth from "../controllers/middlewares/auth.mjs";

const productRouter = express.Router();

productRouter

  // Get Requests
  .get("/", productController.allProducts)
  // .get("/",auth, productController.allProducts)

  // Get single product (keep this at bottom) 
  .get("/:id", productController.getProductById)
  .get("/brand/:brand", productController.getProductByBrand)

  // Post Requests (image + normal)
  .post("/add", productController.addproduct)
  .post("/addproduct", upload.array("image", 5), productController.addProductWithImage)
 
 // with multer middleware
  // .post("/addproduct", upload.array("image", 5), productController.addProductWithImage);


// Delete Requests
.delete("/:id", productController.deleteProduct)

// Patch Requests

// Put Requests
.put("/:id", productController.editProduct)

export default productRouter;