import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const Products = ({ allproducts }) => {
  const [showAll, setShowAll] = useState(false); // 👈 toggle state

  // ✅ Sirf 5-star rating wale products
  const fiveStarProducts = allproducts.filter(
    (item) => item.rating === 5 || item.rating === "5"
  );

  // ✅ Jo products dikhane hain (filtered ya sab)
  const productsToShow = showAll ? allproducts : fiveStarProducts;

  return (
    <div className="container py-5">
      {/* Elegant Heading */}
      <div className="text-center mb-5">
        <p
          style={{
            color: "#2C2C2C",
            fontSize: "0.9rem",
            letterSpacing: "3px",
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
          }}
        >
          Our Products
        </p>

        <h2
          style={{
            fontSize: "2.7rem",
            fontFamily: "'Playfair Display', serif",
            fontWeight: "600",
            fontStyle: "italic",
            color: "#4A4A4A",
            marginBottom: "0",
          }}
        >
          {showAll
            ? "All Fusion Fabrics Collection"
            : "Top 5★ Rated Fusion Fabrics Collection"}
        </h2>
      </div>

      {/* Products */}
      <div className="row">
        {productsToShow.length > 0 ? (
          productsToShow.map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <Link
                to={`/product/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCard
                  id={item._id}
                  img={Array.isArray(item.images) ? item.images[0] : item.images}
                  title={item.title}
                  oldPrice={item.oldPrice || item.price}
                  newPrice={item.newPrice || item.price}
                />
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-muted py-5">
            No products found ⭐
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-danger btn-lg rounded-pill px-5"
          onClick={() => setShowAll(!showAll)} // 👈 toggle
        >
          {showAll ? "Show 5★ Products Only" : "View All Perfumes"}
        </button>
      </div>
    </div>
  );
};

export default Products;
