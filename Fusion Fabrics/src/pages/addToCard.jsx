import React, { useState, useEffect } from "react";

const AddToCart = () => {
    // Example: cart items fetched from backend or localStorage
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // For now, sample data
        const savedCart = [
            {
                id: "1",
                title: "Drop Shoulder Shirt",
                price: 3500,
                image: "https://i5.walmartimages.com/asr/71359de4-05e1-4844-a828-77dccc4c000e.c49a1ac7983a6ebf62da154b4af736a9.jpeg",
                quantity: 1,
            },
            {
                id: "2",
                title: "Old Money Shirt",
                price: 5000,
                image: "https://i.pinimg.com/originals/43/9e/33/439e336980259e871cbcc00d6becea46.jpg",
                quantity: 2,
            },
        ];

        setCartItems(savedCart);
    }, []);

    const handleQuantityChange = (id, delta) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="container py-5">
            <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Cart
            </h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="row">
                        {cartItems.map((item) => (
                            <div className="col-12 mb-3" key={item.id}>
                                <div className="card p-3 d-flex flex-row align-items-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <div className="ms-3 flex-grow-1">
                                        <h5>{item.title}</h5>
                                        <p>Price: Rs. {item.price}</p>
                                        <div className="d-flex align-items-center">
                                            <button
                                                className="btn btn-outline-secondary btn-sm me-2"
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="btn btn-outline-secondary btn-sm ms-2"
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-end mt-4">
                        <h4>Total: Rs. {totalPrice}</h4>
                        <button className="btn btn-primary btn-lg mt-2">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddToCart;
