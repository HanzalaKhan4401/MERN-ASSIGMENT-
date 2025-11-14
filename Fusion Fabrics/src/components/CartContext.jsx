import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  function addToCart(product, quantity = 1) {
    setCart(prev => {
      // Generate unique id if missing
      const productId = product._id || Date.now().toString() + Math.random().toString(36).substring(2, 7);

      // Check if same product already exists
      const idx = prev.findIndex(item => item.id === productId);

      if (idx !== -1) {
        // Increment quantity if exists
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }

      // Otherwise add new product
      return [...prev, { ...product, quantity, id: productId }];
    });
  }

  // Update quantity
  function updateQuantity(id, quantity) {
    setCart(prev => prev.map(item => (item.id === id ? { ...item, quantity } : item)));
  }

  // Remove item
  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  // Clear cart
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;