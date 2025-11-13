import React from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate(); // ✅ Create navigate instance

  // ✅ subtotal calculation
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // ✅ Function to handle button click
  const goToCheckout = () => {
    navigate("/checkout"); // redirect to checkout page
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <table className="table align-middle bg-white rounded shadow-sm">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                cart.map((item, i) => (
                  <tr key={i}>
                    <td className="d-flex align-items-center gap-3">
                      <img
                        src={item.images}
                        alt={item.title}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "contain",
                          borderRadius: 8,
                        }}
                      />
                      <span>{item.title}</span>
                    </td>
                    <td>${item.price}</td>
                    <td style={{ width: 120 }}>
                      <select
                        className="form-select"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                      >
                        {[...Array(10)].map((_, n) => (
                          <option key={n + 1} value={n + 1}>
                            {(n + 1).toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>${Number(item.price) * item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-link text-danger fs-4"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove"
                      >
                        <i className="bi bi-x-circle"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="col-lg-4">
          <div className="border rounded p-4 shadow-sm" style={{ minWidth: 300 }}>
            <h5 className="fw-bold mb-3">Cart Total</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Pay by:</span>
              <span>Card</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-semibold">Total:</span>
              <span className="fw-semibold">${subtotal}</span>
            </div>

            {/* ✅ Redirect to Checkout on click */}
            <button
              className="btn btn-danger w-100 rounded-pill"
              onClick={goToCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
