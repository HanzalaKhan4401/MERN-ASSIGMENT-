import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "./cartContext";
import { useWishlist } from "./WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchSingle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/product/${id}`);
        console.log("Fetched single product:", res.data.product);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Error fetching single product:", error);
      }
    };
    fetchSingle();
  }, [id]);

  if (!product)
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-3 text-muted">Loading product...</p>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row">
        {/* 🖼️ Product Image Section */}
        <div className="col-md-6 text-center">
          <img
            src={product.images}
            alt={product.title}
            className="img-fluid mb-3 rounded shadow-sm"
            style={{
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* 📝 Product Info Section */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-2">{product.title}</h2>
          <div className="mb-3">
            <span className="text-warning fs-5">★★★★★</span>
            <span className="ms-2 text-success fw-semibold">In Stock</span>
          </div>
          <h3 className="fw-bold text-danger mb-3">${product.price}</h3>
          <p className="text-muted" style={{ maxWidth: 450 }}>
            {product.description || "Experience luxury and comfort with Fusion Fabrics’ exclusive Dior collection."}
          </p>

          {/* 🧮 Quantity and Actions */}
          <div className="d-flex align-items-center mb-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="mx-3 fs-5">{quantity}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
            <button
              className="btn btn-danger ms-4 px-4"
              onClick={() => {
                addToCart(product, quantity);
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>

            {isInWishlist(product._id) ? (
              <button
                className="btn btn-outline-danger ms-2"
                onClick={() => removeFromWishlist(product._id)}
              >
                ❤️ Remove
              </button>
            ) : (
              <button
                className="btn btn-outline-primary ms-2"
                onClick={() => addToWishlist(product)}
              >
                🤍 Wishlist
              </button>
            )}
          </div>

          {/* 🚚 Delivery Info */}
          <div
            className="border p-3 rounded mb-2 d-flex align-items-center gap-3"
            style={{ maxWidth: 400 }}
          >
            <i className="bi bi-truck fs-3 text-danger"></i>
            <div>
              <div className="fw-semibold">Free Delivery</div>
              <small>Enter your postal code for Delivery Availability</small>
            </div>
          </div>

          {/* 🔁 Return Info */}
          <div
            className="border p-3 rounded d-flex align-items-center gap-3"
            style={{ maxWidth: 400 }}
          >
            <i className="bi bi-arrow-counterclockwise fs-3 text-danger"></i>
            <div>
              <div className="fw-semibold">Return Delivery</div>
              <small>
                Free 30 Days Delivery Returns. <a href="#">Details</a>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* 🔙 Back Button */}
      <button
        className="btn btn-outline-secondary mt-5"
        onClick={() => navigate(-1)}
      >
        ← Back to Products
      </button>
    </div>
  );
};

export default ProductDetails;
