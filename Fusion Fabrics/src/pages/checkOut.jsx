import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext"; // adjust path if needed

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    // Shipping & payment form state
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "", 
        paymentMethod: "card", // or "cod"
        cardNumber: "",
        cardName: "",
        cardExpiry: "",
        cardCVC: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [orderMsg, setOrderMsg] = useState(null);

    // Totals
    const subtotal = cart.reduce(
        (s, item) => s + Number(item.price || item.newPrice || 0) * (item.quantity || 1),
        0
    );
    const shipping = subtotal > 50000 ? 0 : 999; // example: free over 50k
    const tax = Math.round(subtotal * 0.12); // 12% tax example
    const total = subtotal + shipping + tax;

    // Helpers
    const formatCurrency = (v) =>
        v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const validate = () => {
        const errs = {};
        if (!form.fullName.trim()) errs.fullName = "Full name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        if (!form.phone.trim()) errs.phone = "Phone is required";
        if (!form.address.trim()) errs.address = "Address is required";
        if (!form.city.trim()) errs.city = "City is required";
        if (!form.postalCode.trim()) errs.postalCode = "Postal code required";
        if (!form.country.trim()) errs.country = "Country required";

        if (form.paymentMethod === "card") {
            if (!form.cardNumber.trim()) errs.cardNumber = "Card number required";
            if (!form.cardName.trim()) errs.cardName = "Name on card required";
            if (!form.cardExpiry.trim()) errs.cardExpiry = "Expiry required";
            if (!form.cardCVC.trim()) errs.cardCVC = "CVC required";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setOrderMsg(null);

        if (cart.length === 0) {
            setOrderMsg({ type: "error", text: "Your cart is empty." });
            return;
        }

        if (!validate()) {
            setOrderMsg({ type: "error", text: "Please fix form errors." });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token") || "";
            
            // Build order payload
            const payload = {
                customer: {
                    name: form.fullName,
                    email: form.email,
                    phone: form.phone,
                    address: form.address,
                    city: form.city,
                    postalCode: form.postalCode,
                    country: form.country,
                },
                paymentMethod: form.paymentMethod,
                items: cart.map((it) => ({
                    productId: it.id || it._id,
                    title: it.title || "Unknown Product",
                    price: Number(it.price || it.newPrice || 0),
                    quantity: it.quantity || 1,
                })),
                summary: { subtotal, shipping, tax, total },
                meta: { createdAt: new Date().toISOString() },
            };

            const res = await axios.post("http://localhost:5000/order/create", payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });

            if (res.status === 200 || res.status === 201) {
                setOrderMsg({ type: "success", text: "Order placed successfully!" });
                clearCart();
                setTimeout(() => navigate("/order-success"), 1000);
            } else {
                setOrderMsg({ type: "error", text: res.data?.message || "Failed to place order." });
            }
        } catch (err) {
            console.error("Order error:", err);
            setOrderMsg({ type: "error", text: err.response?.data?.message || err.message || "Server error." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4" style={{
                fontSize: "2.7rem",
                fontFamily: "'Playfair Display', serif",
                fontWeight: "600",
                fontStyle: "italic",
                color: "#4A4A4A",
                marginBottom: "0",
            }}>Checkout Fusion Fabrics</h2>

            <div className="row">
                {/* LEFT: Shipping & Payment */}
                <div className="col-lg-7 mb-4">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-3">Shipping Details</h5>
                        <form onSubmit={handlePlaceOrder} noValidate>
                            <div className="row">
                                {/* Form fields */}
                                {["fullName", "email", "phone", "city", "address", "postalCode", "country"].map((field) => (
                                    <div className={`col-md-${field === "address" ? "12" : "6"} mb-3`} key={field}>
                                        <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                                        <input
                                            name={field}
                                            type={field === "email" ? "email" : "text"}
                                            value={form[field]}
                                            onChange={handleChange}
                                            className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                                        />
                                        <div className="invalid-feedback">{errors[field]}</div>
                                    </div>
                                ))}
                            </div>

                            <hr />
                            <h5 className="mb-3">Payment Method</h5>
                            <div className="mb-3">
                                {["card", "cod"].map((method) => (
                                    <div className="form-check form-check-inline" key={method}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id={`pay${method}`}
                                            value={method}
                                            checked={form.paymentMethod === method}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor={`pay${method}`}>
                                            {method === "card" ? "Card" : "Cash on Delivery"}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {form.paymentMethod === "card" && (
                                <div className="row">
                                    {[
                                        { name: "cardNumber", placeholder: "4242 4242 4242 4242", col: 6 },
                                        { name: "cardName", placeholder: "", col: 6 },
                                        { name: "cardExpiry", placeholder: "MM/YY", col: 4 },
                                        { name: "cardCVC", placeholder: "123", col: 4 },
                                    ].map((c) => (
                                        <div className={`col-md-${c.col} mb-3`} key={c.name}>
                                            <label className="form-label">{c.name.replace(/([A-Z])/g, ' $1')}</label>
                                            <input
                                                name={c.name}
                                                value={form[c.name]}
                                                onChange={handleChange}
                                                placeholder={c.placeholder}
                                                className={`form-control ${errors[c.name] ? "is-invalid" : ""}`}
                                            />
                                            <div className="invalid-feedback">{errors[c.name]}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {orderMsg && (
                                <div className={`alert ${orderMsg.type === "success" ? "alert-success" : "alert-danger"} mt-3`}>
                                    {orderMsg.text}
                                </div>
                            )}

                            <div className="d-flex justify-content-end mt-4">
                                <button type="submit" className="btn btn-danger px-5" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Placing Order...
                                        </>
                                    ) : (
                                        `Place Order — PKR ${formatCurrency(total)}`
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* RIGHT: Order Summary */}
                <div className="col-lg-5">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-3">Order Summary</h5>

                        <div className="mb-3">
                            {cart.length === 0 ? (
                                <div className="text-muted">Your cart is empty.</div>
                            ) : (
                                cart.map((it, idx) => (
                                    <div key={idx} className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={Array.isArray(it.images) ? it.images[0] : it.images || it.img || "/placeholder.png"}
                                                alt={it.title || "Product"}
                                                style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }}
                                            />
                                            <div>
                                                <div className="fw-semibold">{it.title || "Unknown Product"}</div>
                                                <small className="text-muted">Qty: {it.quantity || 1}</small>
                                            </div>
                                        </div>
                                        <div className="fw-semibold">
                                            PKR {formatCurrency(Number(it.price || it.newPrice || 0) * (it.quantity || 1))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <hr />
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <strong>PKR {formatCurrency(subtotal)}</strong>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Shipping</span>
                            <strong>PKR {formatCurrency(shipping)}</strong>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span>Tax (12%)</span>
                            <strong>PKR {formatCurrency(tax)}</strong>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                            <h5 className="mb-0">Total</h5>
                            <h5 className="mb-0 text-danger">PKR {formatCurrency(total)}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
