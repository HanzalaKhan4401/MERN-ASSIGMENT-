import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import for redirect

const AddProduct = () => {
    const [token, setToken] = useState("");
    const [mycategories, setCategories] = useState([]);
    const navigate = useNavigate(); // ✅ create navigate instance

    const addProduct = async (e) => {
        e.preventDefault();

        let title = document.getElementById("title").value;
        let description = document.getElementById("desc").value;
        let rating = document.getElementById("rating").value;
        let price = document.getElementById("price").value;
        let brand = document.getElementById("brand").value;
        let category = document.getElementById("category").value;
        let images = document.getElementById("image");
        let stock = document.getElementById("stock").value;
        let discountPercentage = document.getElementById("discountPercentage").value;

        if (
            title === "" ||
            description === "" ||
            rating === "" ||
            price == 0 ||
            brand === "" ||
            category === "" ||
            images.files.length === 0 ||
            stock == 0 ||
            discountPercentage == 0
        ) {
            alert("Please fill all fields");
            return;
        }

        let formData = new FormData();
        for (let i = 0; i < images.files.length; i++) {
            formData.append("image", images.files[i]);
        }

        formData.append("title", title);
        formData.append("description", description);
        formData.append("rating", rating);
        formData.append("price", price);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("stock", stock);
        formData.append("discount", discountPercentage);

        try {
            let add = await axios.post("http://localhost:5000/product/addproduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // Authorization: `Bearer ${token}`,
                },
            });

            if (add.status === 200) {
                alert("✅ Product added successfully!");
                navigate("/"); // ✅ redirect to home page
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("❌ Failed to add product!");
        }
    };

    useEffect(() => {
        let jwtToken = localStorage.getItem("token") || "";
        setToken(jwtToken);
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Add a new product!</h2>
            <div className="row">
                <div className="col-md-12">
                    <form encType="multipart/form-data" onSubmit={addProduct}>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="title" placeholder="Title" />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="desc" placeholder="Description" />
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control" id="price" placeholder="Price" />
                        </div>
                        <div className="mb-3">
                            <input type="file" className="form-control" id="image" multiple />
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control" id="stock" placeholder="Stock" />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="discountPercentage"
                                placeholder="Discount Percentage"
                            />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" id="category" placeholder="Category" type="text" />
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control" id="rating" placeholder="Rating" max={5} min={1} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="brand" placeholder="Brand" />
                        </div>
                        <button type="submit" className="btn btn-danger w-100">
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
