import { useWishlist } from "./WishlistContext";
import { Link } from "react-router-dom";

const ProductCard = ({ id, img, title, oldPrice, newPrice }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  return (
    <Link
    to={`/product/${id}`}
    style={{ textDecoration: "none", color: "inherit" }}
  >
<div className="card shadow-sm rounded-4 overflow-hidden">
      <img
        src={img}
        className="card-img-top"
        alt={title}
        style={{
          height: "250px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{title}</h5>
        <p className="card-text mb-2">
          <del className="text-muted me-2">${oldPrice}</del>
          <span className="text-danger fw-bold">${newPrice}</span>
        </p>
        <div className="d-flex justify-content-center gap-2"> 
     
                
          <button className="btn btn-outline-danger btn-sm">Buy Now</button> 
          
          {isInWishlist(id) ? (
            <button 
              className="btn btn-outline-danger btn-sm" 
              onClick={(e) => {
                e.preventDefault();
                removeFromWishlist(id);
              }}
            >
              <i className="bi bi-heart-fill"></i>
            </button>
          ) : (
            <button 
              className="btn btn-sm"
                style={{ color: '#2C2C2C', border: '1px solid #4A4A4A' }} 
              onClick={(e) => {
                e.preventDefault();
                addToWishlist({ id, img, title, oldPrice, newPrice });
              }}
            >
              <i className="bi bi-heart"></i>
            </button>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
