import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, total } = useCart();

  if (cart.length === 0)
    return (
      <div style={{ padding: "2rem" }}>
        <h3>Your Cart is Empty</h3>
      </div>
    );

  return (
    <div style={{ padding: "2rem" }}>
      <h3>Your Cart</h3>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            width: "300px",
          }}
        >
          <span>{item.name}</span>
          <span>₹{item.price * item.qty}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h4>Total: ₹{total}</h4>
    </div>
  );
};

export default Cart;
