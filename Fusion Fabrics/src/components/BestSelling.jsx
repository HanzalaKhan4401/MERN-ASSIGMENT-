import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const BestSelling = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchExpensiveProducts = async () => {
      try {
        // ✅ Fetch all products from backend
        const res = await axios.get("http://localhost:5000/product");

        // ✅ Filter expensive ones (price > 4000), sort high → low, and take top 4
        const expensiveProducts = res.data.products
          .filter((p) => p.price > 4000)
          .sort((a, b) => b.price - a.price)
          .slice(0, 4);

        setProducts(expensiveProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchExpensiveProducts();
  }, []);

  return (
    <div className="container py-5">
      {/* Section Heading */}
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
          This Month
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
          Premium Picks
        </h2>
      </div>

      {/* ✅ Display Expensive Products */}
      <div className="row mt-4">
        {products.length > 0 ? (
          products.map((item, i) => (
            <div className="col-md-3 mb-4" key={i}>
              <ProductCard
                id={item._id}
                img={Array.isArray(item.images) ? item.images[0] : item.images}
                title={item.title}
                oldPrice={item.oldPrice || item.price}
                newPrice={item.price}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No premium products found.</p>
        )}
      </div>
    </div>
  );
};

export default BestSelling;
