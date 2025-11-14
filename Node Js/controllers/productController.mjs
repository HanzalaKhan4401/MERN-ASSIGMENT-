import Product from "../models/productModel.mjs";

let allProducts = async (req, res) => {
  try {
    console.log("Fetching all products...");
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({
      message: "Our Products",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: error.message });
  }
};


//Add Product
let addproduct = async (req, res) => {
    try {
        const product = req.body;
        let newProduct = new Product({
            title: product.title,
            description: product.description,
            price: product.price,
            discount: product.discount,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            rating: product.rating,
            images: product.images,
        });
        let addprod = await newProduct.save();
        if(addprod){
            res.status(200).json({message: "Product Added Successfully...!", product:addprod});
        }else{
            res.status(500).json({message: "Failed To Add Product...!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};


// Add Product With Image
// Add Product With Image
let addProductWithImage = async (req, res) => {
  try {
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    // ✅ Convert uploaded files to array of URLs
    let imagesArray = [];
    if (req.files && req.files.length > 0) {
      imagesArray = req.files.map((file) => file.path || file.url);
    }

    const {
      title,
      description,
      price,
      discount,
      stock,
      brand,
      category,
      rating,
    } = req.body;

    // ✅ Create new product
    const newProduct = new Product({
      title,
      description,
      price,
      discount,
      stock,
      brand,
      category,
      rating,
      images: imagesArray,
    });

    const savedProduct = await newProduct.save();

    res.status(200).json({
      message: "✅ Product Added Successfully with Images...!",
      product: savedProduct,
    });
  } catch (error) {
    console.log("❌ Error in addProductWithImage:", error);
    res.status(500).json({ message: error.message });
  }
};


// get product by id
let getProductById = async (req, res) => {
  try {
    const id = req.params.id; // URL se id le rahe hain
    console.log("Requested Product ID:", id);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found...!" });
    }

    res.status(200).json({ message: "Product Found", product });
  } catch (error) {
    console.log("Error in singleProduct:", error);
    res.status(500).json({ message: error.message });
  }
};


// get product by brand

const getProductByBrand = async (req, res) => {
  try {
    let brand = req.params.brand;
    let products = await product.find({ brand: brand }); // find returns an array of objects
    if(products.length > 0){
      res.status(200).json({ message: `Showing Products Of ${brand}`, products: products});
    }else{
      res.status(404).json({ message: "No Product Found...!"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message});
  }
}

// delete product 
let deleteProduct = async (req, res) => {
  try {
    let deleted = await Product.deleteOne({ _id: req.params.id });
    if (deleted.deletedCount > 0) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// edit product - put request
let editProduct = async (req, res) =>{
  try {
    const id = req.params.id;
    const prod = await Product.findById(id);
    if(prod){
      const product = req.body;
      let updatedProduct = new Product({
        _id: id,
        title: product.title,
        description: product.description,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        rating: product.rating,
        images: product.images,
      });
      let updateprod = await Product.updateOne({_id: id}, updatedProduct);
      if(updateprod){
        res.status(200).json({message: "Product Update Successfully...!", product: updateprod});
      }else{
        res.status(500).json({message: "Failed To Update Product...!"});
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
    
  }
};

const productController = {
  allProducts,
  addproduct,
  addProductWithImage,
  getProductById,
  getProductByBrand,
  deleteProduct,
  editProduct,
};

export default productController;