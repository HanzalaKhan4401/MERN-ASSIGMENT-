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


// Add Product With Image
// Add Product With Image
let addProductWithImage = async (req, res) => {
    try {
        console.log("Files:", req.files);
        console.log("Body:", req.body);

        let imagesArray = [];
        if(req.files && req.files.length > 0){
            req.files.forEach(file => {
                console.log(file); // Log to see what keys exist
                // CloudinaryStorage may return file.path, file.filename, or file.url
                imagesArray.push(file.path || file.filename || file.url);
            });
        }

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
            images: imagesArray,
        });

        let addprod = await newProduct.save();

        if(addprod){
            res.status(200).json({message: "Product Added Successfully with Images!", product: addprod});
        } else {
            res.status(500).json({message: "Failed To Add Product with Images!"});
        }
    } catch (error) {
        console.log("Error in addProductWithImage:", error);
        res.status(500).json({message: error.message});
    }
}


// let addProductWithImage = async (req, res) =>{
//     try {
//         console.log("Files:", req.files);
//         console.log("Body:", req.body);

//         let imagesArray = [];
//        req.files.forEach((element) => {
//          imagesArray.push(element.path);
//        });
//         const product = req.body;
//         let newProduct = new Product({
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           discount: product.discount,
//           stock: product.stock,
//           brand: product.brand,
//           category: product.category,
//           rating: product.rating,
//           images: imagesArray,
//         });
//         let addprod = await newProduct.save();
//         if(addprod){
//             res.status(200).json({message: "Product Added Successfully...!", product:addprod});
//         }else{
//             res.status(500).json({message: "Failed To Add Product...!"});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: error.message});
//     }
// }


const productController = { 
    allProducts,
    addproduct,
    addProductWithImage
}

export default productController;