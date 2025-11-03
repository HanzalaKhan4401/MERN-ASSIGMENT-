import Product from "../models/productModel.mjs";

//Fetch All Products
let allProducts = async (req, res) => {
    try {
        let products = await Product.find();
        if(products){
            res.status(200).json({message: "Our Products", products:products});
        }else{
            res.status(500).json({message: "Failed To Fetch All Products"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

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
            res.status(200).json({message: "Product Added Successfully", product:addprod});
        }else{
            res.status(500).json({message: "Failed To Add Product"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};





const productController = {
    allProducts,
    addproduct
}

export default productController;